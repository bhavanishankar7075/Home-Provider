import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import '../styles/BookingModal.css';

const BookingModal = ({ show, handleClose, service }) => {
  const [formData, setFormData] = useState({ name: '', date: '' });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      handleClose();
    }, 2000); // Simulate real-time confirmation
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="booking-modal">
      <Modal.Header closeButton>
        <Modal.Title>Book {service}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {bookingConfirmed ? (
          <Alert variant="success">Booking confirmed for {service}!</Alert>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Preferred Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Confirm Booking
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default BookingModal;