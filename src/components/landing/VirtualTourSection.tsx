import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';

interface VirtualTourSectionProps {
  virtualTour: {
    title: string;
    subtitle: string;
    videoUrl: string;
  };
}

const VirtualTourSection: React.FC<VirtualTourSectionProps> = ({ virtualTour }) => {
  return (
    <section className="py-20 px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <AnimatedSection animation="slide-in-left">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {virtualTour.title}
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                {virtualTour.subtitle}
              </p>
            </div>
          </AnimatedSection>

          {/* Right Column - Video */}
          <AnimatedSection animation="slide-in-right" delay={200}>
            <div className="order-first lg:order-last">
              <div className="relative w-full aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              {virtualTour.videoUrl ? (
                <iframe
                  src={virtualTour.videoUrl}
                  title="Virtual Tour"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-500 font-medium">Embedded YouTube Video</p>
                  </div>
                </div>
              )}
            </div>
            </div>
          </AnimatedSection>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default VirtualTourSection;