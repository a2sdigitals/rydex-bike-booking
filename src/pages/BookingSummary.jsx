import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/common/Button';

export const BookingSummary = () => {
  const navigate = useNavigate();
  const { bookingData } = useBooking();
  
  useEffect(() => {
    if (!bookingData.bike || !bookingData.personalDetails) {
      navigate('/bikes'); // redirect if data is missing
    }
  }, [bookingData, navigate]);

  if (!bookingData.bike) return null;

  const { bike, personalDetails, rentalDetails, amounts } = bookingData;

  return (
    <div className="bg-background-black min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-4xl font-heading font-black text-white mb-8 text-center tracking-tight">Booking Summary</h1>
        
        <div className="glass-panel rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden">
          
          <div className="bg-white/5 border-b border-white/10 p-6 text-center">
            <h2 className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-1">{bike.bikeName}</h2>
            <p className="text-gray-400 font-mono text-sm">{bike.registrationNumber}</p>
          </div>

          <div className="p-8 space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-heading font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Customer Details</h3>
                <ul className="space-y-4 text-sm font-light">
                  <li className="flex flex-col"><span className="text-gray-500 mb-1">Name</span> <span className="font-medium text-white">{personalDetails.fullName}</span></li>
                  <li className="flex flex-col"><span className="text-gray-500 mb-1">Phone</span> <span className="font-medium text-white">{personalDetails.phone} {personalDetails.altPhone && ` / ${personalDetails.altPhone}`}</span></li>
                  <li className="flex flex-col"><span className="text-gray-500 mb-1">DL Number</span> <span className="font-medium text-white uppercase font-mono">{personalDetails.dlNumber}</span></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-heading font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Rental Schedule</h3>
                <ul className="space-y-4 text-sm font-light">
                  <li className="flex flex-col"><span className="text-gray-500 mb-1">Duration</span> <span className="font-medium text-white">{amounts.days} {amounts.days === 1 ? 'day' : 'days'}</span></li>
                  <li className="flex flex-col"><span className="text-gray-500 mb-1">Pickup</span> <span className="font-medium text-white">{rentalDetails.startDate} at {rentalDetails.startTime}</span></li>
                  <li className="flex flex-col"><span className="text-gray-500 mb-1">Dropoff</span> <span className="font-medium text-white">{rentalDetails.endDate}</span></li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-heading font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Payment Breakdown</h3>
              <div className="space-y-4 text-sm font-light text-gray-300">
                <div className="flex justify-between">
                  <span>Rent Amount</span>
                  <span className="font-medium text-white">₹{amounts.rentAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Security Deposit</span>
                  <span className="font-medium text-white">₹{amounts.depositAmount}</span>
                </div>
                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                  <span className="text-base font-bold text-white">Total Payable</span>
                  <span className="text-3xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">₹{amounts.totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-4 pt-6 border-t border-white/10">
              <Button type="button" variant="outline" className="w-full rounded-xl border-white/20 text-gray-300 hover:bg-white/5" onClick={() => navigate(-1)}>Edit Details</Button>
              <Button className="w-full rounded-xl shadow-[0_0_20px_rgba(255,51,102,0.4)] border-none" size="lg" onClick={() => navigate('/payment')}>Proceed to Payment</Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
