import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, MapPin, Gauge, Droplet, Settings } from 'lucide-react';
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
      <div className="min-h-[80vh] flex items-center justify-center bg-background-light">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!bike) return null;

  const isAvailable = bike.availability === 'Available';

  return (
    <div className="bg-background-light min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Image Section */}
            <div className="bg-gray-100 relative min-h-[400px] lg:min-h-full">
              <img 
                src={bike.image} 
                alt={bike.bikeName} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{bike.bikeName}</h1>
                  <p className="text-gray-500 font-medium">{bike.brand} • {bike.model}</p>
                </div>
                <StatusBadge status={bike.availability} />
              </div>

              <div className="flex items-end gap-2 mb-8">
                <span className="text-4xl font-extrabold text-primary">₹{bike.pricePerDay}</span>
                <span className="text-gray-500 mb-1">/ day</span>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                {bike.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                  <Gauge className="w-6 h-6 text-primary mb-2" />
                  <span className="text-xs text-gray-500 uppercase font-semibold">Engine</span>
                  <span className="font-bold text-gray-900">{bike.engineCC} CC</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                  <Droplet className="w-6 h-6 text-primary mb-2" />
                  <span className="text-xs text-gray-500 uppercase font-semibold">Fuel</span>
                  <span className="font-bold text-gray-900">{bike.fuelType}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                  <Settings className="w-6 h-6 text-primary mb-2" />
                  <span className="text-xs text-gray-500 uppercase font-semibold">Transmission</span>
                  <span className="font-bold text-gray-900">{bike.transmission}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                  <MapPin className="w-6 h-6 text-primary mb-2" />
                  <span className="text-xs text-gray-500 uppercase font-semibold">Mileage</span>
                  <span className="font-bold text-gray-900">{bike.mileage} kmpl</span>
                </div>
              </div>

              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-8">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 text-sm">Security Deposit</h4>
                    <p className="text-blue-800/80 text-sm mt-1">A refundable security deposit of <strong>₹{bike.depositAmount}</strong> is required at the time of pickup.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                {isAvailable ? (
                  <Link to={`/booking/${bike.bikeId}`} className="block">
                    <Button size="lg" className="w-full">Rent This Bike</Button>
                  </Link>
                ) : (
                  <Button size="lg" disabled variant="secondary" className="w-full">Currently Not Available</Button>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
