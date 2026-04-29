import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import CustomerApp from './pages/CustomerApp';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import './App.css';

const AppContent = () => {
  const { isAdminMode, isAuthenticated } = useApp();

  if (isAdminMode && !isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="app-wrapper">
      <Navbar />
      <main>
        {isAdminMode ? <AdminDashboard /> : <CustomerApp />}
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
