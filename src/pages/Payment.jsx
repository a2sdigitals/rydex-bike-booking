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
    <div className="bg-background-black min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-black text-white mb-3 tracking-tight">Complete Payment</h1>
          <p className="text-gray-400 font-light">Scan the QR code or use a UPI app to pay.</p>
        </div>

        <div className="glass-panel rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden mb-8">
          <div className="bg-white/5 p-8 text-center border-b border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/20 blur-[50px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <p className="text-sm font-heading font-bold text-gray-500 uppercase tracking-widest mb-2">Total Amount</p>
              <h2 className="text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">₹{totalAmount}</h2>
            </div>
          </div>

          <div className="p-8 flex flex-col items-center">
            
            {/* Desktop / Manual Scan UI */}
            <div className="w-full flex flex-col items-center mb-8">
              <div className="bg-white/5 p-4 rounded-2xl mb-5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                {/* Placeholder for actual QR code image generated based on UPI link */}
                <div className="w-48 h-48 bg-background-black border border-white/10 rounded-xl flex items-center justify-center flex-col gap-3">
                  <QrCode className="w-16 h-16 text-gray-500" />
                  <span className="text-xs text-gray-500 font-medium tracking-wide">Scan to Pay</span>
                </div>
              </div>
              <p className="font-heading font-bold text-white text-lg tracking-wide">{UPI_NAME}</p>
              <p className="text-sm text-gray-500 font-mono mt-1">{UPI_ID}</p>
            </div>

            {/* Mobile Deep Link Button */}
            <div className="w-full mb-8">
              <a href={upiLink} className="block w-full">
                <Button className="w-full flex items-center justify-center gap-2 rounded-xl shadow-[0_0_20px_rgba(255,51,102,0.3)] border-none" size="lg">
                  <Smartphone className="w-5 h-5" /> Pay Using UPI App
                </Button>
              </a>
              <p className="text-xs text-center mt-4 text-gray-500 flex items-center justify-center gap-1.5 font-light">
                <Info className="w-3.5 h-3.5" /> Opens GPay, PhonePe, Paytm, etc.
              </p>
            </div>

            <div className="w-full border-t border-white/10 pt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-heading font-bold text-gray-300 mb-2">UPI Transaction ID / UTR Number *</label>
                  <p className="text-xs text-gray-500 mb-4 font-light leading-relaxed">After completing the payment, enter the 12-digit UPI transaction or UTR number.</p>
                  <Input 
                    required 
                    placeholder="e.g. 312345678901" 
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full rounded-xl border-none shadow-[0_0_20px_rgba(255,51,102,0.4)]" isLoading={isSubmitting}>
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
