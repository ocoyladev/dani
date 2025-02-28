import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';


const API_URL = import.meta.env.VITE_API_URL;

interface Photo {
  id: string;
  title: string;
  description: string;
  url: string;
}

const ManagePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(`${API_URL}/photos`);
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta fotografía?')) {
      try {
        await fetch(`${API_URL}/photos/${id}`, {
          method: 'DELETE',
        });
        setPhotos(photos.filter(photo => photo.id !== id));
      } catch (error) {
        console.error('Error deleting photo:', error);
      }
    }
  };

  const handleEdit = (photo: Photo) => {
    navigate(`/admin/photos/edit/${photo.id}`, { state: { photo } });
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
                <p className="text-stone-600 text-sm mb-4">{photo.description}</p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(photo)}
                    className="p-2 text-stone-600 hover:text-stone-900"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
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