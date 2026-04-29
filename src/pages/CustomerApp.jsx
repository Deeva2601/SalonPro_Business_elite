import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Clock, MapPin, Phone, MessageCircle, Star, Scissors, Sparkles, Heart, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const CustomerApp = () => {
  const { addBooking } = useApp();
  const [filter, setFilter] = useState('All');
  const [form, setForm] = useState({ name: '', phone: '', service: '', date: '', time: '', note: '' });
  const [isBooked, setIsBooked] = useState(false);

  const services = [
    { name: 'Hair Cut', price: 299, category: 'Hair', icon: <Scissors size={20} /> },
    { name: 'Hair Spa', price: 799, category: 'Hair', icon: <Sparkles size={20} /> },
    { name: 'Bridal Makeup', price: 7999, category: 'Bridal', icon: <Heart size={20} /> },
    { name: 'Party Makeup', price: 1999, category: 'Makeup', icon: <Zap size={20} /> },
    { name: 'Facial', price: 999, category: 'Skincare', icon: <Star size={20} /> },
    { name: 'Manicure/Pedicure', price: 699, category: 'Skincare', icon: <Sparkles size={20} /> },
  ];

  const filteredServices = filter === 'All' ? services : services.filter(s => s.category === filter);

  const handleSubmit = (e) => {
    e.preventDefault();
    addBooking(form);
    setIsBooked(true);
    setTimeout(() => setIsBooked(false), 3000);
    setForm({ name: '', phone: '', service: '', date: '', time: '', note: '' });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="hero-gradient" />
      
      {/* Hero Section */}
      <section className="text-center mb-24 fade-in">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6 inline-block">
            Experience Excellence
          </span>
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Reveal Your <span className="text-gradient">Natural Beauty</span>
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto mb-10">
            Premium salon services tailored to your unique style. Book your transformation today with our expert stylists.
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })} className="btn btn-primary text-lg px-8 py-4">Book Appointment</button>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="btn bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-4">
              <MessageCircle size={24} /> WhatsApp Us
            </a>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="mb-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Our Premium Services</h2>
            <p className="text-text-muted">Choose from our wide range of professional beauty treatments.</p>
          </div>
          <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl overflow-x-auto">
            {['All', 'Hair', 'Makeup', 'Skincare', 'Bridal'].map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${filter === cat ? 'bg-white dark:bg-gray-700 shadow-md text-primary' : 'text-text-muted hover:text-text'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((s, i) => (
            <motion.div 
              key={s.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="card group hover:border-primary/30"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{s.name}</h3>
              <p className="text-3xl font-bold text-gradient mb-6">₹{s.price.toLocaleString('en-IN')}</p>
              <button 
                onClick={() => {
                  setForm({...form, service: s.name});
                  document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full btn border border-primary/20 hover:bg-primary hover:text-white"
              >
                Book This
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Reserve Your <span className="text-primary">Spot</span></h2>
            <p className="text-lg text-text-muted mb-12">
              Fill out the form to book your appointment. We'll confirm your slot within 15 minutes.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent"><MapPin /></div>
                <div>
                  <p className="font-bold">Visit Us</p>
                  <p className="text-text-muted">123 Beauty Lane, Mumbai, India</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary"><Clock /></div>
                <div>
                  <p className="font-bold">Opening Hours</p>
                  <p className="text-text-muted">Mon-Sun: 9:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card glass p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2 ml-1">Your Name</label>
                  <input required placeholder="Rahul Kumar" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 ml-1">Phone Number</label>
                  <input required placeholder="98765 43210" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 ml-1">Select Service</label>
                <select required value={form.service} onChange={e => setForm({...form, service: e.target.value})}>
                  <option value="">Choose a service...</option>
                  {services.map(s => <option key={s.name} value={s.name}>{s.name} - ₹{s.price}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2 ml-1">Date</label>
                  <input type="date" required value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 ml-1">Time</label>
                  <input type="time" required value={form.time} onChange={e => setForm({...form, time: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 ml-1">Special Note (Optional)</label>
                <textarea rows="3" placeholder="Anything we should know?" value={form.note} onChange={e => setForm({...form, note: e.target.value})} />
              </div>
              <button type="submit" className={`w-full btn btn-primary py-4 text-lg ${isBooked ? 'bg-green-500' : ''}`}>
                {isBooked ? 'Booking Confirmed! ✅' : 'Confirm Appointment'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Sneha R.", text: "Best haircut I've ever had! The staff is so professional.", rating: 5 },
            { name: "Amit K.", text: "Highly recommend the facial treatments. Very relaxing.", rating: 5 },
            { name: "Megha S.", text: "The bridal makeup was flawless. Thank you SalonPro!", rating: 5 }
          ].map((t, i) => (
            <div key={i} className="card bg-white/50 dark:bg-gray-800/50">
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} className="fill-accent text-accent" />)}
              </div>
              <p className="italic text-text-muted mb-4">"{t.text}"</p>
              <p className="font-bold">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CustomerApp;
