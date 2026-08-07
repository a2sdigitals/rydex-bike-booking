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
    <div className="bg-background-light min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Booking Summary</h1>
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="bg-primary p-6 text-white text-center">
            <h2 className="text-xl font-bold mb-1">{bike.bikeName}</h2>
            <p className="text-orange-100">{bike.registrationNumber}</p>
          </div>

          <div className="p-8 space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">Customer Details</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex flex-col"><span className="text-gray-500">Name</span> <span className="font-medium text-gray-900">{personalDetails.fullName}</span></li>
                  <li className="flex flex-col"><span className="text-gray-500">Phone</span> <span className="font-medium text-gray-900">{personalDetails.phone} {personalDetails.altPhone && ` / ${personalDetails.altPhone}`}</span></li>
                  <li className="flex flex-col"><span className="text-gray-500">DL Number</span> <span className="font-medium text-gray-900 uppercase">{personalDetails.dlNumber}</span></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">Rental Schedule</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex flex-col"><span className="text-gray-500">Duration</span> <span className="font-medium text-gray-900">{amounts.days} {amounts.days === 1 ? 'day' : 'days'}</span></li>
                  <li className="flex flex-col"><span className="text-gray-500">Pickup</span> <span className="font-medium text-gray-900">{rentalDetails.startDate} at {rentalDetails.startTime}</span></li>
                  <li className="flex flex-col"><span className="text-gray-500">Dropoff</span> <span className="font-medium text-gray-900">{rentalDetails.endDate}</span></li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Payment Breakdown</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Rent Amount</span>
                  <span className="font-semibold text-gray-900">₹{amounts.rentAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Security Deposit</span>
                  <span className="font-semibold text-gray-900">₹{amounts.depositAmount}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <span className="text-base font-bold text-gray-900">Total Payable</span>
                  <span className="text-2xl font-extrabold text-primary">₹{amounts.totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4">
              <Button type="button" variant="outline" className="w-full" onClick={() => navigate(-1)}>Edit Details</Button>
              <Button className="w-full" size="lg" onClick={() => navigate('/payment')}>Proceed to Payment</Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
