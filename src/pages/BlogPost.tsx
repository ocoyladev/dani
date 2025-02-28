import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

interface BlogPost {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    photo?: {
        id: number;
        url: string;
    };
}

const BlogPost = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${API_URL}/blog-entries/${id}`);
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-gray-600">Post no encontrado</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Header con botón de volver */}
            {/* <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                onClick={() => navigate(-1)}
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver</span>
            </motion.button> */}

            {/* Layout responsive */}
            <div className="flex flex-col lg:flex-row">
                {/* Bloque de título e imagen */}
                {/* <div className="w-full lg:w-1/2 lg:fixed lg:left-0 lg:h-[90vh] p-4 lg:p-8 lg:overflow-y-auto"> */}
                <div className="w-full lg:w-1/2 lg:fixed lg:left-0 lg:h-full p-4 lg:p-8 lg:overflow-y-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8 mt-16 lg:mt-8"
                    >
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                            {post?.title}
                        </h1>
                        {/* <div className="aspect-[4/3] w-full"> */}
                        <div className="w-full">
                            <img
                                src={post?.photo?.url || '/placeholder-image.jpg'}
                                alt={post?.title}
                                // className="rounded-lg shadow-xl w-full h-[50vh] lg:h-[80vh] object-cover"
                                className="rounded-lg shadow-xl w-full h-[50vh] lg:h-[70vh] object-cover"

                            />
                        </div>
                    </motion.div>
                </div>

                {/* Contenido scrolleable */}
                <div className="w-full lg:w-1/2 lg:ml-[50%] min-h-screen">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 lg:p-8"
                    >
                        <div className="prose prose-lg max-w-none">
                            {post?.content.split('\n').map((paragraph, index) => (
                                <p key={index} className="mb-4 text-gray-700">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Botón de volver para mobile */}
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            // className="mt-12 flex lg:hidden items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors mx-auto"
                            className="mt-12 flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors mx-auto"

                            onClick={() => navigate(-1)}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Volver</span>
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;