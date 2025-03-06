import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { FaPhone, FaBroom, FaTint } from 'react-icons/fa'; // Added icons for new features
import '../styles/ServiceDetail.css';

const ServiceDetail = () => {
  const { id } = useParams();

  // Service data with sub-services
  const serviceData = {
    cleaning: {
      title: 'Cleaning Services',
      mainImage:"https://img.freepik.com/free-photo/professional-cleaning-service-person-using-vacuum-cleaner-office_23-2150520631.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
      subServices: [
        {
          name: 'Carpet Cleaning',
          image: "https://img.freepik.com/free-photo/close-up-vacuuming-carpet_329181-636.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
          heading: 'Deep Carpet Cleaning',
          description: "We start with a thorough detail-clean throughout your house ove flow of things between the point of origin and the point of consumption in order to meet corporations.The resources managed in logistics can include physical items such as food, materials, animals, equipment, and liquids; as well as intangible items, such as time and information. The logistics of physical items usually involves the integration of information flow, materials handling, production, packaging, inventory, transportation, warehousing, and often security.",
        },
        {
          name: 'Window Cleaning',
          image: "https://img.freepik.com/free-photo/medium-shot-people-cleaning-building_23-2150454559.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
          heading: 'Crystal Clear Windows',
          description: "Our professional window cleaning service ensures spotless, streak-free windows for homes and businesses. We use eco-friendly products and advanced techniques to remove dirt, dust, and grime, enhancing your property's appearance. Whether it's residential or commercial, our expert team guarantees crystal-clear results. Enjoy a brighter, cleaner view with our reliable and efficient service!",
        },
        {
          name: 'Deep Cleaning',
          image: "https://img.freepik.com/free-photo/professional-cleaning-service-person-using-steam-cleaner-office_23-2150520644.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
          heading: 'Thorough Deep Cleaning',
          description:"Our deep cleaning service provides a thorough and detailed cleaning for homes and businesses, targeting hidden dirt, dust, and bacteria. We focus on hard-to-reach areas, ensuring a hygienic and refreshed environment. Using high-quality cleaning products and advanced techniques, our team guarantees a spotless and sanitized space. Perfect for seasonal cleaning, move-ins, or post-renovation cleanup!",
        },
      ],
    },
    plumbing: {
      title: 'Plumbing Services',
      mainImage:"https://img.freepik.com/free-vector/colorful-plumbing-round-composition_1284-40766.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
      subServices: [
        { 
          name: 'Leak Repair',
          image: "https://img.freepik.com/free-photo/worker-repairing-water-heater_23-2149334230.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
          heading: 'Leak Repair',
          description: "Our leak repair service quickly identifies and fixes water leaks in pipes, faucets, and roofing to prevent water damage and high utility bills. Using advanced detection methods and high-quality materials, we ensure durable and efficient repairs. Whether it's a minor drip or a major leak, our expert team provides reliable solutions to keep your home safe and dry.",
        },  
        {
          name: 'Pipe Installation',
          image: "https://img.freepik.com/free-photo/man-installs-heating-system-house-checks-pipes-with-wrench_169016-55834.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
          heading: 'Pipe Installation',
          description:"Our professional pipe installation service ensures a secure and efficient plumbing system for your home or business. We use high-quality materials and expert techniques to install water, gas, and drainage pipes with precision. Whether it's a new construction or a replacement project, our skilled team guarantees leak-proof and long-lasting results.",
        },
        {
          name: 'Drain Cleaning',
          image: "https://img.freepik.com/free-photo/asian-plumber-blue-overalls-clearing-blockage-drain_1098-17773.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
          heading: 'Drain Cleaning',
          description: "Our drain cleaning service effectively removes clogs, debris, and buildup to keep your plumbing system flowing smoothly. Using advanced techniques and eco-friendly solutions, we clear blockages and prevent future drainage issues. Whether it's a slow drain or a major clog, our experts ensure a hassle-free and long-lasting solution.",
        },
      ],
    },
    other: {
      title: 'Other Services',
      mainImage: "https://img.freepik.com/premium-photo/happy-client-pays-money-laptop-repair_85574-13208.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
      subServices: [
        {
          name: 'Custom Repairs',
          image:"https://img.freepik.com/premium-photo/professional-plumber-with-water-tap-tools_106035-1719.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
          heading: 'Custom Repairs',
          description: "We offer a wide range of additional home maintenance services to keep your space in top condition. From minor repairs to specialized home improvement tasks, our experts ensure high-quality workmanship and reliable solutions. Whether you need furniture assembly, appliance installation, or general handyman services, we've got you covered with professional and efficient service.",
        },
        {
          name: 'Maintenance',
          image: "https://img.freepik.com/free-photo/side-view-woman-working-as-plumber_23-2150746370.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
          heading: 'Routine Maintenance',
          description: "Regular maintenance is essential to keep your home in excellent condition. Our professional maintenance services include routine inspections, minor repairs, and preventative measures to ensure everything functions smoothly. From HVAC servicing to electrical checkups and plumbing maintenance, we help you avoid costly repairs and maintain a safe, comfortable living environment.",
        },
        {
          name: 'Consultation',
          image: "https://img.freepik.com/premium-photo/two-men-sitting-desk-one-them-is-signing-contract_31965-136111.jpg?uid=R187650059&ga=GA1.1.982110684.1717591516&semt=ais_hybrid",
          heading: 'Expert Consultation',
          description:"Our expert consultation services help you make informed decisions for your home. Whether you need advice on renovations, repairs, or maintenance plans, our professionals provide personalized guidance tailored to your needs. We assess your requirements, suggest the best solutions, and ensure you get quality services within your budget.",
        },
      ],
    },
  };

  const service = serviceData[id] || serviceData.cleaning; // Default to cleaning if ID invalid
  const [selectedSubService, setSelectedSubService] = useState(service.subServices[0]);

  const handleSubServiceClick = (subService) => {
    setSelectedSubService(subService);
  };

  return (
    <section className="service-detail-section">
      {/* Main Image */}
      <div className="main-image-section">
        <motion.img
          src={selectedSubService.image}
          alt={selectedSubService.heading}
          className="main-service-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          key={selectedSubService.image}
        />
        <div className="image-overlay">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {service.title}
          </motion.h1>
        </div>
      </div>

      {/* Service Details */}
      <Container className="my-5">
        <Row>
          {/* Left: Sub-Services List & How Can We Help */}
          <Col md={4} sm={12} className="sub-services-col">
            <h2>Service Types</h2>
            <ul className="sub-services-list">
              {service.subServices.map((subService, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.05, color: '#00d4ff' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => handleSubServiceClick(subService)}
                  className={selectedSubService.name === subService.name ? 'active' : ''}
                >
                  {subService.name}
                </motion.li>
              ))}
            </ul>

            {/* How Can We Help */}
            <motion.div
              className="help-section"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3><FaPhone className="help-icon" /> How Can We Help?</h3>
              <p>Phone: +1 234 567 890</p>
              <p>Email: support@homeverse.com</p>
            </motion.div>
          </Col>

          {/* Right: Image, Heading, Description, Icons */}
          <Col md={8} sm={12}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              key={selectedSubService.name}
            >
              <img
                src={selectedSubService.image}
                alt={selectedSubService.heading}
                className="sub-service-image img-fluid rounded"
              />
              <h3 className="sub-service-heading">{selectedSubService.heading}</h3>
              <p className="sub-service-description">{selectedSubService.description}</p>
              <div className="service-icons">
                <div className="icon-item">
                  <FaBroom className="icon" />
                  <span>Carpet Cleaning</span>
                </div>
                <div className="icon-item">
                  <FaTint className="icon" />
                  <span>Wet Cleaning</span>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>

        {/* Team Perfection Section */}
        <Row className="team-perfection-section mt-5">
          <Col>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              How Our Team Ensures Perfection
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              Our dedicated team uses state-of-the-art equipment and eco-friendly products to deliver flawless results. With rigorous training and a commitment to excellence, we ensure every job meets the highest standards, leaving your space spotless and refreshed.
            </motion.p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ServiceDetail;