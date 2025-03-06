import React, { useState } from 'react';
import { Container, Row, Col, Nav, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTelegramPlane } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  }; 

  return (
    <footer className="footer-section">
      <Container>
        <Row>
          <Col md={4} sm={12} className="footer-col">
            <h4>Explore Your Company</h4>
            <Nav className="flex-column">
              <Nav.Link onClick={() => handleNavigation('/contact')} className="footer-link">
                About Us
              </Nav.Link>
              <Nav.Link onClick={() => handleNavigation('/services')} className="footer-link">
                Customer Services
              </Nav.Link>
              <Nav.Link onClick={() => handleNavigation('/contact')} className="footer-link">
                Support
              </Nav.Link>
              <Nav.Link onClick={() => setShowTerms(true)} className="footer-link">
                Terms & Conditions
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={4} sm={12} className="footer-col">
            <h4>Connect With Us</h4>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaInstagram />
              </a>
              <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaTelegramPlane />
              </a>
            </div>
          </Col>
          <Col md={4} sm={12} className="footer-col">
            <h4>Contact</h4>
            <p>Mail to: chakriroy926@gmail.com</p>
            <p>Phone: +91 8187826411</p>
            <p>Address: 9-11-1/3 pm palem,vizag</p>
          </Col>
        </Row>
        <Row className="footer-bottom">
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} HomeVerse. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>

      {/* Terms & Conditions Modal */}
      <Modal show={showTerms} onHide={() => setShowTerms(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Terms & Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Welcome to HomeVerse! Please read these terms and conditions carefully before using our services.</p>
          <ul>
            <li>You must be at least 18 years old to use our services.</li>
            <li>All content provided on this website is for informational purposes only.</li>
            <li>We reserve the right to update our terms and conditions at any time.</li>
            <li>Your personal data will be handled according to our Privacy Policy.</li>
          </ul>
          <p>By using our website, you agree to comply with these terms.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTerms(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </footer>
  );
};

export default Footer;