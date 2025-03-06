import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowUp, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../styles/ContactUs.css';

const ContactUs = () => {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [messageSent, setMessageSent] = useState(false);

  // Scroll-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setMessageSent(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setMessageSent(false), 3000);
  };

  return (
    <section className="contact-us-section">
      {/* SEO Metadata */}
      <Helmet>
        <title>HomeVerse - Contact Us</title>
        <meta
          name="description"
          content="Get in touch with HomeVerse for professional home services. Find our address, phone number, email, and send us a message."
        />
        <meta
          name="keywords"
          content="contact HomeVerse, home services contact, cleaning services contact, plumbing services contact"
        />
      </Helmet>

      {/* Contact Image with Home Button */}
      <header className="contact-image-section">
        <motion.img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
          alt="Contact HomeVerse for Home Services"
          className="contact-main-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="image-overlay">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Button
              variant="outline-light"
              className="home-btn"
              onClick={() => navigate('/home')}
            >
              <FaHome className="me-2" /> Home
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Address Section */}
      <Container className="my-5 address-section">
        <Row>
          <Col md={4} sm={12}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3><FaMapMarkerAlt className="icon" /> Address</h3>
              <p>123 Home St, Clean City, USA</p>
            </motion.div>
          </Col>
          <Col md={4} sm={12}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3><FaPhone className="icon" /> Phone Number</h3>
              <p>+1 234 567 890</p>
            </motion.div>
          </Col>
          <Col md={4} sm={12}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3><FaEnvelope className="icon" /> Email</h3>
              <p>support@homeverse.com</p>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Map & Form Section */}
      <Container className="my-5 map-form-section">
        <Row>
          {/* Left: Google Maps */}
          <Col md={6} sm={12}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <iframe
                title="HomeVerse Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509364!2d144.9537353153167!3d-37.81627997975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d7f9b0c8e0e!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1633021234567!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0, borderRadius: '15px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)' }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </motion.div>
          </Col>

          {/* Right: Contact Form */}
          <Col md={6} sm={12}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="contact-form-container"
            >
              <h2>Any Questions?</h2>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} sm={12}>
                    <Form.Group className="mb-4 form-group-custom">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Your Name"
                        required
                        className="custom-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} sm={12}>
                    <Form.Group className="mb-4 form-group-custom">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="Your Email"
                        required
                        className="custom-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12}>
                    <Form.Group className="mb-4 form-group-custom">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="Your Phone"
                        required
                        className="custom-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} sm={12}>
                    <Form.Group className="mb-4 form-group-custom">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleFormChange}
                        placeholder="Subject"
                        required
                        className="custom-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-4 form-group-custom">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Write your message here..."
                    required
                    className="custom-textarea"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="send-btn w-100">
                  Send Message
                </Button>
                <AnimatePresence>
                  {messageSent && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                      className="message-sent-alert"
                    >
                      <Alert variant="success" className="custom-alert">
                        Message Sent Successfully!
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            className="scroll-top-btn"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
          >
            <FaArrowUp size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactUs;