import React from 'react';
import { Link } from 'react-router-dom';

const BulkOrderSection = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Left: Image */}
          <div className="flex justify-center md:justify-start">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgeTjEJiuOfsTn7KAu5XHs1gsuILlbpz-RVg&s"
              alt="Bulk Order"
              className="w-full max-w-sm rounded-xl"
            />
          </div>

          {/* Right: Content */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-4 leading-snug">
              Bulk Orders & Business Solutions
            </h2>

            <p className="text-gray-600 text-base mb-4 leading-relaxed">
              Get special pricing, priority delivery, and dedicated support for wholesale or business battery orders.
            </p>
            <p className="text-gray-600 text-base mb-6 leading-relaxed">
              Whether you're a retailer, repair shop, or corporate client — we've got tailored solutions designed to power your business.
            </p>

          <Link to={'/b2b'}>
              <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
             Bluk Orders
            </button>
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BulkOrderSection;
