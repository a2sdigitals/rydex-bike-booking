import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { api } from '../../services/api';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import toast from 'react-hot-toast';

export const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const data = await api.getBookings();
      // Only show bookings that have a transaction ID and are relevant to payments
      const paymentData = data.filter(b => b.transactionId).sort((a, b) => {
        // Pending first
        if (a.paymentStatus === 'Verification Pending' && b.paymentStatus !== 'Verification Pending') return -1;
        if (a.paymentStatus !== 'Verification Pending' && b.paymentStatus === 'Verification Pending') return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setPayments(paymentData);
    } catch (error) {
      toast.error("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  const confirmAction = (booking, action) => {
    setSelectedBooking(booking);
    if (action === 'verify') setIsVerifyOpen(true);
    if (action === 'reject') setIsRejectOpen(true);
  };

  const handleVerification = async (isVerified) => {
    try {
      await api.verifyPayment(selectedBooking.bookingId, isVerified);
      toast.success(isVerified ? "Payment Verified" : "Payment Rejected");
      setIsVerifyOpen(false);
      setIsRejectOpen(false);
      fetchPayments();
    } catch (error) {
      toast.error("Failed to verify payment");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Payment Verification</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                <th className="p-4">Booking ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Amount</th>
                <th className="p-4">UPI Txn ID</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="6" className="p-8 text-center text-gray-500">Loading payments...</td></tr>
              ) : payments.length === 0 ? (
                <tr><td colSpan="6" className="p-8 text-center text-gray-500">No payments found.</td></tr>
              ) : (
                payments.map((p) => (
                  <tr key={p.bookingId} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-mono text-sm text-gray-900">{p.bookingId}</td>
                    <td className="p-4">
                      <p className="font-semibold text-gray-900">{p.fullName}</p>
                    </td>
                    <td className="p-4 font-bold text-gray-900">₹{p.totalAmount}</td>
                    <td className="p-4 font-mono text-gray-600">{p.transactionId}</td>
                    <td className="p-4"><StatusBadge status={p.paymentStatus} /></td>
                    <td className="p-4 text-right">
                      {p.paymentStatus === 'Verification Pending' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => confirmAction(p, 'verify')} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Verify">
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button onClick={() => confirmAction(p, 'reject')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm italic">Processed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isVerifyOpen} onClose={() => setIsVerifyOpen(false)} title="Verify Payment">
        <p className="text-gray-600 mb-6">
          Confirm that you have manually verified the receipt of <strong className="text-gray-900">₹{selectedBooking?.totalAmount}</strong> for transaction <span className="font-mono">{selectedBooking?.transactionId}</span>?
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsVerifyOpen(false)}>Cancel</Button>
          <Button onClick={() => handleVerification(true)} className="bg-green-600 hover:bg-green-700 focus:ring-green-600">Yes, Verified</Button>
        </div>
      </Modal>

      <Modal isOpen={isRejectOpen} onClose={() => setIsRejectOpen(false)} title="Reject Payment">
        <p className="text-gray-600 mb-6">
          Are you sure you want to reject the payment for transaction <span className="font-mono">{selectedBooking?.transactionId}</span>? This will cancel the booking.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsRejectOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => handleVerification(false)}>Yes, Reject</Button>
        </div>
      </Modal>
    </div>
  );
};
