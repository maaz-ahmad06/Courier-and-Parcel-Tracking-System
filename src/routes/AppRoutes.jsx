import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../components/common/PublicLayout';
import AdminLayout from '../components/admin/AdminLayout';

// Public Pages
import HomePage from '../pages/public/HomePage';
import TrackPage from '../pages/public/TrackPage';
import BookingPage from '../pages/public/BookingPage';
import CalculatorPage from '../pages/public/CalculatorPage';
import ServicesPage from '../pages/public/ServicesPage';
import AboutPage from '../pages/public/AboutPage';
import ContactPage from '../pages/public/ContactPage';
import NotFoundPage from '../pages/public/NotFoundPage';

// Admin Pages
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminParcelsPage from '../pages/admin/AdminParcelsPage';
import AdminNewShipmentPage from '../pages/admin/AdminNewShipmentPage';
import AdminCustomersPage from '../pages/admin/AdminCustomersPage';
import AdminBranchesPage from '../pages/admin/AdminBranchesPage';
import AdminReportsPage from '../pages/admin/AdminReportsPage';
import AdminSettingsPage from '../pages/admin/AdminSettingsPage';

// Auth Hook
import { useAuth } from '../context/AuthContext';

// Protected Admin Route Guard
function ProtectedAdminRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Portal Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/track" element={<TrackPage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin Login Route */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected Admin Portal Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="parcels" element={<AdminParcelsPage />} />
        <Route path="new-shipment" element={<AdminNewShipmentPage />} />
        <Route path="customers" element={<AdminCustomersPage />} />
        <Route path="branches" element={<AdminBranchesPage />} />
        <Route path="reports" element={<AdminReportsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  );
}
