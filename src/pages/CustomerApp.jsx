import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Scissors, Sparkles, Heart, Clock, Star, 
  MapPin, Phone, Globe, MessageCircle, 
  ArrowRight, Check, Calendar, User, PhoneCall,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const CustomerApp = () => {
  const { services, bookings, addBooking } = useApp();
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
    <div className="bg-white dark:bg-gray-950">
      {/* Hero Section - Magazine Style */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-gray-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="max-w-2xl text-white">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-white" />
                <span className="text-xs font-black uppercase tracking-[0.5em]">The Ultimate Experience</span>
              </div>
              <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                REDEFINE <br />
                <span className="text-primary italic font-serif">Luxury.</span>
              </h1>
              <p className="text-xl text-white/80 font-medium mb-12 max-w-lg leading-relaxed">
                Step into a world of curated beauty. Our elite stylists and premium treatments are designed to elevate your personal style to its highest potential.
              </p>
              <div className="flex gap-6">
                <a href="#booking" className="btn bg-white text-gray-900 px-10 py-5 text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                  Book Appointment
                </a>
                <a href="#services" className="btn bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all">
                  View Catalog
                </a>
              </div>
            </motion.div>
          </div>
        </div>

      </section>

      {/* Services Catalog */}
      <section id="services" className="py-32 px-6 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <div className="max-w-xl">
              <p className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-4">The Selection</p>
              <h2 className="text-6xl font-black tracking-tighter leading-none mb-6">CURATED <br />TREATMENTS.</h2>
              <p className="text-lg text-text-muted font-medium">Every service is a masterpiece of technique and care, using only the finest products in the industry.</p>
            </div>
            <div className="hidden lg:block w-32 h-32 rounded-full border border-primary/20 flex items-center justify-center animate-spin-slow">
              <Sparkles className="text-primary" size={40} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, i) => (
              <motion.div 
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="card p-0 overflow-hidden bg-white dark:bg-gray-900 border-none shadow-xl group-hover:shadow-2xl transition-all duration-500 rounded-[2rem]">
                  <div className="relative h-64">
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                      <div>
                        <h3 className="text-2xl font-black text-white tracking-tight">{service.name}</h3>
                        <p className="text-white/60 text-sm font-bold uppercase tracking-widest">{service.duration}</p>
                      </div>
                      <span className="text-xl font-black text-primary">₹{service.price}</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="text-text-muted font-medium mb-8 line-clamp-2">Experience the peak of professional {service.name.toLowerCase()} tailored specifically to your needs.</p>
                    <button 
                      onClick={() => {
                        setFormData({...formData, service: service.name});
                        window.location.hash = 'booking';
                      }}
                      className="w-full flex items-center justify-between group/btn text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white"
                    >
                      Reservations <ArrowRight className="group-hover/btn:translate-x-2 transition-transform duration-300 text-primary" size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Experience */}
      <section id="booking" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-4">Reservations</p>
              <h2 className="text-6xl font-black tracking-tighter mb-8 leading-none">SECURE YOUR <br />SESSION.</h2>
              <p className="text-lg text-text-muted font-medium mb-12 max-w-md">Our private studio sessions are highly sought after. Book in advance to guarantee your preferred time slot with our master stylists.</p>
              
              <div className="space-y-8">
                {[
                  { icon: <MapPin />, title: "Elite Location", text: "Luxury Plaza, South Delhi" },
                  { icon: <PhoneCall />, title: "Concierge", text: "+91 98765 43210" },
                  { icon: <Clock />, title: "Hours", text: "10:00 AM - 08:00 PM" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-center">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-primary shadow-inner">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-sm uppercase tracking-widest">{item.title}</h4>
                      <p className="text-text-muted font-medium">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-2xl" />
              <div className="card relative p-10 bg-white dark:bg-gray-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border-gray-100 dark:border-gray-800 rounded-[2.5rem]">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Name</label>
                      <input type="text" placeholder="Your Name" className="py-4 px-6 font-bold" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Phone</label>
                      <input type="tel" placeholder="Mobile Number" className="py-4 px-6 font-bold" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Preferred Service</label>
                    <select className="py-4 px-6 font-bold text-sm" value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} required>
                      <option value="">Choose Service</option>
                      {services.map(s => <option key={s.name} value={s.name}>{s.name} - ₹{s.price}</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Date</label>
                      <input type="date" className="py-4 px-6 font-bold" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Time</label>
                      <input type="time" className="py-4 px-6 font-bold" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} required />
                    </div>
                  </div>

                  <button type="submit" className="w-full btn btn-primary py-5 text-xs font-black uppercase tracking-[0.3em] shadow-xl shadow-primary/30 rounded-2xl group">
                    Request Reservation <ChevronRight className="group-hover:translate-x-2 transition-transform" size={18} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20">S</div>
            <h2 className="text-xl font-black tracking-tighter">SALON<span className="text-primary">PRO</span></h2>
          </div>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-text-muted">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Careers</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <p className="text-xs font-medium text-text-muted">© 2024 SalonPro Business Elite. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CustomerApp;
