import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { BookingProvider } from './context/BookingContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { AppRoutes } from './routes/AppRoutes';
import { AITextLoading } from './components/common/AITextLoading';

function App() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Show the loading screen for 4.5 seconds to cycle through a few texts
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  if (isInitialLoad) {
    return <AITextLoading />;
  }

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
