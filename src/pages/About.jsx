import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Clock, Users } from 'lucide-react';

export const About = () => {
  return (
    <div className="bg-background-black min-h-screen">
      {/* Hero Section */}
      <div className="glass-panel py-20 border-b border-white/10 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-heading font-black text-white mb-6 tracking-tight"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Rydex</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 font-light max-w-2xl mx-auto"
          >
            Redefining two-wheeler rentals with premium service, transparent pricing, and absolute freedom.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl font-heading font-bold text-white mb-6 tracking-wide">Our Mission</h2>
            <p className="text-gray-400 font-light text-lg leading-relaxed mb-4">
              At Rydex, we believe that exploring your city should be seamless and joyful. We started with a simple idea: to provide high-quality, well-maintained bikes to everyone without the hassle of traditional rental agencies.
            </p>
            <p className="text-gray-400 font-light text-lg leading-relaxed">
              Whether you need a reliable scooter for your daily commute or a powerful motorcycle for a weekend getaway, Rydex is your trusted partner on the road.
            </p>
          </div>
          <div className="glass-panel p-2 rounded-3xl h-80 overflow-hidden relative group border border-white/10 shadow-[0_0_30px_rgba(255,51,102,0.1)]">
             <img 
              src="https://images.unsplash.com/photo-1558981420-c532902e58b4?auto=format&fit=crop&q=80&w=800" 
              alt="People riding bikes" 
              className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        <h2 className="text-4xl font-heading font-bold text-center text-white mb-12 tracking-wide">Why Rydex?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: "Quality Assured", desc: "Every bike undergoes strict maintenance checks." },
            { icon: Clock, title: "Quick Booking", desc: "Rent your ride in under 2 minutes." },
            { icon: MapPin, title: "Flexible Plans", desc: "Rent for a day, a week, or a month." },
            { icon: Users, title: "Customer First", desc: "24/7 support whenever you need us." },
          ].map((feature, i) => (
            <motion.div 
              whileHover={{ y: -5 }}
              key={i} 
              className="glass-panel p-6 rounded-2xl border border-white/10 text-center hover:bg-white/5 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(255,51,102,0.15)] group"
            >
              <div className="w-14 h-14 bg-white/5 border border-white/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors shadow-[0_0_15px_rgba(255,51,102,0.1)]">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm font-light text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
