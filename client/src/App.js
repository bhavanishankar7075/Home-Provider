import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true'; // Check logged-in flag
    if (storedUserData) {
      try {
        const parsedUser = JSON.parse(storedUserData);
        if (parsedUser && typeof parsedUser === 'object') {
          setUser(parsedUser);
          setIsLoggedIn(loggedInStatus); // Set based on stored flag
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        setUser(null);
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true'); // Persist logged-in state
    addNotification(`Welcome back, ${userData.name}!`);
    navigate('/home', { replace: true });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false'); // Clear logged-in state, keep user data
    setNotifications([]);
    navigate('/login', { replace: true });
  };

  const addNotification = (message) => {
    setNotifications((prev) => [...prev, { id: Date.now(), message, timestamp: new Date().toLocaleString() }]);
  };

  return (
    <div>
      <Navigation
        isLoggedIn={isLoggedIn}
        user={user}
        handleLogout={handleLogout}
        notifications={notifications}
        setNotifications={setNotifications}
      />
      <main>
        <Routes>
          <Route path="/" element={!isLoggedIn ? <Signup /> : <Navigate to="/home" replace />} />
          <Route path="/login" element={!isLoggedIn ? <Login handleLogin={handleLogin} /> : <Navigate to="/home" replace />} />
          <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />} />
          <Route path="/services" element={<Services addNotification={addNotification} />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
          <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />} />
        </Routes>
      </main>
      {isLoggedIn && <Footer />}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;