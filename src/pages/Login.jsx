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
    <div className="max-w-7xl mx-auto px-6 py-24 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="card p-10 bg-white dark:bg-gray-900 shadow-2xl border-gray-100 dark:border-gray-800 rounded-[2.5rem]">
          <div className="mb-12 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-6 shadow-inner">
              <Shield size={32} />
            </div>
            <h1 className="text-3xl font-black tracking-tighter mb-2">Owner Access</h1>
            <p className="text-sm text-text-muted font-medium">Verify your security credentials.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Security Key</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  type="password" 
                  placeholder="Master Password" 
                  className={`pl-14 pr-6 py-4 w-full font-bold rounded-2xl border-2 transition-all ${error ? 'border-red-500 bg-red-50/10' : 'border-gray-50 dark:border-gray-800 focus:border-primary/20'}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                  required
                />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 text-red-500 rounded-xl text-xs font-bold flex items-center gap-2"
                >
                  <AlertCircle size={16} /> Authentication failed. Please try again.
                </motion.div>
              )}
            </AnimatePresence>

            <button type="submit" className="w-full btn btn-primary py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 rounded-xl shadow-xl shadow-primary/20 group">
              Login to Admin <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">SalonPro Business Elite</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
