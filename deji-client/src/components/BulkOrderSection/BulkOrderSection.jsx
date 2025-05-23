import React from 'react';

const BulkOrderSection = () => {
  return (
    <section className="bg-gray-100 container mt-5 mx-auto py-6 px-4 text-center rounded-xl shadow-md">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Bulk Orders & Business Solutions</h2>
      <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-4">
        Get special pricing, priority delivery, and dedicated support for wholesale or business battery orders. 
        Whether you're a retailer, repair shop, or corporate client — we've got tailored solutions for you.
      </p>
      <button
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-full transition duration-300"
        onClick={() => window.location.href = '/bulk-orders'}
      >
        Bulk Order Now
      </button>
    </section>
  );
};

export default BulkOrderSection;
