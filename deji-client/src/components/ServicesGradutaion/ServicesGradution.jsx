import React from 'react';
import { FaShieldAlt, FaHeadset, FaTruck, FaUndoAlt, FaClock } from 'react-icons/fa';

const services = [
  {
    id: 1,
    title: 'Product Guarantee',
    description: 'Every battery comes with a specified warranty and reliable quality assurance.',
    icon: <FaShieldAlt size={30} className="text-blue-600" />
  },
  {
    id: 2,
    title: 'Customer Service',
    description: 'Our support team is always available to help with any issues or questions.',
    icon: <FaHeadset size={30} className="text-blue-600" />
  },
  {
    id: 3,
    title: 'Fast Delivery',
    description: 'Enjoy fast and reliable delivery service across the country.',
    icon: <FaTruck size={30} className="text-blue-600" />
  },
  {
    id: 4,
    title: 'Return Policy',
    description: 'Easy and quick return process for defective or incorrect products.',
    icon: <FaUndoAlt size={30} className="text-blue-600" />
  },
  {
    id: 5,
    title: '24/7 Support',
    description: 'We’re here to assist you anytime, day or night.',
    icon: <FaClock size={30} className="text-blue-600" />
  },
];

const ServiceGuaranteeSection = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Services & Guarantee</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {services.map(service => (
            <div
              key={service.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-200"
            >
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceGuaranteeSection;
