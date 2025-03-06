import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../styles/Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setError('Invalid email format');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const existingUser = localStorage.getItem('user');
    if (existingUser && JSON.parse(existingUser).email === email) {
      setError('Email already registered');
      return;
    }

    localStorage.setItem('user', JSON.stringify(formData));
    setFormData({ name: '', email: '', password: '' });
    navigate('/login');
  };

  return (
    <section className="signup-section">
      <Helmet>
        <title>HomeVerse - Signup</title>
        <meta name="description" content="Sign up for HomeVerse to access premium home services." />
        <meta name="keywords" content="signup, HomeVerse, home services, register" />
      </Helmet>

      <div className="signup-background">
        <Container className="signup-container">
          <motion.div
            className="signup-form-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="signup-title">Sign Up</h1>
            <Form onSubmit={handleSubmit} className="signup-form">
              <Form.Group className="mb-3 signup">
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="futuristic-input"
                />
              </Form.Group>

              <Form.Group className="mb-3 signup">
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="futuristic-input"
                />
              </Form.Group>

              <Form.Group className="mb-3 signup">
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Your Password"
                  className="futuristic-input"
                />
              </Form.Group>

              {error && (
                <Alert variant="danger" className="futuristic-alert error">
                  {error}
                </Alert>
              )}

              <Button variant="primary" type="submit" className="signup-btn">
                Sign Up
              </Button>
            </Form>
            <p className="switch-text">
              Already have an account?{' '}
              <Button
                variant="link"
                className="switch-link"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </p>
          </motion.div>
        </Container>
      </div>
    </section>
  );
};

export default Signup;