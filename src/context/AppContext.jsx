import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState(localStorage.getItem('adminPassword') || 'admin123');
  const [bookings, setBookings] = useState([
    { id: 1, name: 'Rahul Sharma', phone: '9876543210', service: 'Hair Cut', date: '2024-05-01', time: '10:30', status: 'Pending', price: 299, note: 'Regular customer' },
    { id: 2, name: 'Priya Singh', phone: '9123456789', service: 'Bridal Makeup', date: '2024-05-02', time: '14:00', status: 'Accepted', price: 7999, note: 'Needs heavy base' },
    { id: 3, name: 'Anjali Gupta', phone: '8877665544', service: 'Facial', date: '2024-04-28', time: '11:00', status: 'Completed', price: 999, note: '' },
  ]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleMode = () => setIsAdminMode(prev => !prev);

  const login = (password) => {
    if (password === adminPassword) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdminMode(false);
  };

  const changePassword = (newPassword) => {
    setAdminPassword(newPassword);
    localStorage.setItem('adminPassword', newPassword);
    return true;
  };

  const addBooking = (newBooking) => {
    const bookingWithId = { 
      ...newBooking, 
      id: Date.now(), 
      status: 'Pending',
      price: getServicePrice(newBooking.service),
      type: 'Online'
    };
    setBookings(prev => [bookingWithId, ...prev]);
  };

  const addOfflinePayment = (paymentData) => {
    const newPayment = {
      ...paymentData,
      id: Date.now(),
      status: 'Completed',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price: getServicePrice(paymentData.service),
      type: 'Offline'
    };
    setBookings(prev => [newPayment, ...prev]);
  };

  const updateBookingStatus = (id, status) => {
    setBookings(prev => prev.map(b => {
      if (b.id === id) {
        const updated = { ...b, status };
        if (status === 'Completed') {
          // Update date to today so it counts in today's revenue
          updated.date = new Date().toISOString().split('T')[0];
        }
        return updated;
      }
      return b;
    }));
  };

  const getServicePrice = (serviceName) => {
    const prices = {
      'Hair Cut': 299,
      'Hair Spa': 799,
      'Bridal Makeup': 7999,
      'Party Makeup': 1999,
      'Facial': 999,
      'Manicure/Pedicure': 699
    };
    return prices[serviceName] || 0;
  };

  return (
    <AppContext.Provider value={{ 
      theme, toggleTheme, 
      isAdminMode, toggleMode, 
      isAuthenticated, login, logout, adminPassword, changePassword,
      bookings, addBooking, addOfflinePayment, updateBookingStatus,
      getServicePrice
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
