import React, { forwardRef } from 'react';

export const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full px-4 py-2.5 rounded-lg border ${
          error ? 'border-status-danger focus:ring-status-danger' : 'border-white/10 focus:border-primary focus:ring-primary'
        } bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-status-danger">{error}</p>}
    </div>
  );
});
Input.displayName = 'Input';
