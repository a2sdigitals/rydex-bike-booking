// src/services/api.js

const API_URL = "https://script.google.com/macros/s/AKfycbyE5v18vXrJtbRemVUYIrQJcrp2vFF9hPXJnMn7FRjWK1TP8N4hqawhYlhHUKYDeqMPHA/exec";

// Helper to mock delay for local testing
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to interact with Google Apps Script
const fetchFromGoogle = async (payload) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        // text/plain prevents CORS preflight issues with Google Apps Script
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload)
    });
    
    const result = await response.json();
    if (!result.success) {
      console.error(`API Error (${payload.action}):`, result.message);
    }
    return result;
  } catch (error) {
    console.error(`Network Error (${payload.action}):`, error);
    throw error;
  }
};

export const api = {
  // --- Admin Auth ---
  adminLogin: async (username, password) => {
    // For now, keep hardcoded admin since there's no Admin sheet
    await delay(800);
    if (username === 'admin' && password === 'admin123') {
      return { success: true, token: 'mock_token_123', name: 'Admin User' };
    }
    throw new Error("Invalid admin credentials");
  },

  // --- Bikes ---
  getBikes: async () => {
    const result = await fetchFromGoogle({ action: 'getBikes' });
    return result.success ? result.data : [];
  },
  
  getBikeById: async (bikeId) => {
    const bikes = await api.getBikes();
    return bikes.find(b => b.bikeId === bikeId) || null;
  },

  addBike: async (bikeData) => {
    const newBike = {
      ...bikeData,
      bikeId: 'b' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const result = await fetchFromGoogle({ action: 'addBike', data: newBike });
    if (result.success) {
      return { success: true, bikeId: newBike.bikeId };
    }
    throw new Error(result.message);
  },

  updateBike: async (bikeId, updates) => {
    const result = await fetchFromGoogle({ action: 'updateBike', bikeId, data: updates });
    if (result.success) {
      return { success: true };
    }
    throw new Error(result.message);
  },

  deleteBike: async (bikeId) => {
    const result = await fetchFromGoogle({ action: 'deleteBike', bikeId });
    if (result.success) {
      return { success: true };
    }
    throw new Error(result.message);
  },

  updateBikePrice: async (bikeId, newPrice) => {
    return api.updateBike(bikeId, { pricePerDay: Number(newPrice) });
  },

  updateBikeAvailability: async (bikeId, availability) => {
    return api.updateBike(bikeId, { availability });
  },

  // --- Bookings ---
  createBooking: async (bookingData) => {
    const newBooking = {
      ...bookingData,
      bookingId: 'RYD-' + new Date().getFullYear() + '-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
      paymentStatus: 'Verification Pending',
      bookingStatus: 'Pending',
      createdAt: new Date().toISOString(),
    };
    
    const result = await fetchFromGoogle({ action: 'createBooking', data: newBooking });
    if (result.success) {
      return { success: true, bookingId: newBooking.bookingId, booking: newBooking };
    }
    throw new Error(result.message);
  },

  getBookings: async () => {
    const result = await fetchFromGoogle({ action: 'getBookings' });
    return result.success ? result.data : [];
  },
  
  getBookingById: async (bookingId) => {
    const bookings = await api.getBookings();
    return bookings.find(b => b.bookingId === bookingId) || null;
  },

  updateBookingStatus: async (bookingId, bookingStatus) => {
    const result = await fetchFromGoogle({ action: 'updateBookingStatus', bookingId, data: { bookingStatus } });
    if (result.success) {
      return { success: true };
    }
    throw new Error(result.message);
  },

  verifyPayment: async (bookingId, isVerified) => {
    const updates = {
      paymentStatus: isVerified ? 'Verified' : 'Rejected',
      bookingStatus: isVerified ? 'Confirmed' : 'Cancelled'
    };
    const result = await fetchFromGoogle({ action: 'updateBookingStatus', bookingId, data: updates });
    if (result.success) {
      return { success: true };
    }
    throw new Error(result.message);
  },

  // --- Messages ---
  createMessage: async (messageData) => {
    const newMessage = {
      ...messageData,
      messageId: 'MSG-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
      createdAt: new Date().toISOString(),
    };
    
    const result = await fetchFromGoogle({ action: 'createMessage', data: newMessage });
    if (result.success) {
      return { success: true, messageId: newMessage.messageId };
    }
    throw new Error(result.message);
  },
};
