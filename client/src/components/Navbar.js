import React, { useState, useRef, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Dropdown, Form, FormControl } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaSearch } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navigation = ({ isLoggedIn, user, handleLogout, notifications = [], setNotifications }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownToggleRef = useRef(null);
  const dropdownMenuRef = useRef(null);

  const onLogout = () => {
    handleLogout();
  };

  const clearNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && isLoggedIn) {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`, { replace: true });
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleBrandClick = () => {
    navigate(isLoggedIn ? '/home' : '/', { replace: true });
  };

  useEffect(() => {
    if (isDropdownOpen && dropdownToggleRef.current && dropdownMenuRef.current) {
      const toggleRect = dropdownToggleRef.current.getBoundingClientRect();
      const menuRect = dropdownMenuRef.current.getBoundingClientRect();
      const topPosition = toggleRect.top - menuRect.height - 10;
      const leftPosition = toggleRect.right - menuRect.width;
      const adjustedTop = Math.max(10, topPosition);
      const adjustedLeft = Math.min(window.innerWidth - menuRect.width - 10, Math.max(10, leftPosition));
      dropdownMenuRef.current.style.top = `${adjustedTop}px`;
      dropdownMenuRef.current.style.left = `${adjustedLeft}px`;
    }
  }, [isDropdownOpen]);

  return (
    <motion.div    className="cosmic-navbar-wrapper"
    initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
      <Navbar expand="lg" className="cosmic-navbar" fixed="top">
        <Container>
          <Navbar.Brand onClick={handleBrandClick} className="cosmic-brand">HomeVerse</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="cosmic-toggle"/>
          <Navbar.Collapse id="basic-navbar-nav">
            {isLoggedIn ? (
              <>
                <Nav className="me-auto cosmic-nav">
                  <Nav.Link href="/home" className="cosmic-nav-link">Home</Nav.Link>
                  <Nav.Link href="/services" className="cosmic-nav-link">Services</Nav.Link>
                  <Nav.Link href="/contact" className="cosmic-nav-link">Contact Us</Nav.Link>
                  <Nav.Link href="/profile" className="cosmic-nav-link">Profile</Nav.Link>
                </Nav>
                <div className="cosmic-user-info">
                  <Button variant="outline-light" className="cosmic-search-btn" onClick={toggleSearch}><FaSearch /></Button>
                  <motion.div
                    className="cosmic-search-form-wrapper"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: showSearch ? 1 : 0, width: showSearch ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
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
                        <Button variant="outline-light" type="submit" className="cosmic-search-submit">Search</Button>
                      </Form>
                    )}
                  </motion.div>
                  <Dropdown
                  
                    show={isDropdownOpen}
                    onToggle={(isOpen) => setIsDropdownOpen(isOpen)}
                    className="ms-3 cosmic-notifications-dropdown"
                  >
                    <Dropdown.Toggle
                      ref={dropdownToggleRef}
                      variant="outline-light"
                      id="dropdown-notifications"
                       className="cosmic-notif-toggle"
                    >
                      <FaBell /> {notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                     className="cosmic-dropdown-menu"
                      ref={dropdownMenuRef}
                      align="end"
                      style={{
                        position: 'fixed',
                        minWidth: '250px',
                        maxWidth: '320px',
                        padding: '12px',
                        zIndex: 2000,
                        maxHeight: '400px',
                        overflowY: 'auto',
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.15)',
                        animation: 'fadeIn 0.3s ease-in-out',
                      }}
                    >
                      {notifications.length === 0 ? (
                        <Dropdown.Item disabled className="text-center cosmic-dropdown-item" style={{ padding: '10px', color: '#888' }}>
                          No notifications
                        </Dropdown.Item>
                      ) : (
                        notifications.map((notif) => (
                          <Dropdown.Item
                          className="cosmic-dropdown-item"
                            key={notif.id}
                            as="div"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              padding: '10px',
                              marginBottom: '8px',
                              backgroundColor: '#f8f9fa',
                              borderRadius: '6px',
                              transition: 'background-color 0.2s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e9ecef')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                              <span style={{ marginRight: '8px', fontSize: '18px' }}>ℹ️</span>
                              <div>
                                <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>
                                  {notif.message}
                                </div>
                                <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '4px' }}>
                                  {notif.timestamp}
                                </div>
                              </div>
                            </div>
                            <Button
                            className="cosmic-clear-btn"
                              variant="link"
                              size="sm"
                              onClick={() => clearNotification(notif.id)}
                              style={{
                                padding: '0',
                                color: '#dc3545',
                                fontSize: '12px',
                                textDecoration: 'none',
                                marginLeft: '10px',
                              }}
                              aria-label="Clear notification"
                            >
                              Clear
                            </Button>
                          </Dropdown.Item>
                        ))
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                  <span className="ms-3 cosmic-user-name ">Welcome, {user?.name}</span>
                  <Button variant="outline-light" onClick={onLogout} className="ms-3 cosmic-logout-btn">Logout</Button>
                </div>
              </>
            ) : (
              <Nav className="ms-auto cosmic-auth-nav">
                <Nav.Link href="/login" className="cosmic-nav-link">Login</Nav.Link>
                <Nav.Link href="/" className="cosmic-nav-link">Signup</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
};

export default Navigation;