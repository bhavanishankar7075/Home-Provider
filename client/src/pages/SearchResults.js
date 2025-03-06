import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowUp, FaBroom, FaTint, FaSoap, FaWrench, FaTools, FaCogs } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import '../styles/SearchResults.css';

// Simulated service data including Cleaning, Plumbing, and Other Services
const allServices = [
  // Cleaning Services
  {
    id: 'carpet-cleaning',
    title: 'Carpet Cleaning',
    description: 'Deep cleaning to remove stains and dirt from your carpets.',
    image: "https://img.freepik.com/free-photo/close-up-vacuuming-carpet_329181-636.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
    icon: <FaBroom />,
    date: '15 Mar 2025',
    path: '/services/cleaning',
    category: 'cleaning',
  },
  {
    id: 'window-cleaning',
    title: 'Window Cleaning',
    description: 'Crystal clear windows with our professional service.',
    image:"https://img.freepik.com/free-photo/medium-shot-people-cleaning-building_23-2150454559.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
    icon: <FaTint />,
    date: '20 Feb 2025',
    path: '/services/cleaning',
    category: 'cleaning',
  },
  {
    id: 'deep-cleaning',
    title: 'Deep Cleaning',
    description: 'Thorough cleaning for every corner of your space.',
    image:"https://img.freepik.com/free-photo/professional-cleaning-service-person-using-steam-cleaner-office_23-2150520644.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
    icon: <FaSoap />,
    date: '10 Jan 2025',
    path: '/services/cleaning',
    category: 'cleaning',
  },
  // Plumbing Services
  {
    id: 'leak-repair',
    title: 'Leak Repair',
    description: 'Fast and reliable leak fixing to prevent water loss.',
    image:"https://img.freepik.com/free-photo/worker-repairing-water-heater_23-2149334230.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
    icon: <FaWrench />,
    date: '25 Feb 2025',
    path: '/services/plumbing',
    category: 'plumbing',
  },
  {
    id: 'pipe-installation',
    title: 'Pipe Installation',
    description: 'Professional installation of pipes for your plumbing needs.',
    image:"https://img.freepik.com/free-photo/man-installs-heating-system-house-checks-pipes-with-wrench_169016-55834.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
    icon: <FaTools />,
    date: '18 Jan 2025',
    path: '/services/plumbing',
    category: 'plumbing',
  },
  {
    id: 'drain-cleaning',
    title: 'Drain Cleaning',
    description: 'Clear blockages and maintain smooth drainage.',
    image:"https://img.freepik.com/free-photo/asian-plumber-blue-overalls-clearing-blockage-drain_1098-17773.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
    icon: <FaCogs />,
    date: '05 Mar 2025',
    path: '/services/plumbing',
    category: 'plumbing',
  },
  // Other Services
  {
    id: 'custom-repairs',
    title: 'Custom Repairs',
    description: 'Tailored repair solutions for unique needs.',
    image:"https://img.freepik.com/premium-photo/professional-plumber-with-water-tap-tools_106035-1719.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
    icon: <FaTools />,
    date: '12 Feb 2025',
    path: '/services/other',
    category: 'other',
  },
  {
    id: 'maintenance',
    title: 'Routine Maintenance',
    description: 'Keep your systems running smoothly with regular care.',
    image: "https://img.freepik.com/free-photo/side-view-woman-working-as-plumber_23-2150746370.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
    icon: <FaCogs />,
    date: '28 Jan 2025',
    path: '/services/other',
    category: 'other',
  },
  {
    id: 'consultation',
    title: 'Expert Consultation',
    description: 'Get professional advice for your home service projects.',
    image:"https://img.freepik.com/premium-photo/two-men-sitting-desk-one-them-is-signing-contract_31965-136111.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
    icon: <FaWrench />,
    date: '03 Mar 2025',
    path: '/services/other',
    category: 'other',
  },
];

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const query = new URLSearchParams(location.search).get('q')?.toLowerCase() || '';
  const [results, setResults] = useState([]);
  const [counts, setCounts] = useState({
    posts: 0,
    pages: 0,
    products: 0,
    projects: 0,
    services: 0,
    team: 0,
  });

  // Simulate search results
  useEffect(() => {
    const filtered = allServices.filter((service) =>
      service.title.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      service.category.toLowerCase().includes(query) // Added category to search
    );
    setResults(filtered);
    setCounts({
      posts: Math.floor(Math.random() * 10),
      pages: Math.floor(Math.random() * 5),
      products: Math.floor(Math.random() * 15),
      projects: Math.floor(Math.random() * 20),
      services: filtered.length,
      team: Math.floor(Math.random() * 8),
    });
  }, [query]);

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

  return (
    <section className="search-results-section">
      {/* SEO Metadata */}
      <Helmet>
        <title>HomeVerse - Search Results for "{query}"</title>
        <meta
          name="description"
          content={`Search results for "${query}" on HomeVerse. Find cleaning, plumbing, and other home services.`}
        />
        <meta
          name="keywords"
          content={`search HomeVerse, ${query}, cleaning services, plumbing services, home services`}
        />
      </Helmet>

      {/* Search Image */}
      <header className="search-image-section">
        <motion.img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
          alt={`Search Results for ${query}`}
          className="search-main-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="image-overlay">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Search Results for "{query}"
          </motion.h1>
        </div>
      </header>

      {/* Counts Section */}
      <Container className="my-5 counts-section">
        <Row className="text-center">
          <Col md={2} sm={4} xs={6}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <h3>{counts.posts}</h3>
              <p>Posts</p>
            </motion.div>
          </Col>
          <Col md={2} sm={4} xs={6}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <h3>{counts.pages}</h3>
              <p>Pages</p>
            </motion.div>
          </Col>
          <Col md={2} sm={4} xs={6}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <h3>{counts.products}</h3>
              <p>Products</p>
            </motion.div>
          </Col>
          <Col md={2} sm={4} xs={6}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <h3>{counts.projects}</h3>
              <p>Projects</p>
            </motion.div>
          </Col>
          <Col md={2} sm={4} xs={6}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <h3>{counts.services}</h3>
              <p>Services</p>
            </motion.div>
          </Col>
          <Col md={2} sm={4} xs={6}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
              <h3>{counts.team}</h3>
              <p>Team</p>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Results Section */}
      <Container className="my-5 results-section">
        {results.length > 0 ? (
          results.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="result-card"
            >
              <div className="result-image-container">
                <img src={result.image} alt={result.title} className="result-image" />
                <div className="date-overlay">{result.date}</div>
              </div>
              <div className="result-content">
                <h2>{result.title}</h2>
                <p>{result.description}</p>
                <Button
                  variant="primary"
                  onClick={() => navigate(result.path)}
                  className="read-more-btn"
                >
                  Read More
                </Button>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="no-results"
          >
            <h2>No Results Found</h2>
            <p>Try searching for something else.</p>
          </motion.div>
        )}
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

export default SearchResults;