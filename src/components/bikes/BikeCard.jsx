import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { StatusBadge } from '../common/StatusBadge';

export const BikeCard = ({ bike }) => {
  const isAvailable = bike.availability === 'Available';
  
  return (
    <div className={`glass-panel rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,51,102,0.2)] hover:-translate-y-2 group ${!isAvailable ? 'opacity-75 grayscale-[0.5]' : ''}`}>
      <div className="relative h-48 sm:h-56 overflow-hidden bg-background-black/50 border-b border-white/5">
        <img 
          src={bike.image} 
          alt={bike.bikeName} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-surface to-transparent opacity-60"></div>
        <div className="absolute top-4 left-4 z-10">
          <StatusBadge status={bike.availability} />
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-heading font-bold text-xl text-white group-hover:text-primary transition-colors tracking-wide">{bike.bikeName}</h3>
            <p className="text-sm text-gray-400 font-light">{bike.brand} • {bike.model}</p>
          </div>
          <div className="text-right">
            <span className="block font-heading font-black text-xl text-primary">₹{bike.pricePerDay}</span>
            <span className="text-xs text-gray-500 font-light">/ day</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 my-5 text-xs font-medium text-gray-300 bg-white/5 border border-white/5 p-4 rounded-2xl">
          <div className="flex flex-col"><span className="text-gray-500 mb-1 font-light">Engine</span>{bike.engineCC} CC</div>
          <div className="flex flex-col"><span className="text-gray-500 mb-1 font-light">Type</span>{bike.category}</div>
          <div className="flex flex-col"><span className="text-gray-500 mb-1 font-light">Trans</span>{bike.transmission}</div>
          <div className="flex flex-col"><span className="text-gray-500 mb-1 font-light">Fuel</span>{bike.fuelType}</div>
        </div>
        
        {isAvailable ? (
          <Link to={`/bikes/${bike.bikeId}`} className="block">
            <Button className="w-full rounded-xl">Rent Now</Button>
          </Link>
        ) : (
          <Button className="w-full rounded-xl" disabled variant="secondary">Currently Unavailable</Button>
        )}
      </div>
    </div>
  );
};
