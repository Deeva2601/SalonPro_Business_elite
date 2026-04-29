import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrendingUp, Users, Calendar, CheckCircle, Clock, XCircle, 
  IndianRupee, ChevronRight, Search, Filter, Plus, Bell 
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const { bookings, updateBookingStatus, addOfflinePayment } = useApp();
  const [dataRange, setDataRange] = useState('Daily');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [offlineForm, setOfflineForm] = useState({ name: '', service: '' });

  // Range filtering logic
  const getFilteredByRange = (data) => {
    const today = new Date();
    return data.filter(b => {
      const bDate = new Date(b.date);
      if (dataRange === 'Daily') return b.date === today.toISOString().split('T')[0];
      if (dataRange === 'Weekly') {
        const lastWeek = new Date();
        lastWeek.setDate(today.getDate() - 7);
        return bDate >= lastWeek;
      }
      if (dataRange === 'Monthly') {
        return bDate.getMonth() === today.getMonth() && bDate.getFullYear() === today.getFullYear();
      }
      if (dataRange === 'Annual') {
        return bDate.getFullYear() === today.getFullYear();
      }
      return true;
    });
  };

  const rangeBookings = getFilteredByRange(bookings);

  // Stats calculation based on range
  const totalRevenue = rangeBookings
    .filter(b => b.status === 'Completed')
    .reduce((acc, curr) => acc + curr.price, 0);
  
  const pendingCount = rangeBookings.filter(b => b.status === 'Pending').length;
  const todayCount = rangeBookings.length;
  const completedCount = rangeBookings.filter(b => b.status === 'Completed').length;

  const stats = [
    { label: `${dataRange} Bookings`, value: todayCount, icon: <Calendar />, color: "bg-blue-500" },
    { label: `${dataRange} Revenue`, value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: <IndianRupee />, color: "bg-green-500" },
    { label: "Pending", value: pendingCount, icon: <Clock />, color: "bg-amber-500" },
    { label: "Completed", value: completedCount, icon: <CheckCircle />, color: "bg-purple-500" },
  ];

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.phone.includes(search);
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Accepted': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Completed': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      case 'Cancelled': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Business Dashboard</h1>
          <p className="text-text-muted">Welcome back, Admin! Here's what's happening today.</p>
        </div>
        <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          {['Daily', 'Weekly', 'Monthly', 'Annual'].map(range => (
            <button 
              key={range}
              onClick={() => setDataRange(range)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${dataRange === range ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-text-muted'}`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card flex items-center gap-6"
          >
            <div className={`w-14 h-14 rounded-2xl ${stat.color} text-white flex items-center justify-center shadow-lg`}>
              {React.cloneElement(stat.icon, { size: 28 })}
            </div>
            <div>
              <p className="text-sm text-text-muted font-medium mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bookings List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <h2 className="text-xl font-bold">Recent Appointments</h2>
              <div className="flex gap-4 w-full md:w-auto">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input 
                    className="pl-10 pr-4 py-2 text-sm w-full"
                    placeholder="Search customer..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <select 
                  className="py-2 text-sm w-auto"
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="pb-4 font-bold text-sm">Customer</th>
                    <th className="pb-4 font-bold text-sm">Service</th>
                    <th className="pb-4 font-bold text-sm">Date/Time</th>
                    <th className="pb-4 font-bold text-sm">Status</th>
                    <th className="pb-4 font-bold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-card-border">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                      <td className="py-4">
                        <p className="font-bold">{b.name}</p>
                        <p className="text-xs text-text-muted">{b.phone}</p>
                      </td>
                      <td className="py-4">
                        <p className="text-sm">{b.service}</p>
                        <p className="text-xs font-bold text-primary">₹{b.price}</p>
                      </td>
                      <td className="py-4">
                        <p className="text-sm">{b.date}</p>
                        <p className="text-xs text-text-muted">{b.time}</p>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(b.status)}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          {b.status === 'Pending' && (
                            <button onClick={() => updateBookingStatus(b.id, 'Accepted')} className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all" title="Accept"><CheckCircle size={16} /></button>
                          )}
                          {(b.status === 'Pending' || b.status === 'Accepted') && (
                            <>
                              <button onClick={() => updateBookingStatus(b.id, 'Completed')} className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all" title="Complete"><TrendingUp size={16} /></button>
                              <button onClick={() => updateBookingStatus(b.id, 'Cancelled')} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all" title="Cancel"><XCircle size={16} /></button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredBookings.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-12 text-center text-text-muted">No bookings found matching filters.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar / Offline Payment */}
        <div className="space-y-6">
          <div className="card bg-gradient-to-br from-primary to-secondary text-white border-none">
            <h3 className="text-xl font-bold mb-4">Offline Payment</h3>
            <p className="text-white/80 text-sm mb-6">Record a cash payment for a service completed without a prior booking.</p>
            <form className="space-y-4" onSubmit={(e) => { 
              e.preventDefault(); 
              addOfflinePayment(offlineForm);
              setOfflineForm({ name: '', service: '' });
              alert('Offline payment recorded! Revenue updated.'); 
            }}>
              <input 
                className="bg-white/10 border-white/20 text-white placeholder-white/50" 
                placeholder="Customer Name" 
                required 
                value={offlineForm.name}
                onChange={e => setOfflineForm({...offlineForm, name: e.target.value})}
              />
              <select 
                className="bg-white/10 border-white/20 text-white [&>option]:text-black" 
                required
                value={offlineForm.service}
                onChange={e => setOfflineForm({...offlineForm, service: e.target.value})}
              >
                <option value="">Select Service</option>
                <option value="Hair Cut">Hair Cut - ₹299</option>
                <option value="Hair Spa">Hair Spa - ₹799</option>
                <option value="Bridal Makeup">Bridal Makeup - ₹7999</option>
                <option value="Party Makeup">Party Makeup - ₹1999</option>
                <option value="Facial">Facial - ₹999</option>
                <option value="Manicure/Pedicure">Manicure/Pedicure - ₹699</option>
              </select>
              <button className="w-full bg-white text-primary btn hover:scale-105">Add Payment</button>
            </form>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold mb-4">Insights</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <span className="text-sm font-medium">Most Booked</span>
                <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-md">Bridal Makeup</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <span className="text-sm font-medium">Retention Rate</span>
                <span className="text-xs font-bold bg-green-100 text-green-600 px-2 py-1 rounded-md">+12%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
