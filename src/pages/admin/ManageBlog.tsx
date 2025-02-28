import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

interface Tag {
  id: string;
  name: string;
}

interface BlogPost {
  id: string;
  title: string;
  status: string;
  updatedAt: string;
  tags: Tag[];
}

const ManageBlog = () => {
  

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/blog-entries`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta entrada?')) {
      try {
        await fetch(`${API_URL}/blog-entries/${id}`, {
          method: 'DELETE',
        });
        setPosts(posts.filter(post => post.id !== id));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleEdit = async (id: string) => {
    navigate(`/admin/blog/edit/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }


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
          <h1 className="text-4xl font-serif">Gestionar Blog</h1>
          <Link
            to="/admin/blog/new"
            className="btn flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nueva Entrada
          </Link>
        </div>

        <div className="bg-white border border-stone-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-200">
                  <th className="text-left py-4 px-6 font-serif">Título</th>
                  <th className="text-left py-4 px-6 font-serif">Estado</th>
                  <th className="text-left py-4 px-6 font-serif">Fecha</th>
                  <th className="text-left py-4 px-6 font-serif">Etiquetas</th>
                  <th className="text-right py-4 px-6 font-serif">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-stone-200">
                    <td className="py-4 px-6">{post.title}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-3 py-1 text-sm ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>                       
                        {post.status === 'published' ? 'Publicado' : (post.status === 'draft' ? 'Borrador':'Archivado')}
                      </span>
                    </td>
                    <td className="py-4 px-6">{post.updatedAt.split('T')[0]}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag.id}
                            className="bg-stone-100 text-stone-800 px-2 py-1 text-sm"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(post.id)}
                          className="p-2 text-stone-600 hover:text-stone-900"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-2 text-stone-600 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageBlog;