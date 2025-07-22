import React from 'react';
import HeroSection from './HeroSection';
import BrochureDownload from './BrochureDownload';
import FloorPlansSection from './FloorPlansSection';
import GallerySection from './GallerySection';
import AmenitiesSection from './AmenitiesSection';
import VirtualTourSection from './VirtualTourSection';
import ContactFormSection from './ContactFormSection';
import FooterSection from './FooterSection';
import WhatsAppButton from './WhatsAppButton';
import { PropertyData } from '../../App';

interface LandingPageProps {
  propertyData: PropertyData;
}

const LandingPage: React.FC<LandingPageProps> = ({ propertyData }) => {
  return (
    <div className="min-h-screen relative">
      <HeroSection hero={propertyData.hero} />
      <ContactFormSection contactForm={propertyData.contactForm} />
      <FloorPlansSection floorPlans={propertyData.floorPlans} />
      <AmenitiesSection amenities={propertyData.amenities} />
      <GallerySection gallery={propertyData.gallery} />
      <VirtualTourSection virtualTour={propertyData.virtualTour} />
      <BrochureDownload brochureDownload={propertyData.brochureDownload} />
      <FooterSection contact={propertyData.contact} />
      <WhatsAppButton whatsappNumber={propertyData.contact.whatsappNumber} />
    </div>
  );
};

export default LandingPage;