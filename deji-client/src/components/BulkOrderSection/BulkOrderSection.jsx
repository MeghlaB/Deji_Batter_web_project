import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BulkOrderSection = () => {
  return (
    <section className=" py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.4 }} // Replay on scroll
        >
          {/* Left: Image with floating effect */}
          <motion.div
            className="flex justify-center md:justify-start"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false, amount: 0.4 }}
            animate={{
              y: [0, -10, 0], // subtle up and down
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgeTjEJiuOfsTn7KAu5XHs1gsuILlbpz-RVg&s"
              alt="Bulk Order"
              className="w-full max-w-sm rounded-xl"
            />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: false, amount: 0.4 }}
          >
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-6 py-3 bg-[#f8961e] text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Bulk Orders
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BulkOrderSection;
