import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
  width?: string;
  height?: string;
  lines?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width = 'w-full',
  height = 'h-4',
  lines = 1
}) => {
  const baseClasses = 'bg-gray-200 relative overflow-hidden';
  
  const variantClasses = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded'
  };

  const shimmerClasses = 'absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-60 animate-shimmer';

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${variantClasses[variant]} ${width} ${height}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={shimmerClasses} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${width} ${height} ${className}`}>
      <div className={shimmerClasses} />
    </div>
  );
};

export default LoadingSkeleton;