import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, X, Plus } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: 'published' | 'draft' | 'archived';
  date: string;
  tags: string[];
}

const EditBlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isNewPost = !id;

  const [post, setPost] = useState<BlogPost>({
    id: id || '',
    title: '',
    content: '',
    status: 'draft',
    date: new Date().toISOString().split('T')[0],
    tags: []
  });

  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (!user.isAuthenticated || !user.isAdmin) {
      navigate('/404');
      return;
    }

    if (!isNewPost) {
      // TODO: Fetch post data from backend
      // For now, using mock data
      setPost({
        id: '1',
        title: 'La luz natural en la fotografía de retrato',
        content: 'Contenido del post...',
        status: 'published',
        date: '2024-03-15',
        tags: ['Fotografía', 'Técnicas']
      });
    }
  }, [id, isNewPost, navigate, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement save functionality
    console.log('Saving post:', post);
    navigate('/admin/blog');
  };

  const addTag = () => {
    if (newTag.trim() && !post.tags.includes(newTag.trim())) {
      setPost({ ...post, tags: [...post.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setPost({ ...post, tags: post.tags.filter(tag => tag !== tagToRemove) });
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
                value={post.date}
                onChange={(e) => setPost({ ...post, date: e.target.value })}
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
                  key={tag}
                  className="inline-flex items-center bg-stone-100 px-3 py-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
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