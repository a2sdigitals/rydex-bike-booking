import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    bike: null,
    personalDetails: null,
    rentalDetails: null,
    amounts: null,
  });

  const updateBookingData = (step, data) => {
    setBookingData((prev) => ({ ...prev, [step]: data }));
  };

  const clearBooking = () => {
    setBookingData({
      bike: null,
      personalDetails: null,
      rentalDetails: null,
      amounts: null,
    });
  };

  return (
    <BookingContext.Provider value={{ bookingData, updateBookingData, clearBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
