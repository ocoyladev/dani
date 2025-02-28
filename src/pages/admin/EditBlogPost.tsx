import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, X, Plus } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { formatISO, parseISO } from 'date-fns';
import { Image } from 'lucide-react';
import ImageGalleryModal from '../../components/ImageGalleryModal';

const API_URL = import.meta.env.VITE_API_URL;

interface Tag {
  id: string;
  name: string;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  photoId?: number;
  photo?: {
    id: number;
    url: string;
  };
}

const EditBlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isNewPost = !id;

  const [post, setPost] = useState<BlogPost>({
    id: id || '',
    title: '',
    content: '',
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: []
  });

  const [newTag, setNewTag] = useState('');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  useEffect(() => {
    if (!user.isAuthenticated || !user.isAdmin) {
      navigate('/404');
      return;
    }

    if (!isNewPost) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`${API_URL}/blog-entries/${id}`);
          const data = await response.json();
          setPost(data);
        } catch (error) {
          console.error('Error fetching blog post:', error);
        }
      };

      fetchPost();
    }
  }, [id, isNewPost, navigate, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdAt = formatISO(parseISO(post.createdAt));
      const updatedAt = formatISO(parseISO(post.updatedAt));
      const postId = isNewPost ? undefined : post.id;
  
      const updatedPost = {
        ...post,
        id: postId,
        createdAt,
        updatedAt,
        photoId: post.photoId // Enviar el photoId en lugar de photo
      };
  
      const method = isNewPost ? 'POST' : 'PATCH';
      const url = isNewPost ? `${API_URL}/blog-entries` : `${API_URL}/blog-entries/${id}`;
      
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });
  
      // Si es un nuevo post y tiene photoId, establecer la foto después de crear el post
      if (isNewPost && post.photoId) {
        const response = await fetch(url);
        const newPost = await response.json();
        await fetch(`${API_URL}/blog-entries/${newPost.id}/photo`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post.photoId),
        });
      }
  
      navigate('/admin/blog');
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };


  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    if (!isNaN(date.getTime())) {
      setPost({ ...post, updatedAt: formatISO(date) });
    }
  };

  const addTag = async () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !post.tags.some(tag => tag.name === trimmedTag)) {
      try {
        // Check if the tag already exists
        const response = await fetch(`${API_URL}/tags/search?name=${trimmedTag}`);
        const existingTags = await response.json();

        let tag;
        if (existingTags.length > 0) {
          tag = existingTags[0];
        } else {
          // Create a new tag if it doesn't exist
          const createResponse = await fetch(`${API_URL}/tags`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: trimmedTag }),
          });
          tag = await createResponse.json();
        }

        setPost(prevPost => ({
          ...prevPost,
          tags: [...prevPost.tags, tag]
        }));
        setNewTag('');
      } catch (error) {
        console.error('Error adding tag:', error);
      }
    }
  };

  const removeTag = (tagId: string) => {
    setPost(prevPost => ({
      ...prevPost,
      tags: prevPost.tags.filter(tag => tag.id !== tagId)
    }));
  };

  const handlePhotoSelect = async (photoId: number) => {
    try {
      if (!isNewPost) {
        // El backend espera recibir el photoId directamente, no dentro de un objeto
        await fetch(`${API_URL}/blog-entries/${post.id}/photo`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([photoId]),
        });
      }
      
      setPost(prevPost => ({
        ...prevPost,
        photoId,
        photo: { id: photoId, url: '' } // La URL se actualizará al recargar el post
      }));
  
      // Recargar los datos del post para obtener la URL actualizada
      if (!isNewPost) {
        const response = await fetch(`${API_URL}/blog-entries/${post.id}`);
        const updatedPost = await response.json();
        setPost(updatedPost);
      }
    } catch (error) {
      console.error('Error setting photo:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link to="/admin/blog" className="text-stone-600 hover:text-stone-900 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Volver a la lista
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-serif mb-8">
          {isNewPost ? 'Nueva Entrada' : 'Editar Entrada'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-stone-700">
              Título
            </label>
            <input
              type="text"
              id="title"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="mt-1 block w-full border-stone-300 rounded-none focus:ring-0 focus:border-stone-900"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-stone-700">
              Contenido
            </label>
            <textarea
              id="content"
              rows={10}
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              className="mt-1 block w-full border-stone-300 rounded-none focus:ring-0 focus:border-stone-900"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-stone-700">
                Estado
              </label>
              <select
                id="status"
                value={post.status}
                onChange={(e) => setPost({ ...post, status: e.target.value as BlogPost['status'] })}
                className="mt-1 block w-full border-stone-300 rounded-none focus:ring-0 focus:border-stone-900"
              >
                <option value="draft">Borrador</option>
                <option value="published">Publicado</option>
                <option value="archived">Archivado</option>
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-stone-700">
                Fecha
              </label>
              <input
                type="date"
                id="date"
                value={post.updatedAt.split('T')[0]}
                onChange={handleDateChange}
                className="mt-1 block w-full border-stone-300 rounded-none focus:ring-0 focus:border-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Etiquetas
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center bg-stone-100 px-3 py-1"
                >
                  {tag.name}
                  <button
                    type="button"
                    onClick={() => removeTag(tag.id)}
                    className="ml-2 text-stone-500 hover:text-stone-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Agregar etiqueta"
                className="flex-1 border-stone-300 rounded-none focus:ring-0 focus:border-stone-900"
              />
              <button
                type="button"
                onClick={addTag}
                className="btn-outline py-2"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-stone-700">
              Imagen Principal
            </label>
            <div className="flex items-center gap-4">
              {post.photo && (
                <div className="w-40 h-40">
                  <img
                    src={post.photo.url}
                    alt="Imagen principal"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => setIsGalleryOpen(true)}
                className="btn-outline flex items-center gap-2"
              >
                <Image className="w-4 h-4" />
                {post.photo ? 'Cambiar imagen' : 'Seleccionar imagen'}
              </button>
            </div>
          </div>

          <ImageGalleryModal
            isOpen={isGalleryOpen}
            onClose={() => setIsGalleryOpen(false)}
            onSelect={handlePhotoSelect}
          />

          <div className="flex justify-end gap-4">
            <Link to="/admin/blog" className="btn-outline">
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

export default EditBlogPost;