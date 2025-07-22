import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';

interface HeroSectionProps {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({ hero }) => {
  return (
    <section 
      className="relative h-screen flex items-center justify-between px-8 lg:px-16"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${hero.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Left Content */}
      <AnimatedSection animation="slide-in-left" className="flex-1 max-w-2xl">
        <AnimatedSection animation="fade-in-down" delay={200}>
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {hero.title}
          </h1>
        </AnimatedSection>
        <AnimatedSection animation="fade-in-up" delay={400}>
          <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed">
            {hero.subtitle}
          </p>
        </AnimatedSection>
      </AnimatedSection>

      {/* Right Placeholder Area */}

    </section>
  );
};

export default HeroSection;