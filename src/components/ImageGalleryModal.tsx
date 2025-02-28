import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

interface Photo {
    id: number;
    title: string;
    url: string;
}

interface ImageGalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (photoId: number) => void;
    // onSelect: (photoId: number, photoUrl:string) => void;
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({ isOpen, onClose, onSelect }) => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch(`${API_URL}/photos`);
                const data = await response.json();
                setPhotos(data);
            } catch (error) {
                console.error('Error fetching photos:', error);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen) {
            fetchPhotos();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-serif">Seleccionar Imagen</h2>
                    <button onClick={onClose} className="p-2">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-900"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-4">
                        {photos.map((photo) => (
                            <div
                                key={photo.id}
                                className="aspect-square cursor-pointer hover:opacity-75 transition-opacity"
                                onClick={() => {
                                    // onSelect(photo.id, photo.url);
                                    onSelect(photo.id);
                                    onClose();
                                }}
                            >
                                <img
                                    src={photo.url}
                                    alt={photo.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageGalleryModal;