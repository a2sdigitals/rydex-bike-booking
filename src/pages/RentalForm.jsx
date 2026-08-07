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

  if (loading) return <div className="p-12 text-center">Loading...</div>;
  if (!bike) return null;

  return (
    <div className="bg-background-light min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Complete Your Rental</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Selected Bike Summary */}
          <div className="bg-white rounded-2xl p-6 flex items-center gap-6 shadow-sm border border-gray-100">
            <img src={bike.image} alt={bike.bikeName} className="w-24 h-24 object-cover rounded-xl bg-gray-100" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{bike.bikeName}</h2>
              <p className="text-gray-500">{bike.registrationNumber}</p>
              <div className="mt-2 inline-flex bg-orange-50 text-primary px-3 py-1 rounded-md text-sm font-semibold">
                ₹{bike.pricePerDay} / day
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Personal Details</h3>
              <Input label="Full Name *" required minLength={3} value={fullName} onChange={e => setFullName(e.target.value)} />
              <Input label="Phone Number *" type="tel" pattern="[0-9]{10}" required value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0,10))} />
              <Input label="DL Number *" required value={dlNumber} onChange={e => setDlNumber(e.target.value.toUpperCase())} className="uppercase" />
              <Input label="Alternate Number" type="tel" pattern="[0-9]{10}" value={altPhone} onChange={e => setAltPhone(e.target.value.replace(/\D/g, '').slice(0,10))} />
            </div>

            {/* Rental Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Rental Schedule</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Start Date *" type="date" required value={startDate} onChange={e => setStartDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
                <Input label="Start Time *" type="time" required value={startTime} onChange={e => setStartTime(e.target.value)} />
              </div>
              <Input label="End Date *" type="date" required value={endDate} onChange={e => setEndDate(e.target.value)} min={startDate || new Date().toISOString().split('T')[0]} />
              
              <div className="pt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Renting *</label>
                <textarea 
                  required 
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-primary bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors"
                  rows="3"
                  placeholder="Tell us briefly why you are renting this bike..."
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Amount Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-primary/20 bg-orange-50/30">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Summary</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Rent Amount ({days} {days === 1 ? 'day' : 'days'})</span>
                <span className="font-semibold text-gray-900">₹{rent}</span>
              </div>
              <div className="flex justify-between">
                <span>Security Deposit (Refundable)</span>
                <span className="font-semibold text-gray-900">₹{deposit}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                <span className="text-base font-bold text-gray-900">Total Payable</span>
                <span className="text-2xl font-extrabold text-primary">₹{total}</span>
              </div>
            </div>
          </div>

          {/* Declaration */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <label className="flex items-start gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                required 
                checked={agreed} 
                onChange={e => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 text-primary rounded focus:ring-primary border-gray-300" 
              />
              <span className="text-sm text-gray-600 leading-relaxed">
                I confirm that the information provided above is correct. I have a valid driving licence and agree to follow Rydex's <a href="#" className="text-primary hover:underline">Terms and Conditions</a>. I accept responsibility for the rented vehicle during the rental period.
              </span>
            </label>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit" size="lg">Review Booking</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
