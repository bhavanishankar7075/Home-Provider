import React, { useState } from 'react';
import { Container, Card, Button, Form, Alert, Modal } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import '../styles/Services.css';

const servicesData = [ 
  { id: 1, name: 'Cleaning', price: 50, description: 'Deep cleaning service for your home.' },
  { id: 2, name: 'Plumbing', price: 75, description: 'Fix leaks and pipes efficiently.' },
  { id: 3, name: 'Electrical', price: 60, description: 'Electrical repairs and installations.' },
];

const Services = ({ addNotification }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [bookingData, setBookingData] = useState({ date: '', time: '', payment: '' });
  const [availability, setAvailability] = useState('Checking...');
  const [successMessage, setSuccessMessage] = useState('');

  const handleBookNow = (service) => {
    setSelectedService(service);
    setModalType('book');
    setShowModal(true);
    setAvailability('Available');
  };

  const handleScheduleNow = (service) => {
    setSelectedService(service);
    setModalType('schedule');
    setShowModal(true);
    setAvailability('Available');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
    setAvailability('Available');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { date, time, payment } = bookingData;

    if (modalType === 'schedule' && (!date || !time)) {
      setAvailability('Please select date and time');
      return;
    }
    if (modalType === 'book' && !payment) {
      setAvailability('Please enter payment details');
      return;
    }

    const booking = {
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      price: selectedService.price,
      date: date || 'Immediate',
      time: time || 'Now',
      payment: payment || 'Pending',
      status: modalType === 'book' ? 'Booked' : 'Scheduled',
      bookedAt: new Date().toLocaleString(),
    };

    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([...bookings, booking]));
    addNotification(`${modalType === 'book' ? 'Booked' : 'Scheduled'} ${selectedService.name} for $${selectedService.price}`);
    setSuccessMessage(`${modalType === 'book' ? 'Booked' : 'Scheduled'} successfully!`);
    setBookingData({ date: '', time: '', payment: '' });
    setTimeout(() => {
      setShowModal(false);
      setSuccessMessage('');
    }, 1500);
  };

  return (
    <section className="services-section">
      <Helmet>
        <title>HomeVerse - Services</title>
        <meta name="description" content="Book or schedule home services like cleaning, plumbing, and electrical with real-time updates." />
        <meta name="keywords" content="home services, booking, scheduling, prices, real-time, HomeVerse" />
      </Helmet> 

      <Container className="services-container">
        <motion.div
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="services-title pt-5 mt-2">Our Services</h1>
          <div className="services-list">
            {servicesData.map((service) => (
              <Card key={service.id} className="service-card mb-4"> 
                <Card.Body> 
                  <Card.Title>{service.name}</Card.Title>
                  <Card.Text>{service.description}</Card.Text>
                  <Card.Text><strong>Price:</strong> ${service.price}</Card.Text>
                  <div className="service-buttons">
                    <Button
                      variant="primary"
                      className="book-now-btn m-2"
                      onClick={() => handleBookNow(service)}
                    >
                      Book Now 
                    </Button>
                    <Button
                      variant="outline-primary"
                      className="schedule-now-btn"
                      onClick={() => handleScheduleNow(service)}
                    >
                      Schedule Now
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
          {successMessage && (
            <Alert variant="success" className="services-alert">
              {successMessage}
            </Alert>
          )}
        </motion.div>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{modalType === 'book' ? 'Book' : 'Schedule'} {selectedService?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              {modalType === 'schedule' && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={bookingData.date}
                      onChange={handleInputChange}
                      className="schedule-input"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                      type="time"
                      name="time"
                      value={bookingData.time}
                      onChange={handleInputChange}
                      className="schedule-input"
                    />
                  </Form.Group>
                </>
              )}
              {modalType === 'book' && (
                <Form.Group className="mb-3">
                  <Form.Label>Payment Method (Simulated)</Form.Label>
                  <Form.Control
                    type="text"
                    name="payment"
                    value={bookingData.payment}
                    onChange={handleInputChange}
                    placeholder="e.g., Credit Card"
                    className="schedule-input"
                  />
                </Form.Group>
              )}
              <p><strong>Availability:</strong> {availability}</p>
              <Button variant="primary" type="submit" className="schedule-btn">
                Confirm {modalType === 'book' ? 'Booking' : 'Schedule'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </section>
  );
};

export default Services;