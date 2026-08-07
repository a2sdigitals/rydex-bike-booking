// src/services/api.js

const API_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";
const USE_MOCK = true; // Set to false to use Google Apps Script

// Initial Demo Data
const initialBikes = [
  {
    bikeId: 'b1',
    bikeName: 'Honda Activa 6G',
    brand: 'Honda',
    model: 'Activa 6G',
    registrationNumber: 'MH-12-AB-1234',
    category: 'Scooter',
    engineCC: 109,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    mileage: 45,
    pricePerDay: 499,
    depositAmount: 1000,
    image: 'https://images.unsplash.com/photo-1629853336495-2d6ec2a149b5?auto=format&fit=crop&q=80&w=800',
    description: 'A reliable and comfortable scooter for city rides.',
    availability: 'Available',
    createdAt: new Date().toISOString(),
  },
  {
    bikeId: 'b2',
    bikeName: 'TVS Ntorq 125',
    brand: 'TVS',
    model: 'Ntorq 125',
    registrationNumber: 'MH-14-XY-9876',
    category: 'Scooter',
    engineCC: 124,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    mileage: 40,
    pricePerDay: 599,
    depositAmount: 1500,
    image: 'https://images.unsplash.com/photo-1614169542171-d652f1e6b3eb?auto=format&fit=crop&q=80&w=800',
    description: 'Sporty scooter with great performance and tech features.',
    availability: 'Available',
    createdAt: new Date().toISOString(),
  },
  {
    bikeId: 'b3',
    bikeName: 'Royal Enfield Classic 350',
    brand: 'Royal Enfield',
    model: 'Classic 350',
    registrationNumber: 'MH-01-RE-3500',
    category: 'Bike',
    engineCC: 349,
    fuelType: 'Petrol',
    transmission: 'Manual',
    mileage: 35,
    pricePerDay: 1299,
    depositAmount: 3000,
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800',
    description: 'The iconic cruiser for long and comfortable rides.',
    availability: 'Available',
    createdAt: new Date().toISOString(),
  },
  {
    bikeId: 'b4',
    bikeName: 'Yamaha MT-15',
    brand: 'Yamaha',
    model: 'MT-15',
    registrationNumber: 'MH-02-YM-1500',
    category: 'Bike',
    engineCC: 155,
    fuelType: 'Petrol',
    transmission: 'Manual',
    mileage: 45,
    pricePerDay: 1099,
    depositAmount: 2500,
    image: 'https://images.unsplash.com/photo-1621245780517-563b7e738c6f?auto=format&fit=crop&q=80&w=800',
    description: 'Hyper naked street bike with thrilling performance.',
    availability: 'Not Available',
    createdAt: new Date().toISOString(),
  },
  {
    bikeId: 'b5',
    bikeName: 'Bajaj Pulsar N160',
    brand: 'Bajaj',
    model: 'Pulsar N160',
    registrationNumber: 'MH-12-PL-1600',
    category: 'Bike',
    engineCC: 164,
    fuelType: 'Petrol',
    transmission: 'Manual',
    mileage: 42,
    pricePerDay: 799,
    depositAmount: 2000,
    image: 'https://images.unsplash.com/photo-1628867382487-17eb481a511f?auto=format&fit=crop&q=80&w=800',
    description: 'Aggressive styling and refined performance for the city.',
    availability: 'Available',
    createdAt: new Date().toISOString(),
  }
];

// Helper to mock delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to initialize local storage data
const initStorage = () => {
  if (!localStorage.getItem('rydex_bikes')) {
    localStorage.setItem('rydex_bikes', JSON.stringify(initialBikes));
  }
  if (!localStorage.getItem('rydex_bookings')) {
    localStorage.setItem('rydex_bookings', JSON.stringify([]));
  }
};

if (USE_MOCK) {
  initStorage();
}

// --- API Methods ---

export const api = {
  // --- Admin Auth ---
  adminLogin: async (username, password) => {
    if (USE_MOCK) {
      await delay(800);
      if (username === 'admin' && password === 'admin123') {
        return { success: true, token: 'mock_token_123', name: 'Admin User' };
      }
      throw new Error("Invalid admin credentials");
    }
    // TODO: Google Apps Script fetch implementation
  },

  // --- Bikes ---
  getBikes: async () => {
    if (USE_MOCK) {
      await delay(500);
      return JSON.parse(localStorage.getItem('rydex_bikes') || '[]');
    }
  },
  
  getBikeById: async (bikeId) => {
    if (USE_MOCK) {
      await delay(300);
      const bikes = JSON.parse(localStorage.getItem('rydex_bikes') || '[]');
      return bikes.find(b => b.bikeId === bikeId) || null;
    }
  },

  addBike: async (bikeData) => {
    if (USE_MOCK) {
      await delay(800);
      const bikes = JSON.parse(localStorage.getItem('rydex_bikes') || '[]');
      const newBike = {
        ...bikeData,
        bikeId: 'b' + Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      bikes.push(newBike);
      localStorage.setItem('rydex_bikes', JSON.stringify(bikes));
      return { success: true, bikeId: newBike.bikeId };
    }
  },

  updateBike: async (bikeId, updates) => {
    if (USE_MOCK) {
      await delay(800);
      let bikes = JSON.parse(localStorage.getItem('rydex_bikes') || '[]');
      let updated = false;
      bikes = bikes.map(b => {
        if (b.bikeId === bikeId) {
          updated = true;
          return { ...b, ...updates, updatedAt: new Date().toISOString() };
        }
        return b;
      });
      if (!updated) throw new Error("Bike not found");
      localStorage.setItem('rydex_bikes', JSON.stringify(bikes));
      return { success: true };
    }
  },

  deleteBike: async (bikeId) => {
    if (USE_MOCK) {
      await delay(800);
      let bikes = JSON.parse(localStorage.getItem('rydex_bikes') || '[]');
      bikes = bikes.filter(b => b.bikeId !== bikeId);
      localStorage.setItem('rydex_bikes', JSON.stringify(bikes));
      return { success: true };
    }
  },

  updateBikePrice: async (bikeId, newPrice) => {
    return api.updateBike(bikeId, { pricePerDay: Number(newPrice) });
  },

  updateBikeAvailability: async (bikeId, availability) => {
    return api.updateBike(bikeId, { availability });
  },

  // --- Bookings ---
  createBooking: async (bookingData) => {
    if (USE_MOCK) {
      await delay(1000);
      const bookings = JSON.parse(localStorage.getItem('rydex_bookings') || '[]');
      const newBooking = {
        ...bookingData,
        bookingId: 'RYD-' + new Date().getFullYear() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase(),
        paymentStatus: 'Verification Pending',
        bookingStatus: 'Pending',
        createdAt: new Date().toISOString(),
      };
      bookings.push(newBooking);
      localStorage.setItem('rydex_bookings', JSON.stringify(bookings));
      return { success: true, bookingId: newBooking.bookingId, booking: newBooking };
    }
  },

  getBookings: async () => {
    if (USE_MOCK) {
      await delay(500);
      return JSON.parse(localStorage.getItem('rydex_bookings') || '[]');
    }
  },
  
  getBookingById: async (bookingId) => {
    if (USE_MOCK) {
      await delay(300);
      const bookings = JSON.parse(localStorage.getItem('rydex_bookings') || '[]');
      return bookings.find(b => b.bookingId === bookingId) || null;
    }
  },

  updateBookingStatus: async (bookingId, bookingStatus) => {
    if (USE_MOCK) {
      await delay(600);
      let bookings = JSON.parse(localStorage.getItem('rydex_bookings') || '[]');
      bookings = bookings.map(b => b.bookingId === bookingId ? { ...b, bookingStatus } : b);
      localStorage.setItem('rydex_bookings', JSON.stringify(bookings));
      return { success: true };
    }
  },

  verifyPayment: async (bookingId, isVerified) => {
    if (USE_MOCK) {
      await delay(800);
      let bookings = JSON.parse(localStorage.getItem('rydex_bookings') || '[]');
      bookings = bookings.map(b => b.bookingId === bookingId ? { 
        ...b, 
        paymentStatus: isVerified ? 'Verified' : 'Rejected',
        bookingStatus: isVerified ? 'Confirmed' : 'Cancelled'
      } : b);
      localStorage.setItem('rydex_bookings', JSON.stringify(bookings));
      return { success: true };
    }
  },
};
