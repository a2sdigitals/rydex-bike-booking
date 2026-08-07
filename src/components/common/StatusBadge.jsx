import React from 'react';

export const StatusBadge = ({ status }) => {
  let styles = "bg-white/10 text-gray-300 border border-white/10";
  
  if (['Available', 'Confirmed', 'Verified', 'Active'].includes(status)) {
    styles = "bg-status-success/20 text-green-400 border border-status-success/30";
  } else if (['Not Available', 'Rejected', 'Cancelled'].includes(status)) {
    styles = "bg-status-danger/20 text-red-400 border border-status-danger/30";
  } else if (['Pending', 'Verification Pending'].includes(status)) {
    styles = "bg-status-warning/20 text-yellow-400 border border-status-warning/30";
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
};
