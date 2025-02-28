import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: 'published' | 'draft' | 'archived';
  updatedAt: string;
  tags: { id: number; name: string }[];
  photo?: {
    id: number;
    url: string;
  };
}

interface Photo {
  id: number;
  title: string;
  url: string;
}

const Home = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch blog posts
        const blogResponse = await fetch(`${API_URL}/blog-entries`);
        const blogData = await blogResponse.json();
        
        // Filter published posts and sort by updatedAt
        const publishedPosts = blogData
          .filter((post: BlogPost) => post.status === 'published')
          .sort((a: BlogPost, b: BlogPost) => 
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )
          .slice(0, 2); // Get only the 2 most recent posts
        
        setBlogPosts(publishedPosts);

        // Fetch photos
        const photoResponse = await fetch(`${API_URL}/photos`);
        const photoData = await photoResponse.json();
        
        // Get 3 random photos
        const shuffledPhotos = photoData
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        
        setPhotos(shuffledPhotos);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Modificar la sección de blog preview para usar los datos de la API
  const renderBlogPosts = () => (
    <div className="grid md:grid-cols-2 gap-8">
      {blogPosts.map((post, index) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className="card group"
        >
          <div className="relative overflow-hidden mb-6">
            <img
              src={post.photo?.url || '/placeholder-image.jpg'}
              alt={post.title}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="space-y-4">
            <div className="flex gap-2">
              {post.tags.map(tag => (
                <span key={tag.id} className="text-sm text-stone-600">
                  {tag.name}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-serif">{post.title}</h3>
            <p className="text-stone-600">{post.content.substring(0, 120)}...</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-stone-500">{formatDate(post.updatedAt)}</span>
              <Link to={`/blog/${post.id}`} className="group flex items-center text-stone-900">
                Leer más
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );

  // Modificar la sección de galería para usar los datos de la API
  const renderPhotos = () => (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
      {photos.map((photo, index) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className="aspect-[3/4] relative group overflow-hidden"
        >
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
            <h3 className="text-white p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-serif">
              {photo.title}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  );

  // En el return, reemplazar las secciones estáticas por las dinámicas
  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-[80vh] lg:min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeIn} className="space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light leading-tight">
                Capturando momentos,<br />creando historias
              </h1>
              <p className="text-lg text-stone-600 max-w-lg">
                Fotógrafa y escritora, especializada en retratos y paisajes. 
                Transformando momentos cotidianos en obras de arte atemporales.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn">
                  <Mail className="w-5 h-5 mr-2" />
                  Contactar
                </Link>
                <Link to="/cv" className="btn-outline">
                  <Download className="w-5 h-5 mr-2" />
                  Descargar CV
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] lg:block order-first lg:order-last mb-8 lg:mb-0"
            >
              <img
                src="https://ocubucketsa.s3.sa-east-1.amazonaws.com/1740722296958-497825686.webp"
                alt="Daniela Cahui"
                className="object-cover w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif mb-2">Últimas publicaciones</h2>
              <p className="text-stone-600">Explorando ideas y compartiendo experiencias</p>
            </div>
            <Link to="/blog" className="group flex items-center text-stone-900">
              Ver todo
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
            </Link>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            renderBlogPosts()
          )}
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif mb-2">Galería destacada</h2>
              <p className="text-stone-600">Una selección de mis mejores trabajos</p>
            </div>
            <Link to="/photos" className="group flex items-center text-stone-900">
              Ver galería
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
            </Link>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            renderPhotos()
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 lg:py-20 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-serif text-xl mb-4">Daniela Cahui</h3>
              <p className="text-stone-600">
                Fotógrafa y escritora basada en Lima, Perú.
              </p>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-4">Enlaces rápidos</h4>
              <nav className="space-y-3">
                <Link to="/blog" className="block text-stone-600 hover:text-stone-900">Blog</Link>
                <Link to="/photos" className="block text-stone-600 hover:text-stone-900">Galería</Link>
                <Link to="/cv" className="block text-stone-600 hover:text-stone-900">CV</Link>
                <Link to="/contact" className="block text-stone-600 hover:text-stone-900">Contacto</Link>
              </nav>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-4">Contacto</h4>
              <div className="space-y-3 text-stone-600">
                <p>daniela@example.com</p>
                <p>+51 123 456 789</p>
                <div className="flex gap-4 pt-4">
                  <a href="#" className="text-stone-400 hover:text-stone-900 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-stone-400 hover:text-stone-900 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-stone-400 hover:text-stone-900 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-stone-200 text-center text-stone-500">
            <p>© 2024 Daniela Cahui. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;