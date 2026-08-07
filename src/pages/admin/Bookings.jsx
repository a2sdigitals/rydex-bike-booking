import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { api } from '../../services/api';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import toast from 'react-hot-toast';

export const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    let result = bookings;
    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter(b => 
        b.bookingId.toLowerCase().includes(lowerSearch) || 
        b.fullName.toLowerCase().includes(lowerSearch) ||
        b.phone.includes(lowerSearch) ||
        b.dlNumber.toLowerCase().includes(lowerSearch)
      );
    }
    if (statusFilter !== 'All') {
      result = result.filter(b => b.bookingStatus === statusFilter);
    }
    setFilteredBookings(result);
  }, [search, statusFilter, bookings]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await api.getBookings();
      setBookings(data);
    } catch (error) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const openDetails = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async (status) => {
    try {
      await api.updateBookingStatus(selectedBooking.bookingId, status);
      toast.success(`Booking marked as ${status}`);
      setIsModalOpen(false);
      fetchBookings();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-heading font-black text-white tracking-tight">Booking Management</h1>
        <div className="flex gap-4 w-full sm:w-auto">
          <Input 
            placeholder="Search by ID, Name, Phone..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="w-full sm:w-64 bg-background-black/50 text-white border-white/10"
          />
          <Select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-background-black/50 text-white border-white/10"
            options={[
              { label: 'All Status', value: 'All' },
              { label: 'Pending', value: 'Pending' },
              { label: 'Confirmed', value: 'Confirmed' },
              { label: 'Active', value: 'Active' },
              { label: 'Completed', value: 'Completed' },
              { label: 'Cancelled', value: 'Cancelled' }
            ]}
          />
        </div>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                <th className="p-5 font-light">Booking ID</th>
                <th className="p-5 font-light">Customer</th>
                <th className="p-5 font-light">Bike</th>
                <th className="p-5 font-light">Date</th>
                <th className="p-5 font-light">Total</th>
                <th className="p-5 font-light">Status</th>
                <th className="p-5 text-right font-light">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan="7" className="p-8 text-center text-gray-400 font-light">Loading bookings...</td></tr>
              ) : filteredBookings.length === 0 ? (
                <tr><td colSpan="7" className="p-8 text-center text-gray-400 font-light">No Bookings Found.</td></tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.bookingId} className="hover:bg-white/5 transition-colors group">
                    <td className="p-5 font-mono text-sm text-gray-300">{booking.bookingId}</td>
                    <td className="p-5">
                      <p className="font-heading font-bold text-white tracking-wide">{booking.fullName}</p>
                      <p className="text-xs text-gray-400 font-light">{booking.phone}</p>
                    </td>
                    <td className="p-5 text-gray-300">{booking.bikeName}</td>
                    <td className="p-5 text-gray-400 text-sm font-light">
                      {booking.startDate} <br/><span className="text-xs text-gray-500">{booking.startTime}</span>
                    </td>
                    <td className="p-5 font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">₹{booking.totalAmount}</td>
                    <td className="p-5"><StatusBadge status={booking.bookingStatus} /></td>
                    <td className="p-5 text-right">
                      <button onClick={() => openDetails(booking)} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors flex items-center gap-2 ml-auto">
                        <Eye className="w-4 h-4" /> <span className="text-sm font-medium">View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Booking ${selectedBooking?.bookingId}`} className="max-w-2xl">
        {selectedBooking && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div>
                <h3 className="font-heading font-bold text-white mb-3 border-b border-white/10 pb-2">Customer Details</h3>
                <div className="space-y-2 text-sm font-light">
                  <p><span className="text-gray-400">Name:</span> <span className="text-white">{selectedBooking.fullName}</span></p>
                  <p><span className="text-gray-400">Phone:</span> <span className="text-white">{selectedBooking.phone}</span></p>
                  <p><span className="text-gray-400">Alt Phone:</span> <span className="text-white">{selectedBooking.altPhone || 'N/A'}</span></p>
                  <p><span className="text-gray-400">DL Number:</span> <span className="font-mono text-white">{selectedBooking.dlNumber}</span></p>
                </div>
              </div>

              <div>
                <h3 className="font-heading font-bold text-white mb-3 border-b border-white/10 pb-2">Rental Details</h3>
                <div className="space-y-2 text-sm font-light">
                  <p><span className="text-gray-400">Bike:</span> <span className="text-white">{selectedBooking.bikeName}</span></p>
                  <p><span className="text-gray-400">Pickup:</span> <span className="text-white">{selectedBooking.startDate} at {selectedBooking.startTime}</span></p>
                  <p><span className="text-gray-400">Dropoff:</span> <span className="text-white">{selectedBooking.endDate}</span></p>
                  <p><span className="text-gray-400">Reason:</span> <span className="text-white">{selectedBooking.reason}</span></p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-heading font-bold text-white mb-3">Payment Info</h3>
                <div className="space-y-2 text-sm font-light">
                  <p><span className="text-gray-400">Total:</span> <strong className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent font-black">₹{selectedBooking.totalAmount}</strong> <br/><span className="text-xs text-gray-500">(Rent: ₹{selectedBooking.rentAmount}, Dep: ₹{selectedBooking.depositAmount})</span></p>
                  <p><span className="text-gray-400">Txn ID:</span> <span className="font-mono text-white">{selectedBooking.transactionId}</span></p>
                  <p className="mt-2 flex items-center gap-2"><span className="text-gray-400">Payment Status:</span> <StatusBadge status={selectedBooking.paymentStatus} /></p>
                </div>
              </div>
              
              <div>
                <h3 className="font-heading font-bold text-white mb-3">Booking Status</h3>
                <StatusBadge status={selectedBooking.bookingStatus} />
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 flex flex-wrap gap-3 justify-end">
              <Button variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-xl border-white/20 text-gray-300 hover:bg-white/5">Close</Button>
              
              {selectedBooking.bookingStatus === 'Pending' && selectedBooking.paymentStatus === 'Verified' && (
                <Button onClick={() => handleUpdateStatus('Confirmed')} className="rounded-xl shadow-[0_0_20px_rgba(255,51,102,0.3)]">Confirm Booking</Button>
              )}
              
              {selectedBooking.bookingStatus === 'Confirmed' && (
                <Button onClick={() => handleUpdateStatus('Active')} className="rounded-xl shadow-[0_0_20px_rgba(255,51,102,0.3)]">Mark Active (Picked Up)</Button>
              )}
              
              {selectedBooking.bookingStatus === 'Active' && (
                <Button onClick={() => handleUpdateStatus('Completed')} className="rounded-xl bg-green-500 hover:bg-green-600 shadow-[0_0_20px_rgba(34,197,94,0.3)]">Mark Completed (Returned)</Button>
              )}
              
              {['Pending', 'Confirmed'].includes(selectedBooking.bookingStatus) && (
                <Button variant="danger" onClick={() => handleUpdateStatus('Cancelled')} className="rounded-xl">Cancel Booking</Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
