import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrendingUp, Users, Calendar, CheckCircle, Clock, XCircle, 
  IndianRupee, ChevronRight, Search, Filter, Plus, Bell,
  LayoutDashboard, Shield, LogOut, Settings, CreditCard,
  ChevronDown, ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const { bookings, updateBookingStatus, addOfflinePayment, changePassword, adminPassword, logout } = useApp();
  const [activeTab, setActiveTab] = useState('Overview');
  const [dataRange, setDataRange] = useState('Daily');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [offlineForm, setOfflineForm] = useState({ name: '', service: '' });
  
  const [passwordState, setPasswordState] = useState({ current: '', new: '', confirm: '' });
  const [passwordMsg, setPasswordMsg] = useState({ text: '', type: '' });

  const getFilteredByRange = (data) => {
    const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD
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
      if (dataRange === 'Annual') {
        return bDate.getFullYear() === now.getFullYear();
      }
      return true;
    });
  };

  const rangeBookings = getFilteredByRange(bookings);

  // Syncing stats with rangeBookings
  const completedBookings = rangeBookings.filter(b => b.status === 'Completed');
  const totalRevenue = completedBookings.reduce((acc, curr) => acc + curr.price, 0);
  const pendingCount = rangeBookings.filter(b => b.status === 'Pending').length;
  const totalCount = rangeBookings.length;
  const completedCount = completedBookings.length;

  const stats = [
    { label: `${dataRange} Revenue`, value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: <IndianRupee />, color: "from-green-500 to-emerald-600", trend: "+12.5%" },
    { label: "Total Bookings", value: totalCount, icon: <Calendar />, color: "from-blue-500 to-indigo-600", trend: "+4" },
    { label: "Pending", value: pendingCount, icon: <Clock />, color: "from-amber-500 to-orange-600", trend: "Needs Action" },
    { label: "Completed", value: completedCount, icon: <CheckCircle />, color: "from-purple-500 to-fuchsia-600", trend: "Success" },
  ];

  const filteredBookings = rangeBookings.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.phone.includes(search);
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Accepted': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Completed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordState.current !== adminPassword) {
      setPasswordMsg({ text: 'Current password is incorrect!', type: 'error' });
      return;
    }
    if (passwordState.new !== passwordState.confirm) {
      setPasswordMsg({ text: 'New passwords do not match!', type: 'error' });
      return;
    }
    if (passwordState.new.length < 4) {
      setPasswordMsg({ text: 'Minimum 4 characters required!', type: 'error' });
      return;
    }
    
    changePassword(passwordState.new);
    setPasswordMsg({ text: 'Password updated successfully!', type: 'success' });
    setPasswordState({ current: '', new: '', confirm: '' });
    setTimeout(() => setPasswordMsg({ text: '', type: '' }), 3000);
  };

  const navItems = [
    { id: 'Overview', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'Settings', label: 'Security', icon: <Shield size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col z-20">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20">S</div>
            <div>
              <h2 className="text-lg font-black tracking-tighter">SALON<span className="text-primary">PRO</span></h2>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Business Elite</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${activeTab === item.id ? 'bg-primary text-white shadow-xl shadow-primary/30' : 'text-text-muted hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-text'}`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8">
          <div className="card bg-gray-50 dark:bg-gray-800/50 p-4 mb-6 rounded-2xl">
            <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">System Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold">Secure Connection</span>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white">
              {activeTab === 'Overview' ? 'Overview' : 'Security Settings'}
            </h1>
            <p className="text-text-muted font-medium">Salon Management Elite Portal v2.0</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-white dark:bg-gray-900 px-4 py-2 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <Calendar size={18} className="text-primary" />
              <span className="text-sm font-bold">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}</span>
            </div>
            <button className="p-3 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 text-text-muted hover:text-primary relative shadow-sm">
              <Bell size={20} />
              <div className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
            </button>
          </div>
        </div>

        {activeTab === 'Overview' ? (
          <div className="space-y-10">
            {/* Range Toggle */}
            <div className="flex bg-white dark:bg-gray-900 p-1.5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm w-fit">
              {['Daily', 'Weekly', 'Monthly', 'Annual'].map(range => (
                <button 
                  key={range}
                  onClick={() => setDataRange(range)}
                  className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${dataRange === range ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-muted hover:text-text'}`}
                >
                  {range}
                </button>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card p-8 group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center shadow-lg`}>
                      {React.cloneElement(stat.icon, { size: 28 })}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${stat.trend.includes('+') ? 'bg-green-500/10 text-green-500' : 'bg-gray-100 dark:bg-gray-800 text-text-muted'}`}>
                      {stat.trend}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-text-muted mb-1">{stat.label}</p>
                  <p className="text-3xl font-black tracking-tighter">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
              {/* Appointments */}
              <div className="xl:col-span-2 space-y-6">
                <div className="card p-0 overflow-hidden">
                  <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <h2 className="text-xl font-black tracking-tighter">Recent Appointments</h2>
                    <div className="flex gap-4 w-full md:w-auto">
                      <div className="relative flex-grow">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                          className="pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-none text-sm w-full rounded-xl"
                          placeholder="Search..."
                          value={search}
                          onChange={e => setSearch(e.target.value)}
                        />
                      </div>
                      <select 
                        className="py-3 px-4 bg-gray-50 dark:bg-gray-800/50 border-none text-xs font-bold w-auto rounded-xl"
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
                        <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                          <th className="px-8 py-4 font-black uppercase tracking-widest text-[10px] text-text-muted">Customer</th>
                          <th className="px-8 py-4 font-black uppercase tracking-widest text-[10px] text-text-muted">Service</th>
                          <th className="px-8 py-4 font-black uppercase tracking-widest text-[10px] text-text-muted">Status</th>
                          <th className="px-8 py-4 font-black uppercase tracking-widest text-[10px] text-text-muted text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {filteredBookings.map((b) => (
                          <tr key={b.id} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all">
                            <td className="px-8 py-6">
                              <p className="font-bold text-gray-900 dark:text-white">{b.name}</p>
                              <p className="text-xs font-medium text-text-muted">{b.phone}</p>
                            </td>
                            <td className="px-8 py-6">
                              <p className="text-sm font-bold">{b.service}</p>
                              <p className="text-xs font-black text-primary">₹{b.price}</p>
                            </td>
                            <td className="px-8 py-6">
                              <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${getStatusColor(b.status)}`}>
                                {b.status}
                              </span>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-all">
                                {b.status === 'Pending' && (
                                  <button onClick={() => updateBookingStatus(b.id, 'Accepted')} className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-lg shadow-blue-500/20"><CheckCircle size={16} /></button>
                                )}
                                {(b.status === 'Pending' || b.status === 'Accepted') && (
                                  <>
                                    <button onClick={() => updateBookingStatus(b.id, 'Completed')} className="p-2.5 rounded-xl bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white transition-all shadow-lg shadow-green-500/20"><TrendingUp size={16} /></button>
                                    <button onClick={() => updateBookingStatus(b.id, 'Cancelled')} className="p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/20"><XCircle size={16} /></button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Sidebar: Offline & Insights */}
              <div className="space-y-10">
                <div className="card bg-gray-900 text-white p-8 border-none overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16" />
                  <h3 className="text-xl font-black tracking-tighter mb-4 relative z-10">Offline Payment</h3>
                  <p className="text-gray-400 text-sm mb-8 relative z-10 font-medium">Process rapid walk-in payments.</p>
                  <form className="space-y-5 relative z-10" onSubmit={(e) => { 
                    e.preventDefault(); 
                    addOfflinePayment(offlineForm);
                    setOfflineForm({ name: '', service: '' });
                  }}>
                    <input className="bg-white/10 border-none text-white py-4 placeholder-white/30 text-sm font-bold" placeholder="Customer Name" required value={offlineForm.name} onChange={e => setOfflineForm({...offlineForm, name: e.target.value})} />
                    <select className="bg-white/10 border-none text-white py-4 text-xs font-black uppercase tracking-widest [&>option]:text-black" required value={offlineForm.service} onChange={e => setOfflineForm({...offlineForm, service: e.target.value})}>
                      <option value="">Select Service</option>
                      <option value="Hair Cut">Hair Cut - ₹299</option>
                      <option value="Hair Spa">Hair Spa - ₹799</option>
                      <option value="Bridal Makeup">Bridal Makeup - ₹7999</option>
                      <option value="Party Makeup">Party Makeup - ₹1999</option>
                      <option value="Facial">Facial - ₹999</option>
                      <option value="Manicure/Pedicure">Manicure/Pedicure - ₹699</option>
                    </select>
                    <button className="w-full bg-primary text-white btn py-4 text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/40">Complete Order</button>
                  </form>
                </div>

                <div className="card p-8">
                  <h3 className="text-lg font-black tracking-tighter mb-6">Business Insights</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center group cursor-pointer hover:bg-primary/5 transition-all">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">Most Popular</p>
                        <p className="text-sm font-bold">Bridal Makeup</p>
                      </div>
                      <ArrowUpRight className="text-primary opacity-0 group-hover:opacity-100 transition-all" size={20} />
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center group cursor-pointer hover:bg-primary/5 transition-all">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">Client Retention</p>
                        <p className="text-sm font-bold">+24% Monthly</p>
                      </div>
                      <TrendingUp className="text-green-500 opacity-0 group-hover:opacity-100 transition-all" size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl">
            <div className="card p-10">
              <div className="flex items-center gap-5 mb-10 pb-10 border-b border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary shadow-inner">
                  <Shield size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tighter">Security Credentials</h2>
                  <p className="text-sm text-text-muted font-medium">Protect your Elite business account.</p>
                </div>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">Current Master Key</label>
                  <input type="password" required className="py-5 px-6 text-lg font-bold" placeholder="••••••••" value={passwordState.current} onChange={e => setPasswordState({...passwordState, current: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">New Security Key</label>
                    <input type="password" required className="py-5 px-6 text-lg font-bold" placeholder="New Key" value={passwordState.new} onChange={e => setPasswordState({...passwordState, new: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">Confirm New Key</label>
                    <input type="password" required className="py-5 px-6 text-lg font-bold" placeholder="Confirm Key" value={passwordState.confirm} onChange={e => setPasswordState({...passwordState, confirm: e.target.value})} />
                  </div>
                </div>

                <AnimatePresence>
                  {passwordMsg.text && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className={`p-5 rounded-2xl text-sm font-bold flex items-center gap-3 ${passwordMsg.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                      <AlertCircle size={20} /> {passwordMsg.text}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button type="submit" className="btn btn-primary py-5 px-10 text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/30">Update Security Key</button>
              </form>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
