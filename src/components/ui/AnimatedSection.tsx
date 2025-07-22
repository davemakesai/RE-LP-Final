import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'fade-in-up' | 'slide-in-left' | 'slide-in-right' | 'scale-in';
  delay?: number;
  className?: string;
  threshold?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'fade-in-up',
  delay = 0,
  className = '',
  threshold = 0.1
}) => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold });

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? `animate-${animation}` 
          : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'both'
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;