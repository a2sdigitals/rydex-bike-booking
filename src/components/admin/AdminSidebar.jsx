import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Bike, CalendarDays, Wallet, LogOut, X } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { logout } = useAdminAuth();

  const links = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Bikes', path: '/admin/bikes', icon: Bike },
    { name: 'Bookings', path: '/admin/bookings', icon: CalendarDays },
    { name: 'Payments', path: '/admin/payments', icon: Wallet },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white/5 backdrop-blur-xl border-r border-white/10 w-64 shadow-[10px_0_30px_rgba(0,0,0,0.5)] relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointer-events-none" />
      <div className="flex items-center justify-between h-16 px-6 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 border border-primary/30 text-primary p-1.5 rounded-lg shadow-[0_0_10px_rgba(255,51,102,0.2)]">
            <Bike className="w-5 h-5" />
          </div>
          <span className="font-heading font-black text-xl tracking-tight text-white">Admin</span>
        </div>
        <button className="md:hidden text-gray-400 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 relative z-10">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname.startsWith(link.path);
          return (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                isActive 
                  ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(255,51,102,0.15)]' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-gray-500'}`} />
              <span className="font-heading font-semibold tracking-wide">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 relative z-10">
        <button 
          onClick={logout}
          className="flex items-center justify-center gap-2 px-4 py-3 w-full rounded-xl font-heading font-bold text-red-400 hover:text-white border border-red-500/30 hover:bg-red-500/80 hover:shadow-[0_0_20px_rgba(248,113,113,0.4)] transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col h-full z-10">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background-black/80 z-40 md:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 md:hidden"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
