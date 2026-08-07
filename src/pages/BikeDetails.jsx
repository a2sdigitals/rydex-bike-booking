import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, MapPin, Gauge, Droplet, Settings, ArrowLeft } from 'lucide-react';
import { api } from '../services/api';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';

export const BikeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const data = await api.getBikeById(id);
        if (data) {
          setBike(data);
        } else {
          navigate('/bikes'); // redirect if not found
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBike();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-black pt-20">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(255,51,102,0.5)]"></div>
      </div>
    );
  }

  if (!bike) return null;

  const isAvailable = bike.availability === 'Available';

  return (
    <div className="bg-background-black min-h-screen py-12 pt-32 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link to="/bikes" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Fleet</span>
        </Link>
        
        <div className="glass-panel rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Image Section */}
            <div className="bg-background-surface/50 relative min-h-[400px] lg:min-h-full border-r border-white/5 p-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-background-surface via-transparent to-primary/5"></div>
              <img 
                src={bike.image} 
                alt={bike.bikeName} 
                className="relative z-10 w-full object-contain filter drop-shadow-2xl"
              />
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-4xl font-heading font-black text-white mb-2 tracking-tight">{bike.bikeName}</h1>
                  <p className="text-gray-400 font-light text-lg">{bike.brand} • {bike.model}</p>
                </div>
                <StatusBadge status={bike.availability} />
              </div>

              <div className="flex items-end gap-2 mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">₹{bike.pricePerDay}</span>
                <span className="text-gray-500 mb-2 font-light">/ day</span>
              </div>

              <p className="text-gray-400 mb-10 leading-relaxed font-light text-lg">
                {bike.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-colors">
                  <Gauge className="w-7 h-7 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-gray-500 uppercase font-semibold mb-1">Engine</span>
                  <span className="font-bold text-white">{bike.engineCC} CC</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-colors">
                  <Droplet className="w-7 h-7 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-gray-500 uppercase font-semibold mb-1">Fuel</span>
                  <span className="font-bold text-white">{bike.fuelType}</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-colors">
                  <Settings className="w-7 h-7 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-gray-500 uppercase font-semibold mb-1">Trans</span>
                  <span className="font-bold text-white">{bike.transmission}</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-colors">
                  <MapPin className="w-7 h-7 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-gray-500 uppercase font-semibold mb-1">Mileage</span>
                  <span className="font-bold text-white">{bike.mileage} kmpl</span>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 mb-10 backdrop-blur-md">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-2 rounded-xl">
                    <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white text-lg">Security Deposit</h4>
                    <p className="text-gray-300 font-light mt-1 text-sm">A refundable security deposit of <strong className="text-white">₹{bike.depositAmount}</strong> is required at the time of pickup.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                {isAvailable ? (
                  <Link to={`/booking/${bike.bikeId}`} className="block">
                    <Button size="lg" className="w-full h-14 text-lg rounded-2xl shadow-[0_0_20px_rgba(255,51,102,0.3)]">Rent This Bike</Button>
                  </Link>
                ) : (
                  <Button size="lg" disabled variant="secondary" className="w-full h-14 text-lg rounded-2xl">Currently Not Available</Button>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
