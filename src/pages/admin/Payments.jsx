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
    <div className="space-y-6 pt-4">
      <h1 className="text-3xl font-heading font-black text-white mb-8 tracking-tight">Payment Verification</h1>

      <div className="glass-panel rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                <th className="p-5 font-light">Booking ID</th>
                <th className="p-5 font-light">Customer</th>
                <th className="p-5 font-light">Amount</th>
                <th className="p-5 font-light">UPI Txn ID</th>
                <th className="p-5 font-light">Status</th>
                <th className="p-5 text-right font-light">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan="6" className="p-8 text-center text-gray-400 font-light">Loading payments...</td></tr>
              ) : payments.length === 0 ? (
                <tr><td colSpan="6" className="p-8 text-center text-gray-400 font-light">No payments found.</td></tr>
              ) : (
                payments.map((p) => (
                  <tr key={p.bookingId} className="hover:bg-white/5 transition-colors group">
                    <td className="p-5 font-mono text-sm text-gray-300">{p.bookingId}</td>
                    <td className="p-5">
                      <p className="font-heading font-bold text-white tracking-wide">{p.fullName}</p>
                    </td>
                    <td className="p-5 font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">₹{p.totalAmount}</td>
                    <td className="p-5 font-mono text-gray-300">{p.transactionId}</td>
                    <td className="p-5"><StatusBadge status={p.paymentStatus} /></td>
                    <td className="p-5 text-right">
                      {p.paymentStatus === 'Verification Pending' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => confirmAction(p, 'verify')} className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors" title="Verify">
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button onClick={() => confirmAction(p, 'reject')} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" title="Reject">
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-500 text-sm font-light italic">Processed</span>
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
        <p className="text-gray-400 mb-8 font-light text-lg">
          Confirm that you have manually verified the receipt of <strong className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent font-black">₹{selectedBooking?.totalAmount}</strong> for transaction <span className="font-mono text-white">{selectedBooking?.transactionId}</span>?
        </p>
        <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
          <Button variant="outline" onClick={() => setIsVerifyOpen(false)} className="rounded-xl border-white/20 text-gray-300 hover:bg-white/5">Cancel</Button>
          <Button onClick={() => handleVerification(true)} className="rounded-xl bg-green-500 hover:bg-green-600 shadow-[0_0_20px_rgba(34,197,94,0.3)] border-none">Yes, Verified</Button>
        </div>
      </Modal>

      <Modal isOpen={isRejectOpen} onClose={() => setIsRejectOpen(false)} title="Reject Payment">
        <p className="text-gray-400 mb-8 font-light text-lg">
          Are you sure you want to reject the payment for transaction <span className="font-mono text-white">{selectedBooking?.transactionId}</span>? This will cancel the booking.
        </p>
        <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
          <Button variant="outline" onClick={() => setIsRejectOpen(false)} className="rounded-xl border-white/20 text-gray-300 hover:bg-white/5">Cancel</Button>
          <Button variant="danger" onClick={() => handleVerification(false)} className="rounded-xl">Yes, Reject</Button>
        </div>
      </Modal>
    </div>
  );
};
