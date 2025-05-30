import React from 'react';
import { FaShieldAlt, FaHeadset, FaTruck, FaUndoAlt, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const services = [
  {
    id: 1,
    title: 'Product Guarantee',
    description: 'Every battery comes with a specified warranty and reliable quality assurance.',
    icon: <FaShieldAlt size={30} />
  },
  {
    id: 2,
    title: 'Customer Service',
    description: 'Our support team is always available to help with any issues or questions.',
    icon: <FaHeadset size={30}  />
  },
  {
    id: 3,
    title: 'Fast Delivery',
    description: 'Enjoy fast and reliable delivery service across the country.',
    icon: <FaTruck size={30}  />
  },
  {
    id: 4,
    title: 'Return Policy',
    description: 'Easy and quick return process for defective or incorrect products.',
    icon: <FaUndoAlt size={30}  />
  },
  {
    id: 5,
    title: '24/7 Support',
    description: 'We’re here to assist you anytime, day or night.',
    icon: <FaClock size={30}/>
  },
];

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ServiceGuaranteeSection = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl font-bold mb-8 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          Our Services & Guarantee
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              transition={{ duration: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceGuaranteeSection;
