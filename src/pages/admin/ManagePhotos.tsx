import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Photo {
  id: string;
  title: string;
  url: string;
  date: string;
}

const ManagePhotos = () => {
  // Sample data - replace with actual data from your backend
  const [photos] = useState<Photo[]>([
    {
      id: '1',
      title: 'Atardecer en la montaña',
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      date: '15 Mar 2024'
    },
    {
      id: '2',
      title: 'Retrato en blanco y negro',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      date: '10 Mar 2024'
    }
  ]);

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta fotografía?')) {
      // Implement delete functionality
      console.log('Deleting photo:', id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link to="/admin" className="text-stone-600 hover:text-stone-900 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Volver al panel
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-serif">Gestionar Fotografías</h1>
          <Link
            to="/admin/photos/new"
            className="btn flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nueva Fotografía
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white border border-stone-200 group"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg mb-2">{photo.title}</h3>
                <p className="text-stone-600 text-sm mb-4">{photo.date}</p>
                <div className="flex justify-end gap-2">
                  <Link
                    to={`/admin/photos/edit/${photo.id}`}
                    className="p-2 text-stone-600 hover:text-stone-900"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="p-2 text-stone-600 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ManagePhotos;