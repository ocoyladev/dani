import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Camera, Pen, Download, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const blogPosts = [
    {
      id: 1,
      title: 'La luz natural en la fotografía de retrato',
      excerpt: 'Explorando las técnicas para aprovechar la luz natural y crear retratos impactantes...',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
      date: '15 Mar 2024',
      tags: ['Fotografía', 'Técnicas']
    },
    {
      id: 2,
      title: 'Composición en fotografía de paisajes',
      excerpt: 'Principios fundamentales para crear fotografías de paisajes memorables...',
      image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
      date: '10 Mar 2024',
      tags: ['Paisajes', 'Composición']
    }
  ];

  const photos = [
    {
      id: 1,
      title: 'Atardecer en la montaña',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'
    },
    {
      id: 2,
      title: 'Retrato en blanco y negro',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'
    },
    {
      id: 3,
      title: 'Arquitectura urbana',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeIn} className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-serif font-light leading-tight">
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
            className="relative aspect-[4/5] hidden lg:block"
          >
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              alt="Daniela Cahui"
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif mb-2">Últimas publicaciones</h2>
              <p className="text-stone-600">Explorando ideas y compartiendo experiencias</p>
            </div>
            <Link to="/blog" className="group flex items-center text-stone-900">
              Ver todo
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover mb-6"
                />
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-sm text-stone-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-serif">{post.title}</h3>
                  <p className="text-stone-600">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-stone-500">{post.date}</span>
                    <Link to={`/blog/${post.id}`} className="group flex items-center text-stone-900">
                      Leer más
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif mb-2">Galería destacada</h2>
              <p className="text-stone-600">Una selección de mis mejores trabajos</p>
            </div>
            <Link to="/photos" className="group flex items-center text-stone-900">
              Ver galería
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="aspect-[3/4] relative group overflow-hidden"
              >
                <img
                  src={photo.image}
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
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
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
                  <a href="#" className="text-stone-400 hover:text-stone-900">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-stone-400 hover:text-stone-900">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-stone-400 hover:text-stone-900">
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