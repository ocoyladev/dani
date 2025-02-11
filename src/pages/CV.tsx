import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const CV = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Curriculum Vitae</h1>
        <p className="text-xl text-gray-600">
          Mi trayectoria profesional y experiencia
        </p>
      </motion.div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-end mb-8">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Download className="w-5 h-5" />
            Descargar CV
          </button>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Experiencia</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Fotógrafa Freelance</h3>
                <p className="text-gray-600">2020 - Presente</p>
                <ul className="mt-2 list-disc list-inside text-gray-700">
                  <li>Especialización en fotografía de retrato y eventos</li>
                  <li>Más de 100 sesiones fotográficas realizadas</li>
                  <li>Edición y post-producción profesional</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Educación</h2>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Licenciatura en Fotografía</h3>
              <p className="text-gray-600">Universidad de Artes, 2016-2020</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Habilidades</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Técnicas</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Fotografía digital y analógica</li>
                  <li>Adobe Lightroom y Photoshop</li>
                  <li>Iluminación de estudio</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Personales</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Creatividad</li>
                  <li>Atención al detalle</li>
                  <li>Comunicación efectiva</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CV;