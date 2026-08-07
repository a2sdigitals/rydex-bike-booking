import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { StatusBadge } from '../common/StatusBadge';
import { ArrowRight, Repeat2 } from 'lucide-react';

export const BikeCard = ({ bike }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isAvailable = bike.availability === 'Available';
  
  return (
    <div
      className={`group relative h-[440px] w-full [perspective:2000px] ${!isAvailable ? 'opacity-75 grayscale-[0.5]' : ''}`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative h-full w-full [transform-style:preserve-3d] transition-[transform] duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-none ${
          isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
        }`}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(0deg)] glass-panel rounded-3xl overflow-hidden transition-shadow duration-500 hover:shadow-[0_0_30px_rgba(255,51,102,0.2)] flex flex-col"
        >
          <div className="relative h-56 overflow-hidden bg-background-black/50 border-b border-white/5">
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
          <div className="p-6 flex-1 flex flex-col justify-between">
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
            
            <div className="flex justify-between items-end mt-4">
               <div className="text-xs text-gray-500 flex items-center gap-1 group-hover:text-primary/70 transition-colors">
                 <Repeat2 className="w-4 h-4" /> Hover to flip
               </div>
               <div className="flex items-center gap-2 text-primary font-heading font-medium text-sm transition-transform duration-300 group-hover:translate-x-1">
                 View Specs <ArrowRight className="w-4 h-4" />
               </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] glass-panel rounded-3xl p-6 flex flex-col transition-shadow duration-500 hover:shadow-[0_0_40px_rgba(255,51,102,0.3)] bg-background-surface/90 backdrop-blur-xl border border-primary/20"
        >
          <div className="flex-1 space-y-6 flex flex-col">
            <div className="space-y-2">
              <h3 className="font-heading font-bold text-2xl text-white leading-snug tracking-tight transition-transform duration-500 group-hover:translate-y-[-2px]">
                Specifications
              </h3>
              <p className="line-clamp-3 text-sm text-gray-400 tracking-tight transition-transform duration-500 group-hover:translate-y-[-2px]">
                {bike.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 my-5 text-sm font-medium text-gray-300 bg-white/5 border border-white/5 p-4 rounded-2xl flex-1 items-center">
              <div className="flex flex-col" style={{ transform: isFlipped ? "translateX(0)" : "translateX(-10px)", opacity: isFlipped ? 1 : 0, transitionDelay: "150ms", transitionProperty: "transform, opacity", transitionDuration: "300ms", transitionTimingFunction: "cubic-bezier(0.23,1,0.32,1)" }}><span className="text-gray-500 mb-1 font-light text-xs">Engine</span>{bike.engineCC} CC</div>
              <div className="flex flex-col" style={{ transform: isFlipped ? "translateX(0)" : "translateX(-10px)", opacity: isFlipped ? 1 : 0, transitionDelay: "200ms", transitionProperty: "transform, opacity", transitionDuration: "300ms", transitionTimingFunction: "cubic-bezier(0.23,1,0.32,1)" }}><span className="text-gray-500 mb-1 font-light text-xs">Type</span>{bike.category}</div>
              <div className="flex flex-col" style={{ transform: isFlipped ? "translateX(0)" : "translateX(-10px)", opacity: isFlipped ? 1 : 0, transitionDelay: "250ms", transitionProperty: "transform, opacity", transitionDuration: "300ms", transitionTimingFunction: "cubic-bezier(0.23,1,0.32,1)" }}><span className="text-gray-500 mb-1 font-light text-xs">Trans</span>{bike.transmission}</div>
              <div className="flex flex-col" style={{ transform: isFlipped ? "translateX(0)" : "translateX(-10px)", opacity: isFlipped ? 1 : 0, transitionDelay: "300ms", transitionProperty: "transform, opacity", transitionDuration: "300ms", transitionTimingFunction: "cubic-bezier(0.23,1,0.32,1)" }}><span className="text-gray-500 mb-1 font-light text-xs">Fuel</span>{bike.fuelType}</div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            {isAvailable ? (
              <Link to={`/bikes/${bike.bikeId}`} className="block">
                <Button className="w-full rounded-xl flex items-center justify-center gap-2">Rent Now <ArrowRight className="w-4 h-4" /></Button>
              </Link>
            ) : (
              <Button className="w-full rounded-xl" disabled variant="secondary">Currently Unavailable</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
