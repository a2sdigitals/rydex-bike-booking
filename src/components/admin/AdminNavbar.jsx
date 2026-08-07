import React from 'react';
import { Menu, Bell, UserCircle } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminNavbar = ({ toggleSidebar }) => {
  const { admin } = useAdminAuth();

  return (
    <header className="bg-white/5 backdrop-blur-md border-b border-white/10 h-16 flex items-center justify-between px-4 sm:px-6 z-10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-2 -ml-2 mr-2 text-gray-400 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-white p-2 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border border-background-black shadow-[0_0_8px_rgba(255,51,102,0.8)]"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <UserCircle className="w-8 h-8 text-gray-400" />
          <div className="hidden sm:block text-sm">
            <p className="font-heading font-medium text-white leading-tight">{admin?.name || 'Admin'}</p>
            <p className="text-gray-400 text-xs font-light">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};
