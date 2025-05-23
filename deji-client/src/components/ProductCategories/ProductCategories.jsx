import React from 'react';
import { FaBatteryHalf, FaLaptop, FaChargingStation, FaCarBattery, FaBolt } from 'react-icons/fa';

const categories = [
  { id: 1, name: 'Mobile Battery', slug: 'mobile-battery', icon: <FaBatteryHalf size={30} /> },
  { id: 2, name: 'Laptop Battery', slug: 'laptop-battery', icon: <FaLaptop size={30} /> },
  { id: 3, name: 'Power Banks', slug: 'power-banks', icon: <FaChargingStation size={30} /> },
  { id: 4, name: 'Car Battery', slug: 'car-battery', icon: <FaCarBattery size={30} /> },
  { id: 5, name: 'Rechargeable Batteries', slug: 'rechargeable-batteries', icon: <FaBolt size={30} /> },
];

const ProductCategories = ({ onCategorySelect }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '20px 10px'
    }}>
      <h2 style={{ margin: '10px 0 20px' }}>Product Categories</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '20px',
        width: '100%',
        maxWidth: '900px',
        justifyItems: 'center'
      }}>
        {categories.map(category => (
          <div
            key={category.id}
            onClick={() => onCategorySelect(category.slug)}
            style={{
              backgroundColor: '#f8f9fa',
              padding: '18px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              width: '100%',
              maxWidth: '160px',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
          >
            <div style={{ marginBottom: '8px' }}>{category.icon}</div>
            <div style={{ fontWeight: '600', fontSize: '14px' }}>{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
