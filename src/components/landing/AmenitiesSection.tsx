import React from 'react';
import * as LucideIcons from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';

interface Amenity {
  id: string;
  name: string;
  icon: string;
}

interface AmenitiesSectionProps {
  amenities: {
    title: string;
    topRow: Amenity[];
    bottomRow: Amenity[];
  };
}

const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ amenities }) => {
  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? IconComponent : LucideIcons.Home;
  };

  const renderAmenityRow = (amenityList: Amenity[], direction: 'left' | 'right') => {
    // Duplicate the amenities to create seamless loop
    const duplicatedAmenities = [...amenityList, ...amenityList, ...amenityList];
    
    return (
      <div className="relative overflow-hidden">
        <div 
          className={`flex gap-12 lg:gap-16 ${
            direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'
          }`}
          style={{
            width: `${duplicatedAmenities.length * 200}px`,
          }}
        >
          {duplicatedAmenities.map((amenity, index) => {
            const IconComponent = getIcon(amenity.icon);
            return (
              <div 
                key={`${amenity.id}-${index}`}
                className="flex flex-col items-center justify-center min-w-[160px] lg:min-w-[180px]"
              >
                {/* Icon Circle */}
                <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors duration-300">
                  <IconComponent className="w-8 h-8 lg:w-10 lg:h-10 text-gray-700" />
                </div>
                
                {/* Amenity Name */}
                <p className="text-sm lg:text-base font-medium text-gray-800 text-center leading-tight max-w-[140px] lg:max-w-[160px]">
                  {amenity.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 lg:py-20 px-8 lg:px-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          {/* Section Title */}
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12 lg:mb-16">
            {amenities.title}
          </h2>

          {/* Amenities Rows */}
          <div className="space-y-12 lg:space-y-16">
            {/* Top Row - Scrolling Left to Right */}
            <AnimatedSection animation="slide-in-left" delay={200}>
              <div className="group">
                {renderAmenityRow(amenities.topRow, 'left')}
              </div>
            </AnimatedSection>

            {/* Bottom Row - Scrolling Right to Left */}
            <AnimatedSection animation="slide-in-right" delay={400}>
              <div className="group">
                {renderAmenityRow(amenities.bottomRow, 'right')}
              </div>
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default AmenitiesSection;