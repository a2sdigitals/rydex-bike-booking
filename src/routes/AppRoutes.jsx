import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { AdminLayout } from '../layouts/AdminLayout';

import { Home } from '../pages/Home';
import { Bikes } from '../pages/Bikes';
import { BikeDetails } from '../pages/BikeDetails';
import { RentalForm } from '../pages/RentalForm';
import { BookingSummary } from '../pages/BookingSummary';
import { Payment } from '../pages/Payment';
import { BookingSuccess } from '../pages/BookingSuccess';
import { About } from '../pages/About';
import { Contact } from '../pages/Contact';
import { Terms } from '../pages/Terms';

import { AdminLogin } from '../pages/admin/AdminLogin';
import { Dashboard } from '../pages/admin/Dashboard';
import { AdminBikes } from '../pages/admin/Bikes';
import { AdminBookings } from '../pages/admin/Bookings';
import { AdminPayments } from '../pages/admin/Payments';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/bikes" element={<Bikes />} />
        <Route path="/bikes/:id" element={<BikeDetails />} />
        <Route path="/booking/:id" element={<RentalForm />} />
        <Route path="/booking/summary" element={<BookingSummary />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/booking/success" element={<BookingSuccess />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
      </Route>

      {/* Admin Login (Outside layout) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/bikes" element={<AdminBikes />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
      </Route>
    </Routes>
  );
};
