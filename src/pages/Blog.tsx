import React from 'react';
import { motion } from 'framer-motion';

const Blog = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-xl text-gray-600">
          Compartiendo mis pensamientos y experiencias sobre fotografía y arte
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder for blog posts */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Fotografía"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                Fotografía
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-2">El arte de la fotografía de retrato</h2>
            <p className="text-gray-600 mb-4">
              Explorando las técnicas y secretos detrás de los retratos memorables...
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">15 Mar 2024</span>
              <button className="text-indigo-600 hover:text-indigo-800">
                Leer más →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;