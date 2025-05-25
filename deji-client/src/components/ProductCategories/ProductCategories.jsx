import React from 'react';
import { motion } from 'framer-motion';
import {
  FaBatteryHalf, FaLaptop, FaChargingStation, FaCarBattery,
  FaBolt, FaSolarPanel, FaFan, FaPlug, FaHeadphones, FaLightbulb
} from 'react-icons/fa';

const categories = [
  { id: 1, name: 'Mobile Battery', slug: 'mobile-battery', icon: <FaBatteryHalf size={30} /> },
  { id: 2, name: 'Laptop Battery', slug: 'laptop-battery', icon: <FaLaptop size={30} /> },
  { id: 3, name: 'Power Banks', slug: 'power-banks', icon: <FaChargingStation size={30} /> },
  { id: 4, name: 'Car Battery', slug: 'car-battery', icon: <FaCarBattery size={30} /> },
  { id: 5, name: 'Rechargeable Batteries', slug: 'rechargeable-batteries', icon: <FaBolt size={30} /> },
  { id: 6, name: 'Solar Battery', slug: 'solar-battery', icon: <FaSolarPanel size={30} /> },
  { id: 7, name: 'Fan Battery', slug: 'fan-battery', icon: <FaFan size={30} /> },
  { id: 8, name: 'UPS/Inverter', slug: 'ups-inverter', icon: <FaPlug size={30} /> },
  { id: 9, name: 'Audio Devices', slug: 'audio-devices', icon: <FaHeadphones size={30} /> },
  { id: 10, name: 'LED Lights', slug: 'led-lights', icon: <FaLightbulb size={30} /> },
];

const ProductCategories = ({ onCategorySelect }) => {
  return (
    <div className="py-10 px-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6"
        style={{color:'#f8961e'}}
      >Product Categories</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl w-full">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            onClick={() => onCategorySelect(category.slug)}
            className="bg-gray-100 hover:bg-gray-200 rounded-xl p-6 text-center shadow-md cursor-pointer transform transition duration-200 hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="mb-3 flex justify-center">{category.icon}</div>
            <div className="font-semibold text-sm">{category.name}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
