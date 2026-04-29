import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrendingUp, Users, Calendar, CheckCircle, Clock, XCircle, 
  IndianRupee, ChevronRight, Search, Filter, Plus, Bell,
  LayoutDashboard, Shield, LogOut, Settings, CreditCard,
  ChevronDown, ArrowUpRight, BarChart3, PieChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const { bookings, services, updateBookingStatus, addOfflinePayment, changePassword, adminPassword, logout } = useApp();
  const [activeTab, setActiveTab] = useState('Overview');
  const [dataRange, setDataRange] = useState('Daily');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [offlineForm, setOfflineForm] = useState({ name: '', service: '' });
  
  const [passwordState, setPasswordState] = useState({ current: '', new: '', confirm: '' });
  const [passwordMsg, setPasswordMsg] = useState({ text: '', type: '' });

  const getFilteredByRange = (data) => {
    const today = new Date().toLocaleDateString('en-CA');
    return data.filter(b => {
      if (dataRange === 'Daily') return b.date === today;
      const bDate = new Date(b.date);
      const now = new Date();
      if (dataRange === 'Weekly') {
        const lastWeek = new Date();
        lastWeek.setDate(now.getDate() - 7);
        return bDate >= lastWeek;
      }
      if (dataRange === 'Monthly') {
        return bDate.getMonth() === now.getMonth() && bDate.getFullYear() === now.getFullYear();
      }
      return true;
    });
  };

  const rangeBookings = getFilteredByRange(bookings);
  const completedBookings = rangeBookings.filter(b => b.status === 'Completed');
  const totalRevenue = completedBookings.reduce((acc, curr) => acc + curr.price, 0);
  const pendingCount = rangeBookings.filter(b => b.status === 'Pending').length;
  const totalCount = rangeBookings.length;

  const stats = [
    { label: "Revenue", value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: <IndianRupee size={20} />, trend: "+12%" },
    { label: "Appointments", value: totalCount, icon: <Calendar size={20} />, trend: "+5.4%" },
    { label: "Pending", value: pendingCount, icon: <Clock size={20} />, trend: "-2.1%" },
    { label: "Conversion", value: "84%", icon: <TrendingUp size={20} />, trend: "+1.2%" },
  ];

  const filteredBookings = rangeBookings.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.phone.includes(search);
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOfflineSubmit = (e) => {
    e.preventDefault();
    if (!offlineForm.name || !offlineForm.service) return;
    addOfflinePayment(offlineForm);
    setOfflineForm({ name: '', service: '' });
    alert('Payment recorded successfully!');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordState.current !== adminPassword) {
      setPasswordMsg({ text: 'Current password incorrect', type: 'error' });
      return;
    }
    if (passwordState.new !== passwordState.confirm) {
      setPasswordMsg({ text: 'Passwords do not match', type: 'error' });
      return;
    }
    changePassword(passwordState.new);
    setPasswordMsg({ text: 'Password updated successfully', type: 'success' });
    setPasswordState({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="flex min-h-[92vh] bg-white dark:bg-gray-950 font-sans">
      {/* Professional Sidebar */}
      <div className="w-72 border-r border-gray-100 dark:border-gray-800 flex flex-col p-8 bg-white dark:bg-gray-950">
        <div className="space-y-12">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted mb-8">Management</p>
            <nav className="space-y-4">
              {[
                { name: 'Overview', icon: <LayoutDashboard size={18} /> },
                { name: 'Appointments', icon: <Calendar size={18} /> },
                { name: 'Analytics', icon: <BarChart3 size={18} /> },
                { name: 'Services', icon: <Plus size={18} /> },
              ].map(item => (
                <button 
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === item.name ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-text-muted hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-950 dark:hover:text-white'}`}
                >
                  {item.icon} {item.name}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted mb-8">System</p>
            <nav className="space-y-4">
              <button 
                onClick={() => setActiveTab('Security')}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'Security' ? 'bg-gray-950 dark:bg-white text-white dark:text-gray-950 shadow-xl' : 'text-text-muted hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-950 dark:hover:text-white'}`}
              >
                <Shield size={18} /> Security
              </button>
              <button 
                onClick={logout}
                className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
              >
                <LogOut size={18} /> Log Out
              </button>
            </nav>
          </div>
        </div>

        <div className="mt-auto pt-12 border-t border-gray-100 dark:border-gray-800">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black">A</div>
              <div>
                 <p className="text-xs font-black tracking-tight">Admin Portal</p>
                 <p className="text-[10px] font-medium text-text-muted">Business Elite v2.0</p>
              </div>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-12 bg-gray-50/30 dark:bg-gray-950/30">
        {activeTab !== 'Security' ? (
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Header */}
            <div className="flex justify-between items-end pb-8 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h1 className="text-4xl font-black tracking-tighter mb-2">{activeTab}</h1>
                <p className="text-sm text-text-muted font-medium">Real-time performance monitoring and management.</p>
              </div>
              <div className="flex bg-white dark:bg-gray-900 p-1.5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                {['Daily', 'Weekly', 'Monthly'].map(range => (
                  <button 
                    key={range}
                    onClick={() => setDataRange(range)}
                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${dataRange === range ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-muted hover:text-gray-950 dark:hover:text-white'}`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-50 dark:border-gray-800 group hover:border-primary/20 transition-all"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      {stat.icon}
                    </div>
                    <span className={`text-[10px] font-black tracking-widest ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-amber-500'}`}>{stat.trend}</span>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-2">{stat.label}</p>
                  <p className="text-3xl font-black tracking-tighter">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Main Data Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
              <div className="xl:col-span-2 space-y-8">
                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-[0_20px_50px_rgb(0,0,0,0.03)] border border-gray-50 dark:border-gray-800 overflow-hidden">
                  <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-black tracking-tighter">Recent Appointments</h2>
                    <div className="flex gap-4">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input className="pl-12 pr-4 py-2 bg-gray-50 dark:bg-gray-800/50 border-none rounded-xl text-xs font-bold" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
                      </div>
                      <select className="py-2 px-4 bg-gray-50 dark:bg-gray-800/50 border-none rounded-xl text-[10px] font-black uppercase tracking-widest" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                        <option value="All">Filter</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50/30 dark:bg-gray-800/10">
                          <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted text-left">Customer</th>
                          <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted text-left">Treatment</th>
                          <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted text-left">Status</th>
                          <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                        {filteredBookings.map((b) => (
                          <tr key={b.id} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all">
                            <td className="px-8 py-6">
                              <p className="font-bold text-sm">{b.name}</p>
                              <p className="text-[10px] text-text-muted font-bold tracking-widest">{b.phone}</p>
                            </td>
                            <td className="px-8 py-6">
                              <p className="font-bold text-sm">{b.service}</p>
                              <p className="text-[10px] text-primary font-bold tracking-widest">₹{b.price}</p>
                            </td>
                            <td className="px-8 py-6">
                               <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                 b.status === 'Completed' ? 'bg-green-100 text-green-600' : 
                                 b.status === 'Accepted' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                               }`}>
                                 {b.status}
                               </span>
                            </td>
                            <td className="px-8 py-6 text-right">
                               <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                  <button onClick={() => updateBookingStatus(b.id, 'Completed')} className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all"><CheckCircle size={16} /></button>
                                  <button onClick={() => updateBookingStatus(b.id, 'Cancelled')} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"><XCircle size={16} /></button>
                               </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Quick Actions Column */}
              <div className="space-y-12">
                <div className="bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] shadow-sm border border-gray-50 dark:border-gray-800">
                  <h3 className="text-xl font-black tracking-tighter mb-8">Record Payment</h3>
                  <form onSubmit={handleOfflineSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Customer Name</label>
                      <input className="py-4 px-6 bg-gray-50 dark:bg-gray-800/50 border-none rounded-xl text-xs font-bold" placeholder="John Doe" value={offlineForm.name} onChange={e => setOfflineForm({...offlineForm, name: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Select Service</label>
                      <select className="py-4 px-6 bg-gray-50 dark:bg-gray-800/50 border-none rounded-xl text-xs font-bold" value={offlineForm.service} onChange={e => setOfflineForm({...offlineForm, service: e.target.value})} required>
                        <option value="">Select Service</option>
                        {services.map(s => <option key={s.name} value={s.name}>{s.name} — ₹{s.price}</option>)}
                      </select>
                    </div>
                    <button className="w-full bg-primary text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">Submit Order</button>
                  </form>
                </div>

                <div className="bg-gray-950 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-125 transition-transform">
                      <PieChart size={120} />
                   </div>
                   <div className="relative z-10">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-4">Elite Retention</p>
                      <h3 className="text-4xl font-black tracking-tighter mb-6">+24% <span className="text-primary italic">Growth</span></h3>
                      <p className="text-sm text-gray-400 font-medium mb-8">Your customer retention rate is at an all-time high this month.</p>
                      <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-primary">View Insights <ArrowUpRight size={18} /></button>
                   </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto py-24">
             <div className="bg-white dark:bg-gray-900 p-12 rounded-[3rem] shadow-xl border border-gray-50 dark:border-gray-800">
                <div className="flex items-center gap-6 mb-12 pb-12 border-b border-gray-50 dark:border-gray-800">
                   <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary shadow-inner">
                      <Shield size={32} />
                   </div>
                   <div>
                      <h2 className="text-2xl font-black tracking-tighter">Security Credentials</h2>
                      <p className="text-sm text-text-muted font-medium">Protect your Elite business account.</p>
                   </div>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-10">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Current Master Key</label>
                      <input type="password" required className="py-5 px-8 bg-gray-50 dark:bg-gray-800/50 border-none rounded-2xl text-lg font-bold" placeholder="••••••••" value={passwordState.current} onChange={e => setPasswordState({...passwordState, current: e.target.value})} />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">New Security Key</label>
                         <input type="password" required className="py-5 px-8 bg-gray-50 dark:bg-gray-800/50 border-none rounded-2xl text-lg font-bold" placeholder="••••••••" value={passwordState.new} onChange={e => setPasswordState({...passwordState, new: e.target.value})} />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Confirm Key</label>
                         <input type="password" required className="py-5 px-8 bg-gray-50 dark:bg-gray-800/50 border-none rounded-2xl text-lg font-bold" placeholder="••••••••" value={passwordState.confirm} onChange={e => setPasswordState({...passwordState, confirm: e.target.value})} />
                      </div>
                   </div>

                   {passwordMsg.text && (
                      <div className={`p-5 rounded-2xl text-xs font-bold flex items-center gap-3 ${passwordMsg.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                         {passwordMsg.type === 'error' ? <XCircle size={18} /> : <CheckCircle size={18} />}
                         {passwordMsg.text}
                      </div>
                   )}

                   <button type="submit" className="w-full bg-gray-950 dark:bg-white text-white dark:text-gray-950 py-6 rounded-[2rem] text-xs font-black uppercase tracking-[0.4em] shadow-2xl hover:scale-[1.02] transition-all">
                      Update Security Key
                   </button>
                </form>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
