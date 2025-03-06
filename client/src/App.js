import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import ContactUs from './pages/ContacUs';
import SearchResults from './pages/SearchResults';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      try {
        const parsedUser = JSON.parse(storedUserData);
        if (parsedUser && typeof parsedUser === 'object') {
          setUser(parsedUser);
          setIsLoggedIn(true); // Set logged-in state if user exists
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        setUser(null);
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    addNotification(`Welcome back, ${userData.name}!`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setNotifications([]);
    // Do not clear localStorage or user state here—allow re-login with same details
  };

  const addNotification = (message) => {
    setNotifications((prev) => [...prev, { id: Date.now(), message, timestamp: new Date().toLocaleString() }]);
  };

  return (
    <Router>
      <Navigation
        isLoggedIn={isLoggedIn}
        user={user}
        handleLogout={handleLogout}
        notifications={notifications}
        setNotifications={setNotifications}
      />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={!isLoggedIn ? <Signup /> : <Navigate to="/home" />} />
          <Route path="/login" element={!isLoggedIn ? <Login handleLogin={handleLogin} /> : <Navigate to="/home" />} />
          {/* Open Routes - No login enforcement post-login */}
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services addNotification={addNotification} />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
        </Routes>
      </main>
      {isLoggedIn && <Footer />}
    </Router>
  );
}

export default App;