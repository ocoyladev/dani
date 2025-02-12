import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  status: 'published' | 'draft';
  date: string;
  tags: string[];
}

const ManageBlog = () => {
  // Sample data - replace with actual data from your backend
  const [posts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'La luz natural en la fotografía de retrato',
      status: 'published',
      date: '15 Mar 2024',
      tags: ['Fotografía', 'Técnicas']
    },
    {
      id: '2',
      title: 'Composición en fotografía de paisajes',
      status: 'draft',
      date: '10 Mar 2024',
      tags: ['Paisajes', 'Composición']
    }
  ]);

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta entrada?')) {
      // Implement delete functionality
      console.log('Deleting post:', id);
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
                        {post.status === 'published' ? 'Publicado' : 'Borrador'}
                      </span>
                    </td>
                    <td className="py-4 px-6">{post.date}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-stone-100 text-stone-800 px-2 py-1 text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/blog/edit/${post.id}`}
                          className="p-2 text-stone-600 hover:text-stone-900"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
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