import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, ListGroup } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import '../styles/Profile.css';

const Profile = ({ user, setUser }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: user?.name || '', email: user?.email || '' });
  const [reviewData, setReviewData] = useState({ serviceId: '', rating: '', comment: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setSuccessMessage('Name and email are required.');
      return;
    }
    if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setSuccessMessage('Invalid email format.');
      return;
    }

    const updatedUser = { ...user, name: formData.name, email: formData.email };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser); // Update parent state
    setSuccessMessage('Profile updated successfully!');
    setEditMode(false);
    setTimeout(() => setSuccessMessage(''), 1500);
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewData.serviceId || !reviewData.rating) {
      setSuccessMessage('Please select a service and rating.');
      return;
    }
    const review = { ...reviewData, userId: user?.email || 'unknown', timestamp: new Date().toLocaleString() };
    localStorage.setItem('reviews', JSON.stringify([...reviews, review]));
    setSuccessMessage('Review submitted successfully!');
    setReviewData({ serviceId: '', rating: '', comment: '' });
    setTimeout(() => setSuccessMessage(''), 1500);
  };

  return (
    <section className="profile-section">
      <Helmet>
        <title>HomeVerse - Profile</title>
        <meta name="description" content="Manage your profile, view service history, and leave reviews on HomeVerse." />
        <meta name="keywords" content="profile, service history, reviews, HomeVerse" />
      </Helmet>

      <Container className="profile-container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="profile-title ">Your Profile</h1>

          {/* User Profile */}
          <Card className="profile-card">
            <Card.Body>
              <Card.Title>Account Details</Card.Title>
              {editMode ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="profile-input"
                      placeholder="Enter your name"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="profile-input"
                      placeholder="Enter your email"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="profile-btn">
                    Save
                  </Button>
                  <Button variant="outline-secondary" onClick={() => setEditMode(false)} className="ms-2">
                    Cancel
                  </Button>
                </Form>
              ) : (
                <>
                  <Card.Text><strong>Name:</strong> {user?.name || 'N/A'}</Card.Text>
                  <Card.Text><strong>Email:</strong> {user?.email || 'N/A'}</Card.Text>
                  <Button variant="outline-primary" onClick={() => setEditMode(true)} className="profile-btn">
                    Edit Profile
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>

          {/* Service History */}
          <Card className="profile-card mt-4">
            <Card.Body>
              <Card.Title>Service History</Card.Title>
              {bookings.length === 0 ? (
                <Card.Text>No services booked yet.</Card.Text>
              ) : (
                <ListGroup variant="flush">
                  {bookings.map((booking, index) => (
                    <ListGroup.Item key={index} className="history-item">
                      <strong>{booking.serviceName}</strong> - ${booking.price}<br />
                      <small>{booking.status} on {booking.bookedAt}</small><br />
                      <small>{booking.date} at {booking.time}</small>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>

          {/* Reviews */}
          <Card className="profile-card mt-2 mb-4">
            <Card.Body>
              <Card.Title>Leave a Review</Card.Title>
              <Form onSubmit={handleReviewSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Service</Form.Label>
                  <Form.Select
                    name="serviceId"
                    value={reviewData.serviceId}
                    onChange={handleReviewChange}
                    className="profile-input"
                  >
                    <option value="">Select a service</option>
                    {servicesData.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Rating (1-5)</Form.Label>
                  <Form.Control
                    type="number"
                    name="rating"
                    value={reviewData.rating}
                    onChange={handleReviewChange}
                    min="1"
                    max="5"
                    className="profile-input"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="comment"
                    value={reviewData.comment}
                    onChange={handleReviewChange}
                    className="profile-input"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="profile-btn">
                  Submit Review
                </Button>
              </Form>
            </Card.Body>
          </Card>

          {successMessage && (
            <Alert variant="success" className="profile-alert">
              {successMessage}
            </Alert>
          )}
        </motion.div>
      </Container>
    </section>
  );
};

const servicesData = [
  { id: 1, name: 'Cleaning' },
  { id: 2, name: 'Plumbing' },
  { id: 3, name: 'Electrical' },
];

export default Profile;