import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import BookingModal from './BookingModal';
import '../styles/ServiceCard.css';

const ServiceCard = ({ title, description, icon }) => {
  const [showModal, setShowModal] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAvailable((prev) => !prev);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="service-card">
          <Card.Body>
            <div className="service-icon">{icon}</div>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Badge bg={isAvailable ? 'success' : 'danger'} className="mb-2">
              {isAvailable ? 'Available' : 'Busy'}
            </Badge>
            <Button
              variant="primary"
              onClick={() => setShowModal(true)}
              disabled={!isAvailable}
            >
              Book Now
            </Button>
          </Card.Body>
        </Card>
      </motion.div>
      <BookingModal show={showModal} handleClose={() => setShowModal(false)} service={title} />
    </>
  );
};

export default ServiceCard;