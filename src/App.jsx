import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import CustomerApp from './pages/CustomerApp';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

const AppContent = () => {
  const { isAdminMode } = useApp();

  return (
    <div className="app-wrapper">
      <Navbar />
      <main>
        {isAdminMode ? <AdminDashboard /> : <CustomerApp />}
      </main>
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">S</div>
            <div>
              <h3>Salon<span className="text-primary">Pro</span></h3>
              <p className="text-text-muted text-sm">Premium Beauty & Wellness</p>
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Services</h4>
              <a href="#services">Hair Care</a>
              <a href="#services">Makeup</a>
              <a href="#services">Skincare</a>
              <a href="#services">Bridal</a>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <a href="#booking">Book Now</a>
              <a href="https://wa.me/919876543210">WhatsApp</a>
              <a href="#testimonials">Reviews</a>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <p>123 Beauty Lane</p>
              <p>Mumbai, India</p>
              <p>+91 98765 43210</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 SalonPro. All rights reserved. Made with ❤️ in India</p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
