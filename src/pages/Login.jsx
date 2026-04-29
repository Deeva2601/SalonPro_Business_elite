import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const { login } = useApp();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(password);
    if (!success) {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-white dark:bg-gray-950 overflow-hidden">
      {/* Left Side: Visual Experience */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img 
          src="/login-bg.png" 
          alt="Salon Interior" 
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        
        <div className="relative z-10 p-16 self-end w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-1 bg-primary mb-8" />
            <h2 className="text-5xl font-black text-white mb-4 tracking-tighter leading-tight">
              Manage Your <br />
              <span className="text-gradient">Empire</span> With Ease.
            </h2>
            <p className="text-xl text-gray-300 font-medium max-w-md">
              Elite management tools for premium salon businesses. Access your personalized business dashboard.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-24 relative bg-white dark:bg-gray-950">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md w-full -mt-20 lg:-mt-32" 
        >
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20">
                <Shield size={28} strokeWidth={2.5} />
              </div>
              <div className="h-8 w-[2px] bg-gray-200 dark:bg-gray-800" />
              <span className="text-sm font-black uppercase tracking-[0.4em] text-primary">Master Access</span>
            </div>
            
            <h1 className="text-5xl font-black tracking-tighter mb-4 text-gray-900 dark:text-white leading-none">
              Identity <br />
              <span className="text-gradient">Verification</span>
            </h1>
            <p className="text-lg text-text-muted font-medium">Please enter your master security key to proceed.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-4">
              <div className="flex justify-between items-end px-2">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Security Key</label>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-black text-primary tracking-widest uppercase">Encrypted Session</span>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[2rem] blur opacity-10 group-focus-within:opacity-25 transition duration-500" />
                <div className="relative">
                  <Lock className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${error ? 'text-red-500' : 'text-gray-400 group-focus-within:text-primary'}`} size={22} />
                  <input 
                    type="password" 
                    placeholder="Master Password" 
                    className={`pl-14 pr-6 py-6 w-full text-xl font-bold rounded-[2rem] transition-all duration-300 outline-none ${error ? 'border-red-500 bg-red-50/20 text-red-600' : 'bg-gray-50 dark:bg-gray-900/50 border-2 border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-gray-900 text-gray-900 dark:text-white shadow-inner'}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    required
                  />
                </div>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center gap-3 text-red-500 font-bold text-sm"
                >
                  <AlertCircle size={20} /> Access Denied. Verify your credentials.
                </motion.div>
              )}
            </AnimatePresence>

            <button type="submit" className="w-full btn btn-primary py-5 text-lg font-black tracking-widest uppercase flex items-center justify-center gap-4 group rounded-2xl shadow-2xl shadow-primary/40 active:scale-95 transition-all">
              Login To Dashboard <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </form>

          <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <p className="text-xs text-text-muted font-bold tracking-widest uppercase">Elite Edition</p>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-green-500 font-black tracking-widest uppercase">System Online</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
