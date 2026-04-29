import React from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Moon, User, Shield, Bell, BellOff, LogOut } from 'lucide-react';

const Navbar = () => {
  const { theme, toggleTheme, isAdminMode, toggleMode, isAuthenticated, logout } = useApp();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  return (
    <nav className="sticky top-0 z-50 px-12 py-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-950 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-gray-950 font-black text-xl shadow-lg">
          S
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tighter">SALON<span className="text-primary">PRO</span></h1>
          <p className="text-[9px] text-text-muted uppercase tracking-[0.4em] font-black">Business Elite</p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        {/* Navigation Items (Hidden in Admin Mode) */}
        {!isAdminMode && (
          <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-widest text-text-muted">
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#booking" className="hover:text-primary transition-colors">Reservations</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
          </div>
        )}

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-text-muted hover:text-primary"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Mode Switcher */}
          <div className="flex items-center bg-gray-50 dark:bg-gray-900 rounded-2xl p-1 border border-gray-100 dark:border-gray-800">
            <button 
              onClick={() => isAdminMode && toggleMode()}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!isAdminMode ? 'bg-white dark:bg-gray-800 shadow-sm text-primary' : 'text-text-muted'}`}
            >
              User
            </button>
            <button 
              onClick={() => !isAdminMode && toggleMode()}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isAdminMode ? 'bg-white dark:bg-gray-800 shadow-sm text-primary' : 'text-text-muted'}`}
            >
              Admin
            </button>
          </div>

          {isAuthenticated && isAdminMode && (
            <button 
              onClick={logout}
              className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all group"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
