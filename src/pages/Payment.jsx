import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Smartphone, Info } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { api } from '../services/api';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import toast from 'react-hot-toast';

// UPI Configuration placeholder
const UPI_ID = "rydex@upi";
const UPI_NAME = "RYDEX";

export const Payment = () => {
  const navigate = useNavigate();
  const { bookingData, clearBooking } = useBooking();
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!bookingData.amounts) {
      navigate('/bikes');
    }
  }, [bookingData, navigate]);

  if (!bookingData.amounts) return null;

  const totalAmount = bookingData.amounts.totalAmount;
  
  // Create UPI deep link
  const upiLink = `upi://pay?pa=${UPI_ID}&pn=${UPI_NAME}&am=${totalAmount}&cu=INR`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!transactionId.trim()) {
      toast.error("Please enter a valid Transaction ID");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Prepare booking payload for backend
      const payload = {
        bikeId: bookingData.bike.bikeId,
        bikeName: bookingData.bike.bikeName,
        ...bookingData.personalDetails,
        ...bookingData.rentalDetails,
        ...bookingData.amounts,
        transactionId: transactionId.trim(),
      };

      // 2. Submit to API
      const response = await api.createBooking(payload);
      
      if (response.success) {
        toast.success("Payment details submitted!");
        // We pass the new booking ID via navigation state to the success page
        navigate('/booking/success', { state: { booking: response.booking } });
        clearBooking();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background-light min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Complete Your Payment</h1>
          <p className="text-gray-600">Scan the QR code or use a UPI app to pay.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="bg-primary/5 p-6 text-center border-b border-primary/10">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-1">Total Amount</p>
            <h2 className="text-4xl font-extrabold text-primary">₹{totalAmount}</h2>
          </div>

          <div className="p-8 flex flex-col items-center">
            
            {/* Desktop / Manual Scan UI */}
            <div className="w-full flex flex-col items-center mb-8">
              <div className="bg-gray-50 p-4 rounded-2xl mb-4 border border-gray-100">
                {/* Placeholder for actual QR code image generated based on UPI link */}
                <div className="w-48 h-48 bg-white border border-gray-200 rounded-xl flex items-center justify-center flex-col gap-2">
                  <QrCode className="w-16 h-16 text-gray-400" />
                  <span className="text-xs text-gray-400 font-medium">Scan to Pay</span>
                </div>
              </div>
              <p className="font-semibold text-gray-900">{UPI_NAME}</p>
              <p className="text-sm text-gray-500 font-mono">{UPI_ID}</p>
            </div>

            {/* Mobile Deep Link Button */}
            <div className="w-full mb-8">
              <a href={upiLink} className="block w-full">
                <Button className="w-full flex items-center justify-center gap-2" size="lg">
                  <Smartphone className="w-5 h-5" /> Pay Using UPI App
                </Button>
              </a>
              <p className="text-xs text-center mt-3 text-gray-500 flex items-center justify-center gap-1">
                <Info className="w-3 h-3" /> Opens GPay, PhonePe, Paytm, etc.
              </p>
            </div>

            <div className="w-full border-t border-gray-100 pt-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1">UPI Transaction ID / UTR Number *</label>
                  <p className="text-xs text-gray-500 mb-3">After completing the payment, enter the 12-digit UPI transaction or UTR number.</p>
                  <Input 
                    required 
                    placeholder="e.g. 312345678901" 
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
                  Submit Payment
                </Button>
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
