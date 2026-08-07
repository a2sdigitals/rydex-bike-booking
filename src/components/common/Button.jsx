import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-black disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-[0_0_20px_rgba(255,51,102,0.4)] border border-primary/50 focus:ring-primary",
    secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-md focus:ring-white/30",
    outline: "border-2 border-white/20 text-gray-300 hover:border-primary hover:text-white hover:shadow-[0_0_15px_rgba(255,51,102,0.2)] focus:ring-primary",
    danger: "bg-gradient-to-r from-red-500 to-red-700 text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] focus:ring-red-500 border border-red-500/50",
    ghost: "text-gray-400 hover:text-white hover:bg-white/10 focus:ring-white/30"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <motion.button 
      whileHover={{ scale: props.disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: props.disabled || isLoading ? 1 : 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </motion.button>
  );
};
