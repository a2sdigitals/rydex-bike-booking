import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { BookingProvider } from './context/BookingContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <BookingProvider>
          <AppRoutes />
          <Toaster 
            position="top-right"
            toastOptions={{
              className: 'font-medium',
              duration: 3000,
            }}
          />
        </BookingProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}

export default App;
