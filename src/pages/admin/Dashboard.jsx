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
    <div className="glass-panel p-6 rounded-3xl flex items-center gap-5 hover:bg-white/5 transition-colors">
      <div className={`p-4 rounded-2xl ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-400 mb-1 font-light">{title}</p>
        <h3 className="text-2xl font-heading font-bold text-white">{value}</h3>
      </div>
    </div>
  );

  if (loading) {
    return <div className="p-8 text-white font-light">Loading dashboard...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pt-4">
      <h1 className="text-3xl font-heading font-black text-white mb-8 tracking-tight">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Bikes" 
          value={stats.totalBikes} 
          icon={Bike} 
          colorClass="bg-blue-500/20 text-blue-400 border border-blue-500/30" 
        />
        <StatCard 
          title="Available Bikes" 
          value={stats.availableBikes} 
          icon={Bike} 
          colorClass="bg-green-500/20 text-green-400 border border-green-500/30" 
        />
        <StatCard 
          title="Total Bookings" 
          value={stats.totalBookings} 
          icon={CalendarDays} 
          colorClass="bg-purple-500/20 text-purple-400 border border-purple-500/30" 
        />
        <StatCard 
          title="Pending Payments" 
          value={stats.pendingPayments} 
          icon={Wallet} 
          colorClass="bg-orange-500/20 text-orange-400 border border-orange-500/30" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl">
          <h3 className="text-xl font-heading font-bold text-white mb-6">Revenue Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(11,13,16,0.9)', backdropFilter: 'blur(8px)', color: '#fff' }}
                  itemStyle={{ color: '#FF3366' }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#FF3366" strokeWidth={4} dot={{ r: 4, fill: '#FF3366', strokeWidth: 2, stroke: '#1A1D24' }} activeDot={{ r: 7, strokeWidth: 0, fill: '#00F0FF' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-2xl text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
              <Banknote className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400 font-light">Total Revenue</p>
              <h3 className="text-3xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mt-1">₹{stats.revenue.toLocaleString()}</h3>
            </div>
          </div>
          
          <div className="space-y-6 pt-6 border-t border-white/10 mt-auto">
            <h4 className="font-heading font-bold text-white text-lg">Bike Status</h4>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 flex items-center gap-3 font-light">
                <span className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></span> Available
              </span>
              <span className="font-bold text-white text-lg">{stats.availableBikes}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 flex items-center gap-3 font-light">
                <span className="w-3 h-3 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]"></span> Rented / Unavailable
              </span>
              <span className="font-bold text-white text-lg">{stats.totalBikes - stats.availableBikes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
