import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import LoadingSkeleton from '../ui/LoadingSkeleton';
import { useStaggeredAnimation } from '../../hooks/useScrollAnimation';

interface GalleryItem {
  id: string;
  category: 'Interior' | 'Exterior';
  roomName: string;
  title: string;
  description: string;
  image: string;
}

interface GallerySectionProps {
  gallery: GalleryItem[];
}

const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [loadingImages, setLoadingImages] = React.useState<Set<string>>(new Set());
  const { containerRef, visibleItems } = useStaggeredAnimation(gallery.length, 150);

  const handleImageLoad = (itemId: string) => {
    setLoadingImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  };

  const handleImageLoadStart = (itemId: string) => {
    setLoadingImages(prev => new Set([...prev, itemId]));
  };

  return (
    <section className="py-20 px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <h2 className="text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-16">
            Image Gallery
          </h2>
        </AnimatedSection>
        
        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gallery.map((item, index) => (
            <div 
              key={item.id} 
              className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group transform ${
                visibleItems.has(index) 
                  ? 'animate-fade-in-up opacity-100' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Category Label */}
              <div className="p-4 pb-0 transform transition-all duration-300 group-hover:scale-105">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  item.category === 'Interior' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {item.category}
                </span>
              </div>

              {/* Image */}
              <div className="px-4 py-2">
                <div className="relative overflow-hidden rounded-xl">
                  {loadingImages.has(item.id) && (
                    <div className="absolute inset-0 z-10">
                      <LoadingSkeleton className="w-full h-48" />
                    </div>
                  )}
                  <img 
                    src={item.image} 
                    alt={item.roomName}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    onLoadStart={() => handleImageLoadStart(item.id)}
                    onLoad={() => handleImageLoad(item.id)}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500 flex items-center justify-center">
                    <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.roomName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 transform transition-all duration-300 group-hover:translate-y-[-2px]">
                <h3 className="text-xl font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-blue-600">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;