export const INITIAL_PARCELS = [
  {
    id: "pkg-1",
    trackingNumber: "TRK-892471",
    sender: {
      name: "Sophia Martinez",
      phone: "+1 (555) 234-5678",
      email: "sophia.m@novatech.io",
      address: "742 Evergreen Terrace, Suite 400",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States"
    },
    recipient: {
      name: "Alexander Wright",
      phone: "+1 (555) 876-5432",
      email: "alex.wright@apexdesign.com",
      address: "1250 Mission Street, Apt 8B",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      country: "United States"
    },
    parcel: {
      type: "Electronics & Prototypes",
      serviceType: "Express Priority Air",
      weight: "2.8 kg",
      dimensions: "35 x 25 x 15 cm",
      declaredValue: "$1,450.00",
      fragile: true,
      paymentMode: "Prepaid Online",
      cost: 68.50,
      description: "Custom VR Headset Developer Kit & Sensors"
    },
    status: "In Transit",
    progressPercent: 65,
    originHub: "JFK Air Cargo Hub, New York, NY",
    destinationHub: "SFO Gateway Terminal, San Francisco, CA",
    currentLocation: "Denver Regional Sorting Facility, CO",
    estimatedDelivery: "2026-09-07T14:30:00",
    createdAt: "2026-09-03T08:15:00",
    courier: {
      name: "Marcus Vance",
      phone: "+1 (555) 392-7711",
      badge: "SwiftTrack Elite Courier",
      vehicle: "Freightliner Van #208",
      rating: 4.95,
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    timeline: [
      {
        id: "ev-1",
        status: "Shipment Created",
        title: "Shipping Label Created",
        location: "New York, NY",
        timestamp: "2026-09-03 08:15 AM",
        description: "Electronic shipping information received from sender.",
        completed: true
      },
      {
        id: "ev-2",
        status: "Picked Up",
        title: "Package Picked Up",
        location: "Manhattan Hub, NY",
        timestamp: "2026-09-03 11:45 AM",
        description: "Package received and scanned at Manhattan Origin Depot.",
        completed: true
      },
      {
        id: "ev-3",
        status: "In Transit",
        title: "Departed JFK Air Cargo Center",
        location: "New York, NY",
        timestamp: "2026-09-04 03:20 AM",
        description: "En route via Flight ST-409 to Western Gateway Hub.",
        completed: true
      },
      {
        id: "ev-4",
        status: "In Transit",
        title: "Arrived at Intermediate Hub",
        location: "Denver Regional Facility, CO",
        timestamp: "2026-09-04 07:45 PM",
        description: "Package scanned and sorted for secondary transport.",
        completed: true,
        isCurrent: true
      },
      {
        id: "ev-5",
        status: "Out for Delivery",
        title: "Out for Local Delivery",
        location: "San Francisco Delivery Hub, CA",
        timestamp: "Expected Sep 07, 09:00 AM",
        description: "Dispatched with local courier for final doorstep drop-off.",
        completed: false
      },
      {
        id: "ev-6",
        status: "Delivered",
        title: "Delivered & Signed",
        location: "San Francisco, CA",
        timestamp: "Expected Sep 07, 02:30 PM",
        description: "Direct handover with digital signature confirmation.",
        completed: false
      }
    ]
  },
  {
    id: "pkg-2",
    trackingNumber: "TRK-302914",
    sender: {
      name: "Global Biotech Labs",
      phone: "+1 (555) 443-8822",
      email: "logistics@globalbiotech.com",
      address: "500 Discovery Parkway, Bldg C",
      city: "Boston",
      state: "MA",
      zip: "02115",
      country: "United States"
    },
    recipient: {
      name: "Dr. Elena Rostova",
      phone: "+1 (555) 912-3344",
      email: "e.rostova@metrohealth.org",
      address: "880 North Michigan Ave, Floor 14",
      city: "Chicago",
      state: "IL",
      zip: "60611",
      country: "United States"
    },
    parcel: {
      type: "Medical & Temperature Sensitive",
      serviceType: "Cold-Chain Same Day Express",
      weight: "1.4 kg",
      dimensions: "20 x 20 x 20 cm",
      declaredValue: "$4,200.00",
      fragile: true,
      paymentMode: "Corporate Account",
      cost: 145.00,
      description: "Cryo-Vial Research Specimen Box (Maintained at 4°C)"
    },
    status: "Out for Delivery",
    progressPercent: 90,
    originHub: "Logan Logistics Park, Boston, MA",
    destinationHub: "O'Hare Courier Center, Chicago, IL",
    currentLocation: "Chicago Metro Local Distribution Unit 04",
    estimatedDelivery: "2026-09-05T11:30:00",
    createdAt: "2026-09-04T06:00:00",
    courier: {
      name: "David Chen",
      phone: "+1 (555) 721-0099",
      badge: "Certified Med-Courier #044",
      vehicle: "Temperature-Regulated Electric EV",
      rating: 4.99,
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    timeline: [
      {
        id: "ev-201",
        status: "Shipment Created",
        title: "Medical Dispatch Order Booked",
        location: "Boston, MA",
        timestamp: "2026-09-04 06:00 AM",
        description: "Priority cold-chain booking confirmed.",
        completed: true
      },
      {
        id: "ev-202",
        status: "Picked Up",
        title: "Cryo-Carrier Verified & Picked Up",
        location: "Boston Labs, MA",
        timestamp: "2026-09-04 07:15 AM",
        description: "Temperature logged at 3.8°C upon initial receipt.",
        completed: true
      },
      {
        id: "ev-203",
        status: "In Transit",
        title: "Direct Air Shuttle Transfer",
        location: "BOS to ORD Route",
        timestamp: "2026-09-04 11:30 AM",
        description: "Special cargo handling completed at Chicago O'Hare.",
        completed: true
      },
      {
        id: "ev-204",
        status: "Out for Delivery",
        title: "Out for Priority Handover",
        location: "Downtown Chicago, IL",
        timestamp: "2026-09-05 08:45 AM",
        description: "Courier David Chen is en route to hospital reception.",
        completed: true,
        isCurrent: true
      },
      {
        id: "ev-205",
        status: "Delivered",
        title: "Recipient Signature & Temp Check",
        location: "Metro Health Center, Chicago, IL",
        timestamp: "Expected Sep 05, 11:30 AM",
        description: "Final verification and handover.",
        completed: false
      }
    ]
  },
  {
    id: "pkg-3",
    trackingNumber: "TRK-582019",
    sender: {
      name: "Nordic Goods & Apparel",
      phone: "+1 (555) 789-1029",
      email: "orders@nordicapparel.store",
      address: "100 Industrial Parkway",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "United States"
    },
    recipient: {
      name: "Liam O'Connor",
      phone: "+1 (555) 654-3210",
      email: "liam.oconnor@gmail.com",
      address: "415 Pinehurst Road",
      city: "Austin",
      state: "TX",
      zip: "78704",
      country: "United States"
    },
    parcel: {
      type: "Apparel & Accessories",
      serviceType: "Standard Ground Delivery",
      weight: "3.5 kg",
      dimensions: "40 x 30 x 10 cm",
      declaredValue: "$260.00",
      fragile: false,
      paymentMode: "Prepaid",
      cost: 24.00,
      description: "Winter Parka Coat & Merino Wool Sweaters"
    },
    status: "Delivered",
    progressPercent: 100,
    originHub: "Pacific Northwest Fulfillment, Seattle, WA",
    destinationHub: "Austin Metro South Facility, Austin, TX",
    currentLocation: "Delivered to Front Porch / Safe Place",
    estimatedDelivery: "2026-09-04T15:00:00",
    createdAt: "2026-08-30T10:00:00",
    courier: {
      name: "Tanya Reynolds",
      phone: "+1 (555) 334-1188",
      badge: "SwiftTrack Ground Logistics",
      vehicle: "Delivery Van #114",
      rating: 4.88,
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    },
    timeline: [
      {
        id: "ev-301",
        status: "Shipment Created",
        title: "Order Processed",
        location: "Seattle, WA",
        timestamp: "2026-08-30 10:00 AM",
        description: "Carrier information created.",
        completed: true
      },
      {
        id: "ev-302",
        status: "Picked Up",
        title: "Picked Up by Carrier",
        location: "Seattle Hub, WA",
        timestamp: "2026-08-31 02:00 PM",
        description: "Package sorted for inter-state highway linehaul.",
        completed: true
      },
      {
        id: "ev-303",
        status: "In Transit",
        title: "In Transit across State Lines",
        location: "Dallas Transit Hub, TX",
        timestamp: "2026-09-03 04:20 AM",
        description: "Arrived and processed at regional hub.",
        completed: true
      },
      {
        id: "ev-304",
        status: "Out for Delivery",
        title: "Out for Delivery",
        location: "Austin, TX",
        timestamp: "2026-09-04 08:30 AM",
        description: "Package loaded onto delivery truck.",
        completed: true
      },
      {
        id: "ev-305",
        status: "Delivered",
        title: "Delivered - Left at Front Door",
        location: "Austin, TX",
        timestamp: "2026-09-04 02:45 PM",
        description: "Delivered to recipient residence. Photo captured.",
        completed: true,
        isCurrent: true
      }
    ]
  },
  {
    id: "pkg-4",
    trackingNumber: "TRK-491023",
    sender: {
      name: "Apex Precision Optics",
      phone: "+1 (555) 321-9988",
      email: "sales@apexoptics.com",
      address: "12 Laser Way",
      city: "San Jose",
      state: "CA",
      zip: "95110",
      country: "United States"
    },
    recipient: {
      name: "Prof. Arthur Miller",
      phone: "+1 (555) 432-8765",
      email: "a.miller@mit.edu",
      address: "77 Massachusetts Ave, Dept of Physics",
      city: "Cambridge",
      state: "MA",
      zip: "02139",
      country: "United States"
    },
    parcel: {
      type: "Optical Lenses & Precision Gear",
      serviceType: "Express Priority Air",
      weight: "4.2 kg",
      dimensions: "30 x 30 x 25 cm",
      declaredValue: "$3,800.00",
      fragile: true,
      paymentMode: "Prepaid Wire",
      cost: 92.00,
      description: "High-power laboratory collimator and quartz mirrors"
    },
    status: "Picked Up",
    progressPercent: 30,
    originHub: "Silicon Valley Hub, San Jose, CA",
    destinationHub: "Boston Logan Logistics Depot, Boston, MA",
    currentLocation: "San Jose Hub (Pending Flight Allocation)",
    estimatedDelivery: "2026-09-08T17:00:00",
    createdAt: "2026-09-05T01:30:00",
    courier: {
      name: "Robert Fox",
      phone: "+1 (555) 902-1212",
      badge: "Airport Cargo Team Lead",
      vehicle: "Van #312",
      rating: 4.91,
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    },
    timeline: [
      {
        id: "ev-401",
        status: "Shipment Created",
        title: "Dispatch Created",
        location: "San Jose, CA",
        timestamp: "2026-09-05 01:30 AM",
        description: "Booking registered online with premium insurance.",
        completed: true
      },
      {
        id: "ev-402",
        status: "Picked Up",
        title: "Package Collected from Sender",
        location: "San Jose, CA",
        timestamp: "2026-09-05 04:15 AM",
        description: "Physical inspection and barcoding completed.",
        completed: true,
        isCurrent: true
      },
      {
        id: "ev-403",
        status: "In Transit",
        title: "Departing via Air Cargo",
        location: "SFO International Airport",
        timestamp: "Expected Sep 06, 06:00 AM",
        description: "Scheduled for early morning commercial cargo flight.",
        completed: false
      },
      {
        id: "ev-404",
        status: "Out for Delivery",
        title: "Dispatch to Cambridge Campus",
        location: "Boston, MA",
        timestamp: "Expected Sep 08, 10:00 AM",
        description: "Courier assigned for academic building drop-off.",
        completed: false
      },
      {
        id: "ev-405",
        status: "Delivered",
        title: "Delivery to Laboratory Office",
        location: "Cambridge, MA",
        timestamp: "Expected Sep 08, 05:00 PM",
        description: "Final delivery with professor's signature.",
        completed: false
      }
    ]
  },
  {
    id: "pkg-5",
    trackingNumber: "TRK-990184",
    sender: {
      name: "Organic Coffee Roasters Co.",
      phone: "+1 (555) 777-2311",
      email: "hello@organicbean.co",
      address: "88 Artisan Way",
      city: "Portland",
      state: "OR",
      zip: "97201",
      country: "United States"
    },
    recipient: {
      name: "Jessica Taylor",
      phone: "+1 (555) 234-9910",
      email: "jessica.t@outlook.com",
      address: "1542 Ocean Boulevard",
      city: "Miami",
      state: "FL",
      zip: "33139",
      country: "United States"
    },
    parcel: {
      type: "Gourmet Foods & Beverage",
      serviceType: "Standard Ground Delivery",
      weight: "5.0 kg",
      dimensions: "35 x 30 x 20 cm",
      declaredValue: "$180.00",
      fragile: false,
      paymentMode: "Cash on Delivery",
      cost: 32.50,
      description: "Artisanal Single-Origin Roasted Whole Coffee Beans"
    },
    status: "Pending",
    progressPercent: 10,
    originHub: "Portland Northwest Center, OR",
    destinationHub: "Miami Coastal Distribution Terminal, FL",
    currentLocation: "Awaiting Merchant Handover, Portland, OR",
    estimatedDelivery: "2026-09-11T16:00:00",
    createdAt: "2026-09-05T04:45:00",
    courier: {
      name: "Assigned Upon Pickup",
      phone: "1-800-SWIFT-TRK",
      badge: "SwiftTrack Logistics",
      vehicle: "Standard Fleet",
      rating: 5.0,
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    },
    timeline: [
      {
        id: "ev-501",
        status: "Pending",
        title: "Order Placed & Awaiting Pickup",
        location: "Portland, OR",
        timestamp: "2026-09-05 04:45 AM",
        description: "Courier pickup vehicle dispatched to merchant warehouse.",
        completed: true,
        isCurrent: true
      },
      {
        id: "ev-502",
        status: "Picked Up",
        title: "Package Pickup",
        location: "Portland, OR",
        timestamp: "Scheduled Sep 05, 02:00 PM",
        description: "Scheduled pickup from warehouse loading dock.",
        completed: false
      },
      {
        id: "ev-503",
        status: "In Transit",
        title: "Linehaul Long Distance Transit",
        location: "Cross-Country Corridor",
        timestamp: "Scheduled Sep 06 - Sep 09",
        description: "Inter-facility cargo movement.",
        completed: false
      },
      {
        id: "ev-504",
        status: "Delivered",
        title: "Delivery to Miami Address",
        location: "Miami, FL",
        timestamp: "Scheduled Sep 11",
        description: "Cash collected upon receipt.",
        completed: false
      }
    ]
  },
  {
    id: "pkg-6",
    trackingNumber: "TRK-749102",
    sender: {
      name: "AutoParts Direct Inc.",
      phone: "+1 (555) 888-4321",
      email: "shipping@autopartsdirect.com",
      address: "300 Industrial Loop",
      city: "Detroit",
      state: "MI",
      zip: "48201",
      country: "United States"
    },
    recipient: {
      name: "Lucas Hernandez",
      phone: "+1 (555) 667-8899",
      email: "l.hernandez@garageworks.net",
      address: "921 Western Ave, Bay 3",
      city: "Phoenix",
      state: "AZ",
      zip: "85001",
      country: "United States"
    },
    parcel: {
      type: "Heavy Mechanical Parts",
      serviceType: "Heavy Freight Logistics",
      weight: "18.5 kg",
      dimensions: "60 x 50 x 40 cm",
      declaredValue: "$1,120.00",
      fragile: false,
      paymentMode: "Prepaid Credit Card",
      cost: 110.00,
      description: "Reinforced Ceramic Brake Rotors & Caliper Assemblies"
    },
    status: "Delivered",
    progressPercent: 100,
    originHub: "Detroit Freight Depot, MI",
    destinationHub: "Phoenix Valley Cargo Yard, AZ",
    currentLocation: "Delivered to Garage Bay 3 (Signed by Lucas H.)",
    estimatedDelivery: "2026-09-02T13:00:00",
    createdAt: "2026-08-28T11:20:00",
    courier: {
      name: "James Wilson",
      phone: "+1 (555) 441-2090",
      badge: "Heavy Freight Specialist",
      vehicle: "Freightliner M2 Flatbed",
      rating: 4.93,
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
    },
    timeline: [
      {
        id: "ev-601",
        status: "Shipment Created",
        title: "Freight Manifest Created",
        location: "Detroit, MI",
        timestamp: "2026-08-28 11:20 AM",
        description: "Heavy cargo pallet weighed and verified.",
        completed: true
      },
      {
        id: "ev-602",
        status: "Picked Up",
        title: "Pallet Loaded on Freight Truck",
        location: "Detroit Terminal, MI",
        timestamp: "2026-08-29 09:00 AM",
        description: "Forklift loaded onto inter-state linehaul.",
        completed: true
      },
      {
        id: "ev-603",
        status: "In Transit",
        title: "Hub Sorting & Routing",
        location: "St. Louis Freight Terminal, MO",
        timestamp: "2026-08-30 08:30 PM",
        description: "Midwest cargo interchange completed.",
        completed: true
      },
      {
        id: "ev-604",
        status: "Out for Delivery",
        title: "Out for Commercial Delivery",
        location: "Phoenix, AZ",
        timestamp: "2026-09-02 07:15 AM",
        description: "Heavy delivery truck on route with liftgate.",
        completed: true
      },
      {
        id: "ev-605",
        status: "Delivered",
        title: "Delivered to Commercial Bay",
        location: "Phoenix, AZ",
        timestamp: "2026-09-02 01:12 PM",
        description: "Received and signed by Lucas Hernandez at Workshop.",
        completed: true,
        isCurrent: true
      }
    ]
  }
];
