import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Bike, CalendarDays, Wallet, Banknote } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBikes: 0,
    availableBikes: 0,
    totalBookings: 0,
    pendingPayments: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  // Mock chart data
  const data = [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 5000 },
    { name: 'Thu', revenue: 2780 },
    { name: 'Fri', revenue: 8900 },
    { name: 'Sat', revenue: 12390 },
    { name: 'Sun', revenue: 10490 },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const bikes = await api.getBikes();
        const bookings = await api.getBookings();
        
        const available = bikes.filter(b => b.availability === 'Available').length;
        const pending = bookings.filter(b => b.paymentStatus === 'Verification Pending').length;
        const revenue = bookings.filter(b => b.paymentStatus === 'Verified').reduce((acc, curr) => acc + curr.totalAmount, 0);

        setStats({
          totalBikes: bikes.length,
          availableBikes: available,
          totalBookings: bookings.length,
          pendingPayments: pending,
          revenue
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, colorClass }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`p-4 rounded-xl ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  );

  if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Rydex Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Bikes" 
          value={stats.totalBikes} 
          icon={Bike} 
          colorClass="bg-blue-50 text-blue-600" 
        />
        <StatCard 
          title="Available Bikes" 
          value={stats.availableBikes} 
          icon={Bike} 
          colorClass="bg-green-50 text-green-600" 
        />
        <StatCard 
          title="Total Bookings" 
          value={stats.totalBookings} 
          icon={CalendarDays} 
          colorClass="bg-purple-50 text-purple-600" 
        />
        <StatCard 
          title="Pending Payments" 
          value={stats.pendingPayments} 
          icon={Wallet} 
          colorClass="bg-orange-50 text-orange-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#FF5A1F" strokeWidth={3} dot={{ r: 4, fill: '#FF5A1F' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-green-50 rounded-xl text-green-600">
              <Banknote className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <h3 className="text-3xl font-bold text-gray-900">₹{stats.revenue.toLocaleString()}</h3>
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h4 className="font-semibold text-gray-900">Bike Status</h4>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span> Available
              </span>
              <span className="font-medium text-gray-900">{stats.availableBikes}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span> Rented / Unavailable
              </span>
              <span className="font-medium text-gray-900">{stats.totalBikes - stats.availableBikes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
