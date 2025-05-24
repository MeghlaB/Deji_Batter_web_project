import React from 'react';
import { FaBatteryHalf, FaLaptop, FaChargingStation, FaCarBattery, FaBolt, FaSolarPanel, FaFan, FaPlug, FaHeadphones, FaLightbulb } from 'react-icons/fa';

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
      <h2 className="text-2xl font-bold mb-6">Product Categories</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl w-full">
        {categories.map(category => (
          <div
            key={category.id}
            onClick={() => onCategorySelect(category.slug)}
            className="bg-gray-100 hover:bg-gray-200 rounded-xl p-6 text-center shadow-md cursor-pointer transform transition duration-200 hover:scale-105"
          >
            <div className="mb-3 flex justify-center ">{category.icon}</div>
            <div className="font-semibold text-sm">{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
