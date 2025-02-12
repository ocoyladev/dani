import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ImagePlus, PenSquare } from 'lucide-react';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated or not admin
  React.useEffect(() => {
    if (!user.isAuthenticated || !user.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user.isAuthenticated || !user.isAdmin) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Panel de Administración</h1>
        <p className="text-xl text-gray-600">
          Gestiona el contenido de tu sitio web
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 border border-stone-200"
        >
          <div className="flex items-center mb-4">
            <PenSquare className="w-8 h-8 text-stone-900 mr-3" />
            <h2 className="text-2xl font-semibold font-serif">Blog</h2>
          </div>
          <p className="text-stone-600 mb-6">
            Administra las entradas de tu blog, crea nuevo contenido y edita las publicaciones existentes.
          </p>
          <Link 
            to="/admin/blog"
            className="w-full btn inline-flex justify-center"
          >
            Gestionar Blog
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-6 border border-stone-200"
        >
          <div className="flex items-center mb-4">
            <ImagePlus className="w-8 h-8 text-stone-900 mr-3" />
            <h2 className="text-2xl font-semibold font-serif">Fotografías</h2>
          </div>
          <p className="text-stone-600 mb-6">
            Sube nuevas fotografías, organiza tu galería y actualiza las descripciones.
          </p>
          <Link 
            to="/admin/photos"
            className="w-full btn inline-flex justify-center"
          >
            Gestionar Fotografías
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;