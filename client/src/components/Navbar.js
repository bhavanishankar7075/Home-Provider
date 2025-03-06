import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Dropdown, Form, FormControl } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaSearch } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navigation = ({ isLoggedIn, user, handleLogout, notifications = [], setNotifications }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const onLogout = () => {
    handleLogout();
    navigate('/login');
  };

  const clearNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && isLoggedIn) {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleBrandClick = () => {
    navigate(isLoggedIn ? '/home' : '/');
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="cosmic-navbar-wrapper"
    >
      <Navbar expand="lg" className="cosmic-navbar" fixed="top">
        <Container>
          <Navbar.Brand onClick={handleBrandClick} className="cosmic-brand">
            HomeVerse
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="cosmic-toggle" />
          <Navbar.Collapse id="basic-navbar-nav">
            {isLoggedIn ? (
              <>
                <Nav className="me-auto cosmic-nav">
                  <Nav.Link href="/home" className="cosmic-nav-link navbar">Home</Nav.Link>
                  <Nav.Link href="/services" className="cosmic-nav-link">Services</Nav.Link>
                  <Nav.Link href="/contact" className="cosmic-nav-link">Contact Us</Nav.Link>
                  <Nav.Link href="/profile" className="cosmic-nav-link">Profile</Nav.Link>
                </Nav>
                <div className="cosmic-user-info">
                  <Button
                    variant="outline-light"
                    className="cosmic-search-btn"
                    onClick={toggleSearch}
                  >
                    <FaSearch />
                  </Button>
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: showSearch ? 1 : 0, width: showSearch ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
                    className="cosmic-search-form-wrapper"
                  >
                    {showSearch && (
                      <Form className="d-flex cosmic-search-form" onSubmit={handleSearch}>
                        <FormControl
                          type="search"
                          placeholder="Search services..."
                          className="cosmic-search-input"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          autoFocus
                        />
                        <Button variant="outline-light" type="submit" className="cosmic-search-submit">
                          Search
                        </Button>
                      </Form>
                    )}
                  </motion.div>
                  <Dropdown className="cosmic-notifications-dropdown ms-3">
                    <Dropdown.Toggle variant="outline-light" id="dropdown-notifications" className="cosmic-notif-toggle">
                      <FaBell /> {notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end" className="cosmic-dropdown-menu">
                      {notifications.length === 0 ? (
                        <Dropdown.Item disabled className="cosmic-dropdown-item">No notifications</Dropdown.Item>
                      ) : (
                        notifications.map((notif) => (
                          <Dropdown.Item key={notif.id} as="div" className="cosmic-dropdown-item">
                            <div>{notif.message}</div>
                            <small>{notif.timestamp}</small>
                            <Button
                              variant="link"
                              size="sm"
                              onClick={() => clearNotification(notif.id)}
                              className="cosmic-clear-btn"
                            >
                              Clear
                            </Button>
                          </Dropdown.Item>
                        ))
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                  <span className="cosmic-user-name ms-3">Welcome, {user?.name}</span>
                  <Button variant="outline-light" onClick={onLogout} className="cosmic-logout-btn ms-3">
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <Nav className="ms-auto cosmic-auth-nav">
                {localStorage.getItem('user') ? (
                  <Nav.Link href="/login" className="cosmic-nav-link">Login</Nav.Link>
                ) : (
                  <Nav.Link href="/" className="cosmic-nav-link">Signup</Nav.Link>
                )}
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
};

export default Navigation;