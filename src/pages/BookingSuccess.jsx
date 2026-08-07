import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Copy } from 'lucide-react';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import toast from 'react-hot-toast';

export const BookingSuccess = () => {
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) {
    return <Navigate to="/" replace />;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(booking.bookingId);
    toast.success("Booking ID copied!");
  };

  return (
    <div className="bg-background-light min-h-[80vh] flex items-center justify-center py-12">
      <div className="container mx-auto px-4 max-w-lg">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden text-center p-8 sm:p-12">
          
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 text-status-success rounded-full mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Booking Submitted!</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your rental request has been submitted successfully. Your payment will be verified by Rydex shortly.
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 text-left mb-8 border border-gray-100">
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Booking ID</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-gray-900">{booking.bookingId}</span>
                <button onClick={copyToClipboard} className="text-gray-400 hover:text-primary transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <ul className="space-y-4 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-500">Bike</span>
                <span className="font-medium text-gray-900">{booking.bikeName}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Start Date</span>
                <span className="font-medium text-gray-900">{booking.startDate}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Total Paid</span>
                <span className="font-medium text-gray-900">₹{booking.totalAmount}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Transaction ID</span>
                <span className="font-mono text-gray-900">{booking.transactionId}</span>
              </li>
              <li className="flex justify-between items-center pt-2">
                <span className="text-gray-500">Status</span>
                <StatusBadge status={booking.paymentStatus} />
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <Link to="/" className="block">
              <Button variant="outline" className="w-full">Back to Home</Button>
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};
