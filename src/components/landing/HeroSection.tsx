import React from 'react';
import { Phone } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';

interface HeroSectionProps {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    phoneNumber: string;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({ hero }) => {
  const formatPhoneForTel = (phone: string): string => {
    return phone.replace(/\D/g, '');
  };

  const formatPhoneDisplay = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    return phone;
  };

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
        
        {/* Call Now CTA Button */}
        {hero.phoneNumber && (
          <AnimatedSection animation="fade-in-up" delay={600}>
            <div className="mt-8">
              <a
                href={`tel:+91${formatPhoneForTel(hero.phoneNumber)}`}
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
                aria-label={`Call ${formatPhoneDisplay(hero.phoneNumber)}`}
              >
                <Phone className="w-5 h-5 group-hover:animate-bounce-gentle transition-transform duration-300" />
                <span className="text-lg">Call Now</span>
                <span className="hidden sm:inline text-blue-100 ml-2">
                  {formatPhoneDisplay(hero.phoneNumber)}
                </span>
              </a>
            </div>
          </AnimatedSection>
        )}
      </AnimatedSection>

      {/* Right Placeholder Area */}

    </section>
  );
};

export default HeroSection;