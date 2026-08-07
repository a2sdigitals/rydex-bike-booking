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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
        <div className="flex gap-4 w-full sm:w-auto">
          <Input 
            placeholder="Search by ID, Name, Phone..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="w-full sm:w-64"
          />
          <Select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
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

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                <th className="p-4">Booking ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Bike</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="7" className="p-8 text-center text-gray-500">Loading bookings...</td></tr>
              ) : filteredBookings.length === 0 ? (
                <tr><td colSpan="7" className="p-8 text-center text-gray-500">No Bookings Found.</td></tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.bookingId} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-mono text-sm text-gray-900">{booking.bookingId}</td>
                    <td className="p-4">
                      <p className="font-semibold text-gray-900">{booking.fullName}</p>
                      <p className="text-xs text-gray-500">{booking.phone}</p>
                    </td>
                    <td className="p-4 text-gray-900">{booking.bikeName}</td>
                    <td className="p-4 text-gray-600 text-sm">
                      {booking.startDate} <br/><span className="text-xs text-gray-400">{booking.startTime}</span>
                    </td>
                    <td className="p-4 font-bold text-gray-900">₹{booking.totalAmount}</td>
                    <td className="p-4"><StatusBadge status={booking.bookingStatus} /></td>
                    <td className="p-4 text-right">
                      <button onClick={() => openDetails(booking)} className="p-2 text-primary hover:bg-orange-50 rounded-lg transition-colors flex items-center gap-2 ml-auto">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <h3 className="font-bold text-gray-900 mb-3 border-b pb-2">Customer Details</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-500">Name:</span> {selectedBooking.fullName}</p>
                  <p><span className="text-gray-500">Phone:</span> {selectedBooking.phone}</p>
                  <p><span className="text-gray-500">Alt Phone:</span> {selectedBooking.altPhone || 'N/A'}</p>
                  <p><span className="text-gray-500">DL Number:</span> <span className="font-mono">{selectedBooking.dlNumber}</span></p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3 border-b pb-2">Rental Details</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-500">Bike:</span> {selectedBooking.bikeName}</p>
                  <p><span className="text-gray-500">Pickup:</span> {selectedBooking.startDate} at {selectedBooking.startTime}</p>
                  <p><span className="text-gray-500">Dropoff:</span> {selectedBooking.endDate}</p>
                  <p><span className="text-gray-500">Reason:</span> {selectedBooking.reason}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Payment Info</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-500">Total:</span> <strong className="text-gray-900">₹{selectedBooking.totalAmount}</strong> (Rent: ₹{selectedBooking.rentAmount}, Dep: ₹{selectedBooking.depositAmount})</p>
                  <p><span className="text-gray-500">Txn ID:</span> <span className="font-mono">{selectedBooking.transactionId}</span></p>
                  <p className="mt-1"><span className="text-gray-500">Payment Status:</span> <StatusBadge status={selectedBooking.paymentStatus} /></p>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Booking Status</h3>
                <StatusBadge status={selectedBooking.bookingStatus} />
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 flex flex-wrap gap-3 justify-end">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Close</Button>
              
              {selectedBooking.bookingStatus === 'Pending' && selectedBooking.paymentStatus === 'Verified' && (
                <Button onClick={() => handleUpdateStatus('Confirmed')}>Confirm Booking</Button>
              )}
              
              {selectedBooking.bookingStatus === 'Confirmed' && (
                <Button onClick={() => handleUpdateStatus('Active')}>Mark Active (Picked Up)</Button>
              )}
              
              {selectedBooking.bookingStatus === 'Active' && (
                <Button onClick={() => handleUpdateStatus('Completed')} className="bg-green-600 hover:bg-green-700">Mark Completed (Returned)</Button>
              )}
              
              {['Pending', 'Confirmed'].includes(selectedBooking.bookingStatus) && (
                <Button variant="danger" onClick={() => handleUpdateStatus('Cancelled')}>Cancel Booking</Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
