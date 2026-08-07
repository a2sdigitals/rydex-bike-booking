import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { api } from '../services/api';
import toast from 'react-hot-toast';

export const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await api.createMessage(formData);
      toast.success('Your message has been sent successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background-black min-h-screen">
      <div className="glass-panel py-20 border-b border-white/10 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-heading font-black text-white mb-6 tracking-tight"
          >
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 font-light max-w-2xl mx-auto"
          >
            Have a question or need assistance? We're here to help you get on the road.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-4xl font-heading font-bold text-white mb-8 tracking-wide">Contact Information</h2>
            
            <div className="flex items-start gap-5 glass-panel p-6 rounded-2xl border border-white/10 hover:bg-white/5 transition-colors">
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl shadow-[0_0_15px_rgba(255,51,102,0.1)] flex items-center justify-center text-primary flex-shrink-0">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-lg">Email Us</h3>
                <p className="text-gray-400 font-light mt-1 hover:text-primary transition-colors cursor-pointer">hello@rydex.com</p>
                <p className="text-gray-400 font-light hover:text-primary transition-colors cursor-pointer">support@rydex.com</p>
              </div>
            </div>

            <div className="flex items-start gap-5 glass-panel p-6 rounded-2xl border border-white/10 hover:bg-white/5 transition-colors">
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl shadow-[0_0_15px_rgba(255,51,102,0.1)] flex items-center justify-center text-primary flex-shrink-0">
                <Phone className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-lg">Call Us</h3>
                <p className="text-gray-400 font-light mt-1 hover:text-primary transition-colors cursor-pointer">+91 98765 43210</p>
                <p className="text-gray-500 font-light text-sm mt-1">Mon-Sun, 8am to 9pm</p>
              </div>
            </div>

            <div className="flex items-start gap-5 glass-panel p-6 rounded-2xl border border-white/10 hover:bg-white/5 transition-colors">
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl shadow-[0_0_15px_rgba(255,51,102,0.1)] flex items-center justify-center text-primary flex-shrink-0">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-lg">Visit Us</h3>
                <p className="text-gray-400 font-light mt-1 leading-relaxed">
                  123, Rydex Hub,<br />
                  Andheri East, Mumbai,<br />
                  Maharashtra 400069, India
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-panel rounded-3xl p-8 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <h2 className="text-3xl font-heading font-bold text-white mb-8 tracking-wide">Send a Message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input 
                  label="First Name" 
                  placeholder="John" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <Input 
                  label="Last Name" 
                  placeholder="Doe" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <Input 
                label="Email Address" 
                type="email" 
                placeholder="john@example.com" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input 
                label="Subject" 
                placeholder="How can we help?" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <textarea 
                  rows="4" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-white/10 focus:border-primary focus:ring-primary bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full gap-2 mt-2 rounded-xl shadow-[0_0_20px_rgba(255,51,102,0.4)]">
                <Send className="w-5 h-5" /> {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
