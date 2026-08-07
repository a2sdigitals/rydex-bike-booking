import React from 'react';
import { Link } from 'react-router-dom';
import { Bike, Camera, Globe, Phone as Whatsapp } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-background-black text-gray-400 pt-16 pb-8 border-t border-white/10 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 blur-[2px]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group inline-flex">
              <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-2 rounded-xl border border-white/10 group-hover:shadow-[0_0_15px_rgba(255,51,102,0.5)] transition-all duration-300">
                <Bike className="w-5 h-5" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl tracking-tight text-white block leading-none group-hover:text-primary transition-colors">RYDEX</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Making bike rentals simple, affordable and accessible. Your ultimate partner for two-wheeler journeys.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white hover:shadow-[0_0_15px_rgba(255,51,102,0.3)] transition-all bg-white/5 border border-white/10 p-2 rounded-full">
                <Camera className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white hover:shadow-[0_0_15px_rgba(255,51,102,0.3)] transition-all bg-white/5 border border-white/10 p-2 rounded-full">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white hover:shadow-[0_0_15px_rgba(255,51,102,0.3)] transition-all bg-white/5 border border-white/10 p-2 rounded-full">
                <Whatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-heading font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/bikes" className="hover:text-primary transition-colors">Bikes</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-heading font-semibold mb-4 text-lg">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Rental Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-heading font-semibold mb-4 text-lg">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>+91 98765 43210</li>
              <li>hello@rydex.com</li>
              <li>123, Rydex Hub, Mumbai, India</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Rydex. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
