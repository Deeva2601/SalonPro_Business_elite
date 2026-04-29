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
    <div className="min-h-[90vh] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px] animate-blob animation-delay-4000" />
      </div>

      {/* Floating Icons */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-20 left-[15%] text-primary/30 hidden lg:block"
      >
        <Shield size={64} />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute bottom-20 right-[15%] text-secondary/30 hidden lg:block"
      >
        <Lock size={48} />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="card glass p-10 border-white/30 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
          <div className="text-center mb-12">
            <div className="inline-flex p-4 rounded-3xl bg-gradient-to-br from-primary to-secondary mb-6 shadow-lg shadow-primary/30">
              <Shield className="text-white" size={40} strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">MASTER <span className="text-gradient">ACCESS</span></h1>
            <p className="text-text-muted font-bold text-sm tracking-widest uppercase">Admin Management Elite</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted">Security Key</label>
                <span className="text-[10px] text-primary font-bold">ENCRYPTED</span>
              </div>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500" />
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={20} />
                  <input 
                    type="password" 
                    placeholder="Enter Master Password" 
                    className="pl-12 pr-4 py-5 w-full text-lg font-bold rounded-2xl bg-white/80 dark:bg-gray-900/80 border-none shadow-inner focus:ring-0"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center gap-3 text-red-500 font-bold text-sm"
                >
                  <AlertCircle size={20} /> Access Denied. Identity Not Verified.
                </motion.div>
              )}
            </AnimatePresence>

            <button type="submit" className="w-full btn btn-primary py-5 text-lg font-black tracking-widest uppercase flex items-center justify-center gap-4 group rounded-2xl shadow-2xl shadow-primary/40 active:scale-95 transition-all">
              Unlock System <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </form>

          <div className="mt-12 flex items-center justify-center gap-4 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-help">
            <div className="h-[1px] w-8 bg-text-muted" />
            <span className="text-[10px] font-black tracking-widest text-text-muted">SALONPRO BIOMETRIC V2.4</span>
            <div className="h-[1px] w-8 bg-text-muted" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
