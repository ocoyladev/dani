import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface Photo {
  id: string;
  title: string;
  description: string;
  url: string;
}

const EditPhoto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isNewPhoto = !id;

  const [photo, setPhoto] = useState<Photo>({
    id: id || '',
    title: '',
    description: '',
    url: ''
  });

  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (!user.isAuthenticated || !user.isAdmin) {
      navigate('/404');
      return;
    }

    if (!isNewPhoto) {
      // TODO: Fetch photo data from backend
      // For now, using mock data
      const mockPhoto = {
        id: '1',
        title: 'Atardecer en la montaña',
        description: 'Una hermosa vista del atardecer desde la cima de la montaña.',
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'
      };
      setPhoto(mockPhoto);
      setPreviewUrl(mockPhoto.url);
    }
  }, [id, isNewPhoto, navigate, user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement save functionality
    console.log('Saving photo:', photo);
    navigate('/admin/photos');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link to="/admin/photos" className="text-stone-600 hover:text-stone-900 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Volver a la galería
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-serif mb-8">
          {isNewPhoto ? 'Nueva Fotografía' : 'Editar Fotografía'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-stone-700">
              Título
            </label>
            <input
              type="text"
              id="title"
              value={photo.title}
              onChange={(e) => setPhoto({ ...photo, title: e.target.value })}
              className="mt-1 block w-full border-stone-300 rounded-none focus:ring-0 focus:border-stone-900"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-stone-700">
              Descripción
            </label>
            <textarea
              id="description"
              rows={4}
              value={photo.description}
              onChange={(e) => setPhoto({ ...photo, description: e.target.value })}
              className="mt-1 block w-full border-stone-300 rounded-none focus:ring-0 focus:border-stone-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Imagen
            </label>
            <div className="space-y-4">
              {previewUrl && (
                <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-stone-300 border-dashed">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-stone-400" />
                  <div className="flex text-sm text-stone-600">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-stone-900 hover:text-stone-700"
                    >
                      <span>Subir una imagen</span>
                      <input
                        id="image-upload"
                        name="image-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-stone-500">
                    PNG, JPG, GIF hasta 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link to="/admin/photos" className="btn-outline">
              Cancelar
            </Link>
            <button type="submit" className="btn">
              Guardar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditPhoto;