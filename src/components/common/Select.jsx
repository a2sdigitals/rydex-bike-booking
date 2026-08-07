import React, { forwardRef } from 'react';

export const Select = forwardRef(({ label, options, error, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`w-full px-4 py-2.5 rounded-lg border ${
          error ? 'border-status-danger focus:ring-status-danger' : 'border-gray-300 focus:border-primary focus:ring-primary'
        } bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors appearance-none ${className}`}
        {...props}
      >
        <option value="" disabled>Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-status-danger">{error}</p>}
    </div>
  );
});
Select.displayName = 'Select';
