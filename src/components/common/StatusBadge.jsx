import React from 'react';

export const StatusBadge = ({ status }) => {
  let styles = "bg-gray-100 text-gray-700";
  
  if (['Available', 'Confirmed', 'Verified', 'Active'].includes(status)) {
    styles = "bg-status-success/10 text-status-success";
  } else if (['Not Available', 'Rejected', 'Cancelled'].includes(status)) {
    styles = "bg-status-danger/10 text-status-danger";
  } else if (['Pending', 'Verification Pending'].includes(status)) {
    styles = "bg-status-warning/10 text-status-warning";
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
};
