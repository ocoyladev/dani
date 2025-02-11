import React from 'react';
import { motion } from 'framer-motion';

const Photos = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Galería</h1>
        <p className="text-xl text-gray-600">
          Una colección de mis mejores trabajos fotográficos
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="relative group"
          >
            <img
              src={`https://images.unsplash.com/photo-${i}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`}
              alt={`Fotografía ${i}`}
              className="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 rounded-lg flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 text-white text-center p-4 transition-opacity duration-300">
                <h3 className="text-xl font-semibold">Título de la foto</h3>
                <p className="mt-2">Descripción breve</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Photos;