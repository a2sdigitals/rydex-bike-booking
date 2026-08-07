import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { StatusBadge } from '../common/StatusBadge';

export const BikeCard = ({ bike }) => {
  const isAvailable = bike.availability === 'Available';
  
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl group ${!isAvailable ? 'opacity-75' : ''}`}>
      <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
        <img 
          src={bike.image} 
          alt={bike.bikeName} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <StatusBadge status={bike.availability} />
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">{bike.bikeName}</h3>
            <p className="text-sm text-gray-500">{bike.brand} • {bike.model}</p>
          </div>
          <div className="text-right">
            <span className="block font-bold text-lg text-primary">₹{bike.pricePerDay}</span>
            <span className="text-xs text-gray-500">/ day</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 my-4 text-xs font-medium text-gray-600 bg-gray-50 p-3 rounded-lg">
          <div className="flex flex-col"><span className="text-gray-400">Engine</span>{bike.engineCC} CC</div>
          <div className="flex flex-col"><span className="text-gray-400">Type</span>{bike.category}</div>
          <div className="flex flex-col"><span className="text-gray-400">Trans</span>{bike.transmission}</div>
          <div className="flex flex-col"><span className="text-gray-400">Fuel</span>{bike.fuelType}</div>
        </div>
        
        {isAvailable ? (
          <Link to={`/bikes/${bike.bikeId}`} className="block">
            <Button className="w-full">Rent Now</Button>
          </Link>
        ) : (
          <Button className="w-full" disabled variant="secondary">Currently Unavailable</Button>
        )}
      </div>
    </div>
  );
};
