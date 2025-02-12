import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-9xl font-serif font-light text-stone-900 mb-4">404</h1>
        <p className="text-xl text-stone-600 mb-8">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Link to="/" className="btn inline-flex items-center gap-2">
          <Home className="w-4 h-4" />
          Volver al inicio
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;