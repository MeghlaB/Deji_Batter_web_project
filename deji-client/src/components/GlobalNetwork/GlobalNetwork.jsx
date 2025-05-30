import React from "react";

const GlobalNetworkSection = () => {
  return (
    <div className="px-4 md:px-12 py-10 text-center">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        GLOBAL NETWORK & SERVICE
      </h1>

      {/* Description */}
      <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-base leading-relaxed">
        DEJI has built a strong global presence with trusted agents and distributors across key markets. 
        We proudly serve regions including Turkey, Russia, Brazil, and many others around the world.
      </p>

      {/* World Map Image */}
      <div className="mt-10">
        <img
          src="https://www.dejibattery.com/uploadfile/2024/01/24/20240124134226gatq08.jpg"
          alt="World Map"
          className="rounded-lg w-full object-cover max-h-[800px] mx-auto"
        />
      </div>
    </div>
  );
};

export default GlobalNetworkSection;
