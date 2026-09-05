import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PARCELS } from '../data/initialParcels';

const ParcelContext = createContext(null);

const STORAGE_KEY = 'swifttrack_parcels_v1';

export const ParcelProvider = ({ children }) => {
  const [parcels, setParcels] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return INITIAL_PARCELS;
    } catch (e) {
      console.error('Failed to load parcels from localStorage', e);
      return INITIAL_PARCELS;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parcels));
    } catch (e) {
      console.error('Failed to save parcels to localStorage', e);
    }
  }, [parcels]);

  // Helper to generate tracking number
  const generateTrackingNumber = () => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    return `TRK-${randomDigits}`;
  };

  // Helper to compute progress percent based on status
  const calculateProgress = (status) => {
    switch (status) {
      case 'Pending':
        return 15;
      case 'Picked Up':
        return 35;
      case 'In Transit':
        return 65;
      case 'Out for Delivery':
        return 88;
      case 'Delivered':
        return 100;
      case 'Cancelled':
        return 0;
      default:
        return 20;
    }
  };

  // Add new parcel (e.g. from public Booking page or admin)
  const addParcel = (parcelData) => {
    const trackingNumber = parcelData.trackingNumber || generateTrackingNumber();
    const now = new Date();
    const formattedNow = now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const status = parcelData.status || 'Pending';
    const progressPercent = calculateProgress(status);

    const newParcel = {
      id: `pkg-${Date.now()}`,
      trackingNumber,
      sender: parcelData.sender,
      recipient: parcelData.recipient,
      parcel: parcelData.parcel,
      status,
      progressPercent,
      originHub: parcelData.originHub || `${parcelData.sender.city} Sorting Center`,
      destinationHub: parcelData.destinationHub || `${parcelData.recipient.city} Delivery Depot`,
      currentLocation: parcelData.currentLocation || `${parcelData.sender.city} Hub (Registered)`,
      estimatedDelivery: parcelData.estimatedDelivery || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      courier: parcelData.courier || {
        name: "Standard Assigned Fleet",
        phone: "1-800-SWIFT-TRK",
        badge: "SwiftTrack Carrier",
        vehicle: "Regional Transport Van",
        rating: 4.9,
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      },
      timeline: [
        {
          id: `ev-${Date.now()}-1`,
          status: "Shipment Created",
          title: "Shipment Registered Online",
          location: `${parcelData.sender.city}, ${parcelData.sender.state || 'Hub'}`,
          timestamp: formattedNow,
          description: `Booking order generated for ${parcelData.parcel.serviceType || 'Standard Express'}.`,
          completed: true,
          isCurrent: true
        }
      ]
    };

    setParcels((prev) => [newParcel, ...prev]);
    return newParcel;
  };

  // Update Status & Append Timeline Event
  const updateParcelStatus = (trackingNumber, newStatus, location, note) => {
    const now = new Date();
    const formattedNow = now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    setParcels((prev) =>
      prev.map((pkg) => {
        if (pkg.trackingNumber.toUpperCase() !== trackingNumber.toUpperCase()) {
          return pkg;
        }

        const progressPercent = calculateProgress(newStatus);
        const updatedTimeline = pkg.timeline.map((ev) => ({
          ...ev,
          isCurrent: false,
          completed: true
        }));

        const newEvent = {
          id: `ev-${Date.now()}`,
          status: newStatus,
          title: `Status Updated to ${newStatus}`,
          location: location || pkg.currentLocation || 'Distribution Facility',
          timestamp: formattedNow,
          description: note || `Package status has been updated to ${newStatus}.`,
          completed: true,
          isCurrent: true
        };

        return {
          ...pkg,
          status: newStatus,
          progressPercent,
          currentLocation: location || pkg.currentLocation,
          timeline: [...updatedTimeline, newEvent]
        };
      })
    );
  };

  // Add custom checkpoint event
  const addTimelineEvent = (trackingNumber, event) => {
    setParcels((prev) =>
      prev.map((pkg) => {
        if (pkg.trackingNumber.toUpperCase() !== trackingNumber.toUpperCase()) {
          return pkg;
        }
        const updatedTimeline = pkg.timeline.map((ev) => ({ ...ev, isCurrent: false }));
        return {
          ...pkg,
          timeline: [
            ...updatedTimeline,
            {
              id: `ev-${Date.now()}`,
              ...event,
              isCurrent: true,
              completed: true
            }
          ]
        };
      })
    );
  };

  // Update any general details
  const updateParcelDetails = (trackingNumber, updatedFields) => {
    setParcels((prev) =>
      prev.map((pkg) =>
        pkg.trackingNumber.toUpperCase() === trackingNumber.toUpperCase()
          ? { ...pkg, ...updatedFields }
          : pkg
      )
    );
  };

  // Delete a parcel
  const deleteParcel = (trackingNumber) => {
    setParcels((prev) =>
      prev.filter((pkg) => pkg.trackingNumber.toUpperCase() !== trackingNumber.toUpperCase())
    );
  };

  // Lookup by tracking number (flexible format)
  const getParcel = (trackingNumber) => {
    if (!trackingNumber) return null;
    const cleanSearch = trackingNumber.toString().trim().toUpperCase().replace(/\s+/g, '');
    return parcels.find((pkg) => {
      const cleanPkg = pkg.trackingNumber.toUpperCase().replace(/\s+/g, '');
      return cleanPkg === cleanSearch || cleanPkg.replace('-', '') === cleanSearch.replace('-', '');
    });
  };

  // Reset to default mock database
  const resetToDefaultData = () => {
    setParcels(INITIAL_PARCELS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PARCELS));
  };

  return (
    <ParcelContext.Provider
      value={{
        parcels,
        addParcel,
        updateParcelStatus,
        addTimelineEvent,
        updateParcelDetails,
        deleteParcel,
        getParcel,
        resetToDefaultData
      }}
    >
      {children}
    </ParcelContext.Provider>
  );
};

export const useParcels = () => {
  const context = useContext(ParcelContext);
  if (!context) {
    throw new Error('useParcels must be used within a ParcelProvider');
  }
  return context;
};
