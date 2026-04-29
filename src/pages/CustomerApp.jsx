import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Scissors, Sparkles, Heart, Clock, Star, 
  MapPin, Globe, MessageCircle, 
  ArrowRight, Check, Calendar, User, PhoneCall,
  ChevronRight, ArrowDown
} from 'lucide-react';
import { motion } from 'framer-motion';

const CustomerApp = () => {
  const { services, addBooking } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceDetails = services.find(s => s.name === formData.service);
    addBooking({
      ...formData,
      price: serviceDetails?.price || 0,
      status: 'Pending'
    });
    setFormData({ name: '', phone: '', service: '', date: '', time: '' });
    alert('Appointment requested! We will confirm shortly.');
  };

  return (
    <div className="bg-white dark:bg-gray-950 font-sans selection:bg-primary/20">
      {/* Elegant Hero - Minimalist Studio Style */}
      <section className="relative min-h-[85vh] flex flex-col justify-center px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-10">
                <span className="w-8 h-[2px] bg-primary rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">Luxury Studio Edition</span>
              </div>
              <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-10 text-gray-950 dark:text-white">
                THE ART <br />
                <span className="italic font-serif font-light text-primary">of</span> BEAUTY.
              </h1>
              <p className="text-xl text-text-muted font-medium mb-12 max-w-lg leading-relaxed">
                Experience meticulous craftsmanship in every detail. Our studio is dedicated to those who seek the extraordinary in beauty and wellness.
              </p>
              <div className="flex flex-wrap gap-8">
                <a href="#booking" className="btn btn-primary px-10 py-5 text-xs font-black uppercase tracking-widest shadow-2xl shadow-primary/30 rounded-2xl">
                  Book Reservation
                </a>
                <a href="#services" className="group flex items-center gap-4 text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white hover:text-primary transition-colors">
                  Explore Catalog <ArrowDown size={18} className="animate-bounce" />
                </a>
              </div>
            </motion.div>

            <div className="hidden lg:block relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative aspect-square max-w-md ml-auto"
              >
                <div className="absolute inset-0 border-[20px] border-gray-50 dark:border-gray-900 rounded-[4rem] -rotate-6" />
                <div className="absolute inset-0 bg-primary/5 rounded-[4rem] rotate-3 blur-3xl" />
                <div className="relative w-full h-full bg-white dark:bg-gray-900 rounded-[4rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-gray-800 flex items-center justify-center overflow-hidden">
                   <div className="text-center p-12">
                      <Sparkles size={64} className="text-primary mx-auto mb-8 animate-pulse" />
                      <h3 className="text-2xl font-black tracking-tighter mb-4 italic">Unparalleled <br />Quality.</h3>
                      <p className="text-sm text-text-muted font-medium">Every session is curated to perfection by our master artists.</p>
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Modern & Clean */}
      <section id="services" className="py-40 px-6 bg-gray-50/50 dark:bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12 border-b border-gray-200 dark:border-gray-800 pb-12">
            <div>
              <p className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-4">Service Menu</p>
              <h2 className="text-5xl font-black tracking-tighter">THE CATALOGUE.</h2>
            </div>
            <div className="text-right hidden md:block">
               <p className="text-sm text-text-muted font-medium">Showing 06 Premium Treatments</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {services.map((service, i) => (
              <motion.div 
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="relative mb-8">
                   <div className="absolute -top-6 -left-6 text-6xl font-black text-gray-100 dark:text-gray-800 pointer-events-none group-hover:text-primary/10 transition-colors">0{i+1}</div>
                   <div className="w-20 h-20 bg-white dark:bg-gray-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-gray-800 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                      {service.name.includes('Hair') ? <Scissors size={32} /> : <Sparkles size={32} />}
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="flex justify-between items-baseline">
                      <h3 className="text-2xl font-black tracking-tighter group-hover:text-primary transition-colors">{service.name}</h3>
                      <span className="text-lg font-black text-gray-950 dark:text-white">₹{service.price}</span>
                   </div>
                   <p className="text-sm text-text-muted font-medium leading-relaxed">Experience our signature {service.name.toLowerCase()}, delivered with precision and high-end products.</p>
                   <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800 mt-6">
                      <Clock size={14} className="text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{service.duration}</span>
                   </div>
                   <button 
                      onClick={() => {
                        setFormData({...formData, service: service.name});
                        window.location.hash = 'booking';
                      }}
                      className="w-full mt-8 py-4 text-[10px] font-black uppercase tracking-widest border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-950 hover:text-white dark:hover:bg-white dark:hover:text-gray-950 transition-all"
                   >
                      Secure Booking
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Booking Form */}
      <section id="booking" className="py-40 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-6xl font-black tracking-tighter mb-6">RESERVE.</h2>
            <p className="text-lg text-text-muted font-medium max-w-lg mx-auto">Enter your details below to request a session. Our concierge will contact you for final confirmation.</p>
          </div>

          <div className="card bg-white dark:bg-gray-900 p-12 border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] rounded-[3rem]">
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-2">Your Name</label>
                  <input type="text" placeholder="Full Name" className="py-5 bg-gray-50 dark:bg-gray-800/50 border-none rounded-2xl px-8 font-bold" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-2">Phone Number</label>
                  <input type="tel" placeholder="+91" className="py-5 bg-gray-50 dark:bg-gray-800/50 border-none rounded-2xl px-8 font-bold" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-2">Preferred Treatment</label>
                <select className="py-5 bg-gray-50 dark:bg-gray-800/50 border-none rounded-2xl px-8 font-bold text-sm" value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} required>
                  <option value="">Select a service</option>
                  {services.map(s => <option key={s.name} value={s.name}>{s.name} — ₹{s.price}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-2">Appointment Date</label>
                  <input type="date" className="py-5 bg-gray-50 dark:bg-gray-800/50 border-none rounded-2xl px-8 font-bold" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-2">Preferred Time</label>
                  <input type="time" className="py-5 bg-gray-50 dark:bg-gray-800/50 border-none rounded-2xl px-8 font-bold" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} required />
                </div>
              </div>

              <button type="submit" className="w-full bg-gray-950 dark:bg-white text-white dark:text-gray-950 py-6 text-xs font-black uppercase tracking-[0.4em] rounded-[2rem] hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-gray-400/20">
                Confirm Reservation Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-24 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-10 h-10 bg-gray-950 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-gray-950 font-black text-xl">S</div>
            <h2 className="text-xl font-black tracking-tighter">SALON<span className="text-primary">PRO</span></h2>
          </div>
          <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-widest text-text-muted mb-16">
             <a href="#" className="hover:text-primary transition-colors">Instagram</a>
             <a href="#" className="hover:text-primary transition-colors">Facebook</a>
             <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
             <a href="#" className="hover:text-primary transition-colors">WhatsApp</a>
          </div>
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">© 2024 SalonPro Business Elite. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CustomerApp;
