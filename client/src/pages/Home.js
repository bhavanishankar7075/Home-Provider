import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Carousel, Card } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowUp, FaBroom, FaProjectDiagram, FaSmile, FaUsers } from 'react-icons/fa'; // Replaced FaCarpet with FaBroom
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [counts, setCounts] = useState({
    carpets: 12000,
    projects: 8500,
    customers: 15000,
    staff: 250,
  });

  // Real-time counter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) => ({
        carpets: prev.carpets + Math.floor(Math.random() * 5),
        projects: prev.projects + Math.floor(Math.random() * 3),
        customers: prev.customers + Math.floor(Math.random() * 10),
        staff: prev.staff + Math.floor(Math.random() * 2),
      }));
    }, 5000); // Updates every 5 seconds
    return () => clearInterval(interval);
  }, []);

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

  

  const carouselItems = [
    {
      title: 'Let Your Home Shine',
      description: 'Transform your space with our expert cleaning services.',
      image: "https://img.freepik.com/free-photo/man-servant-cleaning-house_23-2149530805.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
    },
    {
      title: 'Professional Care',
      description: 'Top-tier solutions for all your home needs.',
      image: "https://img.freepik.com/free-photo/male-plumber-working-with-client-fix-kitchen-problems_23-2150990683.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
    },
  ];

  const services = [
    {
      id: 'cleaning',
      title: 'Cleaning Services',
      description: 'Expert cleaning for homes and businesses.',
      image: "https://img.freepik.com/free-photo/professional-cleaning-service-person-using-vacuum-cleaner-office_23-2150520631.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
    },
    {
      id: 'plumbing',
      title: 'Plumbing Services',
      description: 'Fix leaks and install pipes with precision.',
      image:"https://img.freepik.com/free-photo/man-fixing-kitchen-sink_53876-13430.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
    },
    {
      id: 'other',
      title: 'Other Services',
      description: 'Custom solutions for unique needs.',
      image: "https://img.freepik.com/premium-photo/high-angle-view-work-tools-table_1048944-17269044.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
    },
  ];

  const projects = [
    { image: "https://img.freepik.com/free-photo/professional-cleaning-service-person-using-vacuum-cleaner-office_23-2150520631.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid", alt: 'Cleaning' },
    { image: "https://img.freepik.com/free-photo/man-fixing-kitchen-sink_53876-13430.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid", alt: 'Plumbing' },
    { image: "https://img.freepik.com/premium-photo/high-angle-view-work-tools-table_1048944-17269044.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid", alt: 'Other' },
  ];

  const brands = [
    'https://cleaninco-demo.pbminfotech.com/wp-content/uploads/2018/04/Client-01.png',
    'https://cleaninco-demo.pbminfotech.com/wp-content/uploads/2018/12/Client-02.png',
    'https://cleaninco-demo.pbminfotech.com/wp-content/uploads/2018/12/Client-03.png',
    'https://cleaninco-demo.pbminfotech.com/wp-content/uploads/2018/12/Client-04.png',
    'https://cleaninco-demo.pbminfotech.com/wp-content/uploads/2018/12/Client-05.png',
  ];


  const team = [
    { name: 'John Doe', service: 'Cleaning', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
    { name: 'Jane Smith', service: 'Plumbing', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },
    { name: 'Mike Johnson', service: 'Other', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
  ];

  return (
    <section className="home-section">
      {/* Carousel */}
      <Carousel className="home-carousel">
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100" src={item.image} alt={item.title} />
            <Carousel.Caption>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <Button variant="primary" href="/services" className="read-more-btn">
                  Read More
                </Button>
              </motion.div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Our Services */}
      <Container className="my-5">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          Our Services
        </motion.h2>
        <Row>
          {services.map((service, index) => (
            <Col md={4} sm={6} xs={12} key={index}>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="service-card">
                  <Card.Img variant="top" src={service.image} />
                  <Card.Body>
                    <Card.Title>{service.title}</Card.Title>
                    <Card.Text>{service.description}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/services/${service.id}`)}
                      className="read-more-btn"
                    >
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Awarded & Certified */}
      <Container className="my-5 awarded-section">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          Awarded & Certified
        </motion.h2>
        <Row className="text-center">
          <Col md={4} sm={12}><p>ISO 9001 Certified</p></Col>
          <Col md={4} sm={12}><p>5-Year Warranty</p></Col>
          <Col md={4} sm={12}><p>Trusted by 10,000+ Clients</p></Col>
        </Row>
      </Container>

      {/* Our Projects with Counters */}
      <Container className="my-5 projects-section">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          Our Projects
        </motion.h2>
        <Row>
          {projects.map((project, index) => (
            <Col md={4} sm={6} xs={12} key={index}>
              <motion.img
                src={project.image}
                alt={project.alt}
                className="img-fluid rounded"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              />
            </Col>
          ))}
        </Row>
        <Row className="text-center mt-4 counter-row">
          <Col md={3} sm={6} xs={12}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <FaBroom size={40} className="counter-icon" /> {/* Replaced FaCarpet */}
              <h3>{counts.carpets.toLocaleString()}</h3>
              <p>Carpets Cleaned</p>
            </motion.div>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <FaProjectDiagram size={40} className="counter-icon" />
              <h3>{counts.projects.toLocaleString()}</h3>
              <p>Successful Projects</p>
            </motion.div>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <FaSmile size={40} className="counter-icon" />
              <h3>{counts.customers.toLocaleString()}</h3>
              <p>Happy Customers</p>
            </motion.div>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <FaUsers size={40} className="counter-icon" />
              <h3>{counts.staff.toLocaleString()}</h3>
              <p>Cleaning Staff</p>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Horizontal Scroll Brands */}
      <Container fluid className="my-5 brands-section">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          Trusted Partners
        </motion.h2>
        <div className="brands-container">
          <motion.div
            className="brands-scroll"
            animate={{ x: ['0%', '-100%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            {brands.concat(brands).map((brand, index) => (
              <motion.img
                key={index}
                src={brand}
                alt={`Brand ${index + 1}`}
                className="brand-logo"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Why Choose Us */}
      <Container className="my-5 why-choose-us-section">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          Why Choose Us
        </motion.h2>
        <Row>
          <Col md={6} sm={12}>
            <motion.img
              src="https://cleaningbusinesstoday.com/wp-content/uploads/2020/10/AdobeStock_264290122-scaled.jpeg"
              alt="Why Choose Us"
              className="img-fluid rounded"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            />
          </Col>
          <Col md={6} sm={12}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h3>Your Trusted Partner</h3>
              <p>We deliver exceptional home services with a focus on quality and reliability.</p>
              <ul>
                <li>Experienced Professionals</li>
                <li>Eco-Friendly Solutions</li>
                <li>24/7 Availability</li>
                <li>Customer Satisfaction Guaranteed</li>
              </ul>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Our Team */}
      <Container className="my-5 team-section ">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center pb-4"
        >
          Our Team
        </motion.h2>
        <Row>
          {team.map((member, index) => (
            <Col md={4} sm={6} xs={12} key={index}>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="team-card">
{/*                   <Card.Img variant="top" src={member.image} />
 */}                  <Card.Body>
                    <Card.Title>{member.name}</Card.Title>
                    <Card.Text>{member.service}</Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
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

export default Home;