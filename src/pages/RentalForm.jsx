import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import toast from 'react-hot-toast';

export const RentalForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateBookingData } = useBooking();
  
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [dlNumber, setDlNumber] = useState('');
  const [altPhone, setAltPhone] = useState('');
  
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState(''); // Added for duration calculation
  const [reason, setReason] = useState('');
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const data = await api.getBikeById(id);
        if (data && data.availability === 'Available') {
          setBike(data);
          updateBookingData('bike', data);
        } else {
          toast.error("Bike is not available.");
          navigate('/bikes');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBike();
  }, [id]);

  const calculateTotal = () => {
    if (!bike) return { rent: 0, deposit: 0, total: 0, days: 0 };
    
    let days = 1;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      days = diffDays > 0 ? diffDays : 1;
    }

    const rent = bike.pricePerDay * days;
    const deposit = bike.depositAmount;
    return { rent, deposit, total: rent + deposit, days };
  };

  const { rent, deposit, total, days } = calculateTotal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("Please agree to the Terms & Conditions");
      return;
    }
    if (phone.length !== 10) {
      toast.error("Phone number must be 10 digits");
      return;
    }

    updateBookingData('personalDetails', { fullName, phone, dlNumber: dlNumber.toUpperCase(), altPhone });
    updateBookingData('rentalDetails', { startDate, startTime, endDate, reason, agreed });
    updateBookingData('amounts', { rentAmount: rent, depositAmount: deposit, totalAmount: total, days });

    navigate('/booking/summary');
  };

  if (loading) return <div className="p-12 text-center text-gray-400">Loading...</div>;
  if (!bike) return null;

  return (
    <div className="bg-background-black min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-heading font-black text-white mb-8 tracking-tight">Complete Your Rental</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Selected Bike Summary */}
          <div className="glass-panel rounded-2xl p-6 flex items-center gap-6 shadow-[0_0_30px_rgba(0,0,0,0.3)] border border-white/10">
            <img src={bike.image} alt={bike.bikeName} className="w-24 h-24 object-cover rounded-xl bg-white/5" />
            <div>
              <h2 className="text-2xl font-heading font-bold text-white">{bike.bikeName}</h2>
              <p className="text-gray-400 font-mono text-sm mt-1">{bike.registrationNumber}</p>
              <div className="mt-3 inline-flex bg-primary/20 border border-primary/30 text-primary px-3 py-1 rounded-md text-sm font-semibold shadow-[0_0_10px_rgba(255,51,102,0.2)]">
                ₹{bike.pricePerDay} / day
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Details */}
            <div className="glass-panel rounded-2xl p-6 shadow-sm border border-white/10 space-y-5">
              <h3 className="text-xl font-heading font-bold text-white mb-4 border-b border-white/10 pb-3">Personal Details</h3>
              <Input label="Full Name *" required minLength={3} value={fullName} onChange={e => setFullName(e.target.value)} />
              <Input label="Phone Number *" type="tel" pattern="[0-9]{10}" required value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0,10))} />
              <Input label="DL Number *" required value={dlNumber} onChange={e => setDlNumber(e.target.value.toUpperCase())} className="uppercase font-mono" />
              <Input label="Alternate Number" type="tel" pattern="[0-9]{10}" value={altPhone} onChange={e => setAltPhone(e.target.value.replace(/\D/g, '').slice(0,10))} />
            </div>

            {/* Rental Details */}
            <div className="glass-panel rounded-2xl p-6 shadow-sm border border-white/10 space-y-5">
              <h3 className="text-xl font-heading font-bold text-white mb-4 border-b border-white/10 pb-3">Rental Schedule</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Start Date *" type="date" required value={startDate} onChange={e => setStartDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
                <Input label="Start Time *" type="time" required value={startTime} onChange={e => setStartTime(e.target.value)} />
              </div>
              <Input label="End Date *" type="date" required value={endDate} onChange={e => setEndDate(e.target.value)} min={startDate || new Date().toISOString().split('T')[0]} />
              
              <div className="pt-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Reason for Renting *</label>
                <textarea 
                  required 
                  className="w-full px-4 py-2.5 rounded-lg border border-white/10 focus:border-primary focus:ring-primary bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors"
                  rows="3"
                  placeholder="Tell us briefly why you are renting this bike..."
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Amount Section */}
          <div className="glass-panel rounded-2xl p-6 shadow-sm border border-primary/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-xl font-heading font-bold text-white mb-5">Payment Summary</h3>
              <div className="space-y-4 text-sm font-light text-gray-300">
                <div className="flex justify-between">
                  <span>Rent Amount ({days} {days === 1 ? 'day' : 'days'})</span>
                  <span className="font-medium text-white">₹{rent}</span>
                </div>
                <div className="flex justify-between">
                  <span>Security Deposit (Refundable)</span>
                  <span className="font-medium text-white">₹{deposit}</span>
                </div>
                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                  <span className="text-base font-bold text-white">Total Payable</span>
                  <span className="text-3xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">₹{total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Declaration */}
          <div className="glass-panel rounded-2xl p-6 shadow-sm border border-white/10">
            <label className="flex items-start gap-4 cursor-pointer group">
              <input 
                type="checkbox" 
                required 
                checked={agreed} 
                onChange={e => setAgreed(e.target.checked)}
                className="mt-1 w-5 h-5 text-primary rounded focus:ring-primary border-white/20 bg-background-black cursor-pointer transition-colors" 
              />
              <span className="text-sm font-light text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                I confirm that the information provided above is correct. I have a valid driving licence and agree to follow Rydex's <a href="#" className="text-primary hover:text-white transition-colors underline decoration-primary/50 underline-offset-2">Terms and Conditions</a>. I accept responsibility for the rented vehicle during the rental period.
              </span>
            </label>
          </div>

          <div className="flex justify-end gap-4 border-t border-white/10 pt-8">
            <Button type="button" variant="outline" className="rounded-xl border-white/20 text-gray-300 hover:bg-white/5" onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit" size="lg" className="rounded-xl shadow-[0_0_20px_rgba(255,51,102,0.4)] border-none">Review Booking</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
