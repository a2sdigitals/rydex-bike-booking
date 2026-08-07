import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Clock, Users } from 'lucide-react';

export const About = () => {
  return (
    <div className="bg-background-light min-h-screen">
      {/* Hero Section */}
      <div className="bg-background-surface py-20 border-b border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          >
            About <span className="text-primary">Rydex</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Redefining two-wheeler rentals with premium service, transparent pricing, and absolute freedom.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              At Rydex, we believe that exploring your city should be seamless and joyful. We started with a simple idea: to provide high-quality, well-maintained bikes to everyone without the hassle of traditional rental agencies.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Whether you need a reliable scooter for your daily commute or a powerful motorcycle for a weekend getaway, Rydex is your trusted partner on the road.
            </p>
          </div>
          <div className="bg-gray-100 rounded-3xl h-80 overflow-hidden shadow-inner">
             <img 
              src="https://images.unsplash.com/photo-1558981420-c532902e58b4?auto=format&fit=crop&q=80&w=800" 
              alt="People riding bikes" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Rydex?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: "Quality Assured", desc: "Every bike undergoes strict maintenance checks." },
            { icon: Clock, title: "Quick Booking", desc: "Rent your ride in under 2 minutes." },
            { icon: MapPin, title: "Flexible Plans", desc: "Rent for a day, a week, or a month." },
            { icon: Users, title: "Customer First", desc: "24/7 support whenever you need us." },
          ].map((feature, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-orange-50 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
