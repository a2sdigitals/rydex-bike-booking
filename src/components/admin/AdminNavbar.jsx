import React from 'react';
import { Menu, Bell, UserCircle } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminNavbar = ({ toggleSidebar }) => {
  const { admin } = useAdminAuth();

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 z-10">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-2 -ml-2 mr-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
          <UserCircle className="w-8 h-8 text-gray-400" />
          <div className="hidden sm:block text-sm">
            <p className="font-medium text-gray-900 leading-tight">{admin?.name || 'Admin'}</p>
            <p className="text-gray-500 text-xs">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};
