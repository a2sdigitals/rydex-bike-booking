import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bike, Menu, X, ShieldAlert, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Bikes', path: '/bikes' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Spacer for fixed navbar */}
      <div className="h-24"></div>
      
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'pt-2 sm:pt-4 px-2 sm:px-6' : 'pt-0 px-0'}`}>
        <div className={`mx-auto transition-all duration-300 ${scrolled ? 'max-w-7xl' : 'w-full'}`}>
          <div className={cn(
            "relative flex items-center justify-between transition-all duration-300",
            scrolled 
              ? 'glass-panel rounded-full h-16 sm:h-20 px-6 sm:px-8' 
              : 'bg-background-black/50 backdrop-blur-sm h-24 px-4 sm:px-8 lg:px-12 border-b border-white/5'
          )}>
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group z-50">
              <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-2.5 rounded-xl group-hover:shadow-[0_0_20px_rgba(255,51,102,0.5)] group-hover:scale-105 transition-all duration-300 border border-white/10">
                <Bike className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-2xl tracking-tighter text-white leading-none group-hover:text-primary transition-colors">RYDEX</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-accent font-bold mt-0.5">Premium Rides</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    className={cn(
                      "relative px-5 py-2 text-sm font-semibold transition-all duration-300 rounded-full",
                      location.pathname === link.path 
                        ? 'text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {location.pathname === link.path && (
                      <motion.div 
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-primary/20 border border-primary/50 rounded-full -z-10 shadow-[0_0_15px_rgba(255,51,102,0.3)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {link.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-4 z-50">
              <Link to="/admin/login" className="text-gray-400 hover:text-accent transition-colors p-2 rounded-full hover:bg-white/5 border border-transparent hover:border-accent/30" title="Admin Login">
                <ShieldAlert className="w-5 h-5" />
              </Link>
              <Link to="/bikes">
                <Button className="rounded-full gap-2 group shadow-[0_0_15px_rgba(255,51,102,0.4)] hover:shadow-[0_0_25px_rgba(255,51,102,0.6)] border border-primary/50">
                  Book Now <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-white z-50 bg-white/10 rounded-full border border-white/20" onClick={toggleMenu}>
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background-black/95 backdrop-blur-2xl md:hidden pt-28 px-6 pb-6 flex flex-col h-[100dvh]"
          >
            <div className="flex-1 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block text-3xl font-heading font-black tracking-tight",
                      location.pathname === link.path ? 'text-primary drop-shadow-[0_0_10px_rgba(255,51,102,0.5)]' : 'text-white'
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="pt-6 border-t border-white/10 mt-auto flex flex-col gap-4 pb-8">
              <Link to="/bikes" onClick={() => setIsOpen(false)}>
                <Button size="lg" className="w-full rounded-full text-lg shadow-[0_0_20px_rgba(255,51,102,0.3)]">Rent a Bike</Button>
              </Link>
              <Link to="/admin/login" onClick={() => setIsOpen(false)} className="text-center text-gray-400 hover:text-white font-semibold py-3 flex items-center justify-center gap-2 bg-white/5 rounded-full border border-white/10">
                <ShieldAlert className="w-5 h-5" /> Admin Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
