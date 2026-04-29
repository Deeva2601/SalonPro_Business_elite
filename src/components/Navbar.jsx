import React from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Moon, User, Shield, Bell, BellOff } from 'lucide-react';

const Navbar = () => {
  const { theme, toggleTheme, isAdminMode, toggleMode, isAuthenticated, logout } = useApp();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
          S
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Salon<span className="text-primary">Pro</span></h1>
          <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold">Business Elite</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Toggle */}
        <button 
          onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Toggle Notifications"
        >
          {notificationsEnabled ? <Bell size={20} className="text-accent" /> : <BellOff size={20} className="text-text-muted" />}
        </button>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative group"
        >
          <div className="relative w-6 h-6 overflow-hidden">
             <Sun size={20} className={`absolute inset-0 transition-transform duration-500 ${theme === 'dark' ? 'translate-y-8' : 'translate-y-0'}`} />
             <Moon size={20} className={`absolute inset-0 transition-transform duration-500 ${theme === 'light' ? '-translate-y-8' : 'translate-y-0'}`} />
          </div>
        </button>

        {/* Mode Toggle */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1 border border-card-border">
          <button 
            onClick={() => isAdminMode && logout()}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${!isAdminMode ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-text-muted'}`}
          >
            <User size={16} /> User
          </button>
          <button 
            onClick={() => !isAdminMode && toggleMode()}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${isAdminMode ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-text-muted'}`}
          >
            <Shield size={16} /> Admin
          </button>
        </div>

        {isAuthenticated && isAdminMode && (
          <button 
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white text-xs font-bold rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
