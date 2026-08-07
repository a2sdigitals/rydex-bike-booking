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
    <div className="bg-background-black min-h-[80vh] flex items-center justify-center py-12">
      <div className="container mx-auto px-4 max-w-lg">
        <div className="glass-panel rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden text-center p-8 sm:p-12 relative">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 text-green-400 rounded-full mb-6 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <h1 className="text-4xl font-heading font-black text-white mb-4 tracking-tight">Booking Submitted!</h1>
            <p className="text-gray-400 font-light mb-8 leading-relaxed">
              Your rental request has been submitted successfully. Your payment will be verified by Rydex shortly.
            </p>

            <div className="bg-white/5 rounded-2xl p-6 text-left mb-8 border border-white/10">
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <span className="text-sm font-heading font-bold text-gray-500 uppercase tracking-wider">Booking ID</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-white text-lg">{booking.bookingId}</span>
                  <button onClick={copyToClipboard} className="text-gray-400 hover:text-primary transition-colors p-1.5 hover:bg-white/5 rounded-lg">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <ul className="space-y-4 text-sm font-light">
                <li className="flex justify-between">
                  <span className="text-gray-400">Bike</span>
                  <span className="font-medium text-white">{booking.bikeName}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Start Date</span>
                  <span className="font-medium text-white">{booking.startDate}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Total Paid</span>
                  <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent font-bold">₹{booking.totalAmount}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Transaction ID</span>
                  <span className="font-mono text-gray-300">{booking.transactionId}</span>
                </li>
                <li className="flex justify-between items-center pt-3 border-t border-white/5">
                  <span className="text-gray-400">Status</span>
                  <StatusBadge status={booking.paymentStatus} />
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <Link to="/" className="block">
                <Button variant="outline" className="w-full rounded-xl border-white/20 text-gray-300 hover:bg-white/5">Back to Home</Button>
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
