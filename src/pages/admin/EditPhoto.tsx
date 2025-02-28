import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

interface Photo {
  id: string;
  title: string;
  description: string;
  url: string;
}

const EditPhoto = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isNewPhoto = !id;

  const [photo, setPhoto] = useState<Photo>({
    id: '',
    title: '',
    description: '',
    url: ''
  });

  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!user.isAuthenticated || !user.isAdmin) {
      navigate('/404');
      return;
    }

    if (!isNewPhoto) {
      const fetchPhoto = async () => {
        try {
          const response = await fetch(`${API_URL}/photos/${id}`);
          const data = await response.json();
          setPhoto(data);
          setPreviewUrl(data.url);
        } catch (error) {
          console.error('Error fetching photo:', error);
        }
      };

      fetchPhoto();
    }
  }, [id, isNewPhoto, navigate, user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNewPhoto) {
        const formData = new FormData();
        formData.append('title', photo.title);
        formData.append('description', photo.description);
        formData.append('visible', 'true');
        if (imageFile) {
          formData.append('image', imageFile);
        }

        await fetch(`${API_URL}/photos/upload`, {
          method: 'POST',
          body: formData,
        });
      } else {
        const updatedPhoto = {
          title: photo.title,
          description: photo.description,
          url: photo.url,
        };

        await fetch(`${API_URL}/photos/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedPhoto),
        });
      }

      navigate('/admin/photos');
    } catch (error) {
      console.error('Error saving photo:', error);
    }
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

          {!isNewPhoto && (
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
              </div>
            </div>
          )}

          {isNewPhoto && (
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Imagen
              </label>
              <label className="space-y-4 cursor-pointer">
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
                      <span className="relative cursor-pointer bg-white rounded-md font-medium text-stone-900 hover:text-stone-700">
                        Subir una imagen
                      </span>
                    </div>
                    <p className="text-xs text-stone-500">
                      PNG, JPG, GIF hasta 10MB
                    </p>
                  </div>
                </div>
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
          )}

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