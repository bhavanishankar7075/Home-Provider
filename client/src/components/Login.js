import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../styles/Login.css';

const Login = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    const { email, password } = formData;

    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setError('Invalid email format');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
      setError('Invalid email or password');
      return;
    }

    handleLogin(storedUser);
    setFormData({ email: '', password: '' });
    navigate('/home');
  };

  return (
    <section className="login-section">
      <Helmet>
        <title>HomeVerse - Login</title>
        <meta name="description" content="Log in to HomeVerse to manage your home services account." />
        <meta name="keywords" content="login, HomeVerse, home services, sign in" />
      </Helmet>

      <div className="login-background"> 
        <Container className="login-container">
          <motion.div
            className="login-form-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="login-title">Login</h1>
            <Form onSubmit={handleSubmit} className="login-form">
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="futuristic-input"
                />
              </Form.Group>

              <Form.Group className="mb-3">
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

              <Button variant="primary" type="submit" className="login-btn">
                Login
              </Button>
            </Form>
            <p className="switch-text">
              New user?{' '}
              <Button
                variant="link"
                className="switch-link"
                onClick={() => navigate('/')}
              >
                Sign Up
              </Button>
            </p>
          </motion.div>
        </Container>
      </div>
    </section>
  );
};

export default Login;