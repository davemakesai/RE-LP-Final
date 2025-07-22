import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X, ZoomIn, ZoomOut } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import LoadingSkeleton from '../ui/LoadingSkeleton';

interface FloorPlan {
  id: string;
  label: string;
  image: string;
}

interface FloorPlansSectionProps {
  floorPlans: {
    title: string;
    plans: FloorPlan[];
  };
}

const FloorPlansSection: React.FC<FloorPlansSectionProps> = ({ floorPlans }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<FloorPlan | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());

  const itemsPerPage = window.innerWidth >= 768 ? 3 : 1;
  const totalPages = Math.ceil(floorPlans.plans.length / itemsPerPage);
  const canNavigate = floorPlans.plans.length > itemsPerPage;

  const nextSlide = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const openModal = (plan: FloorPlan) => {
    setSelectedPlan(plan);
    setZoomLevel(1);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedPlan(null);
    setZoomLevel(1);
    document.body.style.overflow = 'unset';
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const navigateModal = (direction: 'prev' | 'next') => {
    const currentPlanIndex = floorPlans.plans.findIndex(plan => plan.id === selectedPlan?.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentPlanIndex > 0 ? currentPlanIndex - 1 : floorPlans.plans.length - 1;
    } else {
      newIndex = currentPlanIndex < floorPlans.plans.length - 1 ? currentPlanIndex + 1 : 0;
    }
    
    setSelectedPlan(floorPlans.plans[newIndex]);
    setZoomLevel(1);
  };

  const handleImageLoad = (planId: string) => {
    setLoadingImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(planId);
      return newSet;
    });
  };

  const handleImageLoadStart = (planId: string) => {
    setLoadingImages(prev => new Set([...prev, planId]));
  };

  const visiblePlans = floorPlans.plans.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <>
      <section className="py-20 px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            {/* Section Header */}
            <h2 className="text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-16">
              {floorPlans.title}
            </h2>

            {/* Carousel Container */}
            <div className="relative">
            {/* Navigation Arrows */}
            {canNavigate && (
              <div className="absolute top-0 right-0 flex gap-2 z-10 -mt-2">
                <button
                  onClick={prevSlide}
                  disabled={currentIndex === 0}
                  className="p-2 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={nextSlide}
                  disabled={currentIndex === totalPages - 1}
                  className="p-2 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            )}

            {/* Floor Plans Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {visiblePlans.map((plan, index) => (
                <AnimatedSection 
                  key={plan.id}
                  animation="fade-in-up"
                  delay={index * 100}
                >
                <div
                  className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                  onClick={() => openModal(plan)}
                >
                  {/* Image Container */}
                  <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-[4/3] mb-4">
                    {loadingImages.has(plan.id) && (
                      <div className="absolute inset-0 z-10">
                        <LoadingSkeleton className="w-full h-full" />
                      </div>
                    )}
                    <img
                      src={plan.image}
                      alt={plan.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onLoadStart={() => handleImageLoadStart(plan.id)}
                      onLoad={() => handleImageLoad(plan.id)}
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white bg-opacity-90 rounded-full p-3 transform scale-75 group-hover:scale-100">
                        <Expand className="w-6 h-6 text-gray-800 group-hover:animate-pulse-gentle" />
                      </div>
                    </div>
                  </div>

                  {/* Label */}
                  <h3 className="text-lg font-semibold text-gray-900 text-center transition-colors duration-300 group-hover:text-blue-600">
                    {plan.label}
                  </h3>
                </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Pagination Dots */}
            {canNavigate && (
              <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                      index === currentIndex
                        ? 'bg-gray-800'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div> 
          </AnimatedSection>
        </div>
      </section>

      {/* Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full w-full h-full flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-xl font-semibold text-white">
                {selectedPlan.label}
              </h3>
              
              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <button
                  onClick={zoomOut}
                  className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-300 transform hover:scale-110"
                >
                  <ZoomOut className="w-5 h-5 text-white" />
                </button>
                <span className="text-white text-sm px-2">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={zoomIn}
                  className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-300 transform hover:scale-110"
                >
                  <ZoomIn className="w-5 h-5 text-white" />
                </button>

                {/* Navigation */}
                {floorPlans.plans.length > 1 && (
                  <>
                    <button
                      onClick={() => navigateModal('prev')}
                      className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-300 ml-2 transform hover:scale-110"
                    >
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <button
                      onClick={() => navigateModal('next')}
                      className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-300 transform hover:scale-110"
                    >
                      <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                  </>
                )}

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-300 ml-2 transform hover:scale-110"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Modal Image */}
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              <div 
                className="transition-transform duration-300 cursor-move"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <img
                  src={selectedPlan.image}
                  alt={selectedPlan.label}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  draggable={false}
                />
              </div>
            </div>
            </div>
        </div>
      )}
    </>
  );
};

export default FloorPlansSection;