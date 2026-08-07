import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, CreditCard, ChevronRight } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { BikeCard } from '../components/bikes/BikeCard';
import { api } from '../services/api';

export const Home = () => {
  const [featuredBikes, setFeaturedBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const bikes = await api.getBikes();
        setFeaturedBikes(bikes.slice(0, 3)); // Show top 3
      } catch (error) {
        console.error("Failed to load bikes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBikes();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/bikes');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background-surface pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white space-y-8"
            >
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                Your Ride. <br />
                <span className="text-primary">Your Freedom.</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
                Rent your favourite bike in minutes and make every journey unforgettable. Experience the thrill of the open road with Rydex.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/bikes">
                  <Button size="lg" className="w-full sm:w-auto">Explore Bikes</Button>
                </Link>
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">How It Works</Button>
              </div>
              <div className="flex items-center gap-6 pt-8 text-sm font-medium text-gray-400">
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Quick Booking</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Flexible Rentals</div>
                <div className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-primary" /> Easy UPI Payments</div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-orange-400/10 blur-3xl rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1000" 
                alt="Premium Motorcycle" 
                className="relative z-10 w-full object-cover rounded-2xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Search */}
      <section className="relative z-20 -mt-16 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100"
        >
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <Input label="Pickup Date" type="date" required />
            <Input label="Pickup Time" type="time" required />
            <Input label="Return Date" type="date" required />
            <Button type="submit" size="lg" className="w-full h-[46px]">Find Available Bikes</Button>
          </form>
        </motion.div>
      </section>

      {/* Featured Bikes */}
      <section className="py-24 bg-background-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Rides</h2>
              <p className="text-gray-600">Choose from our most rented premium bikes.</p>
            </div>
            <Link to="/bikes" className="hidden sm:flex items-center gap-1 text-primary font-semibold hover:text-primary-dark transition-colors">
              View All <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl h-[400px] animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBikes.map(bike => (
                <BikeCard key={bike.bikeId} bike={bike} />
              ))}
            </div>
          )}
          
          <div className="mt-8 sm:hidden text-center">
            <Link to="/bikes">
              <Button variant="outline" className="w-full">View All Bikes</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Rydex Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Rent your dream ride in four simple steps without any hassle.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Choose Your Bike', desc: 'Browse available bikes and select your favourite ride.' },
              { num: '02', title: 'Enter Your Details', desc: 'Provide your rental and driving licence information.' },
              { num: '03', title: 'Pay Securely', desc: 'Scan the QR or use your preferred UPI application.' },
              { num: '04', title: 'Ride Away', desc: 'After confirmation, collect your bike and enjoy the ride.' },
            ].map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center p-6 group">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-primary font-extrabold text-2xl mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                {index !== 3 && (
                  <div className="hidden md:block absolute top-14 left-1/2 w-full h-0.5 bg-gradient-to-r from-orange-100 to-transparent -z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
