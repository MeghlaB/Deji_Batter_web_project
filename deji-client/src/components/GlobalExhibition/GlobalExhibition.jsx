import React from 'react';
import "../AutoCarosule/AutoPlay.css";

const GlobalExhibition = () => {
  const exhibitions = [
    {
      image: 'https://www.dejibattery.com/uploadfile/2024/05/11/20240511115338Qkslyd.jpg',
      text: 'CSE Exhibition',
    },
    {
      image: 'https://www.dejibattery.com/uploadfile/2023/06/16/20230616113652SC3xku.jpg',
      text: 'Hong Kong Exhibition',
    },
    {
      image: 'https://www.dejibattery.com/uploadfile/2024/01/25/20240125104729HF7Jjp.jpg',
      text: 'German Exhibition',
    },
  ];

  return (
    <div className="px-4 md:px-8 lg:px-16 py-10 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
          Global Exhibition
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto mt-2">
          We actively participate in exhibitions around the world to promote the DEJI brand. We are becoming a famous brand globally.
        </p>
      </div>

      {/* Exhibition Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {exhibitions.map((item, index) => (
          <div
            key={index}
            className="text-center cursor-pointer group transition duration-300 hover:text-green-600"
          >
            <img
              src={item.image}
              alt={item.text}
              className="mx-auto w-full h-56 object-cover rounded-lg shadow-md group-hover:scale-105 transform transition-transform duration-300"
            />
            <p className="text-xl mt-4 font-semibold">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalExhibition;
