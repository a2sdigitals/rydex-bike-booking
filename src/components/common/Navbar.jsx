import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bike, Menu, X, ShieldAlert, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';

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
          <div className={`relative flex items-center justify-between transition-all duration-300 ${
            scrolled 
              ? 'bg-white/80 backdrop-blur-xl shadow-lg border border-white/20 rounded-full h-16 sm:h-20 px-6 sm:px-8' 
              : 'bg-white h-24 px-4 sm:px-8 lg:px-12 border-b border-gray-100'
          }`}>
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group z-50">
              <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-2.5 rounded-xl group-hover:shadow-lg group-hover:shadow-primary/30 group-hover:scale-105 transition-all duration-300">
                <Bike className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tighter text-gray-900 leading-none">RYDEX</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-primary font-bold mt-0.5">Premium Rides</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1 bg-gray-50/80 p-1 rounded-full border border-gray-100">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    className={`relative px-5 py-2 text-sm font-semibold transition-all duration-300 rounded-full ${
                      location.pathname === link.path 
                        ? 'text-white' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                    }`}
                  >
                    {location.pathname === link.path && (
                      <motion.div 
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-gray-900 rounded-full -z-10"
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
              <Link to="/admin/login" className="text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100" title="Admin Login">
                <ShieldAlert className="w-5 h-5" />
              </Link>
              <Link to="/bikes">
                <Button className="rounded-full gap-2 group shadow-md shadow-primary/20">
                  Book Now <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-gray-900 z-50 bg-gray-100 rounded-full" onClick={toggleMenu}>
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
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden pt-28 px-6 pb-6 flex flex-col h-[100dvh]"
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
                    className={`block text-3xl font-black tracking-tight ${
                      location.pathname === link.path ? 'text-primary' : 'text-gray-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="pt-6 border-t border-gray-200 mt-auto flex flex-col gap-4 pb-8">
              <Link to="/bikes" onClick={() => setIsOpen(false)}>
                <Button size="lg" className="w-full rounded-full text-lg shadow-lg shadow-primary/20">Rent a Bike</Button>
              </Link>
              <Link to="/admin/login" onClick={() => setIsOpen(false)} className="text-center text-gray-500 hover:text-gray-900 font-semibold py-3 flex items-center justify-center gap-2 bg-gray-100 rounded-full">
                <ShieldAlert className="w-5 h-5" /> Admin Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
