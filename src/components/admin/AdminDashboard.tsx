import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingSkeleton from '../ui/LoadingSkeleton';

import { Save, Eye, LogOut, Home, Image, FileText, Star, Monitor, Mail, Phone } from 'lucide-react';
import { PropertyData } from '../../App';
import HeroEditor from './sections/HeroEditor';
import BrochureDownloadEditor from './sections/BrochureDownloadEditor';
import FloorPlansEditor from './sections/FloorPlansEditor';
import GalleryEditor from './sections/GalleryEditor';
import AmenitiesEditor from './sections/AmenitiesEditor';
import VirtualTourEditor from './sections/VirtualTourEditor';
import ContactFormEditor from './sections/ContactFormEditor';
import ContactEditor from './sections/ContactEditor';
import LandingPage from '../landing/LandingPage';

interface AdminDashboardProps {
  propertyData: PropertyData;
  updatePropertyData: (data: PropertyData, shouldSave?: boolean) => void;
  onLogout: () => void;
}

type ActiveTab = 'hero' | 'brochureDownload' | 'floorPlans' | 'amenities' | 'gallery' | 'virtualTour' | 'contactForm' | 'contact';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  propertyData, 
  updatePropertyData, 
  onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('hero');
  const [editedData, setEditedData] = useState<PropertyData>(propertyData);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [tabTransition, setTabTransition] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSaveChanges = async () => {
    setIsSaving(true);
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    updatePropertyData(editedData, true);
    setIsSaving(false);
    navigate('/');
  };

  const handleTabChange = (newTab: ActiveTab) => {
    setTabTransition(true);
    setTimeout(() => {
      setActiveTab(newTab);
      setTabTransition(false);
    }, 150);
  };

  const handleBackToEditor = () => {
    setIsPreviewMode(false);
  };

  const tabs = [
    { id: 'hero' as ActiveTab, label: 'Hero Section', icon: Home },
    { id: 'brochureDownload' as ActiveTab, label: 'Brochure Download', icon: FileText },
    { id: 'floorPlans' as ActiveTab, label: 'Floor Plans', icon: Image },
    { id: 'amenities' as ActiveTab, label: 'Amenities', icon: Star },
    { id: 'gallery' as ActiveTab, label: 'Gallery', icon: Image },
    { id: 'virtualTour' as ActiveTab, label: 'Virtual Tour', icon: Monitor },
    { id: 'contactForm' as ActiveTab, label: 'Contact Form', icon: Mail },
    { id: 'contact' as ActiveTab, label: 'Contact Info', icon: Phone },
  ];

  if (isPreviewMode) {
    return (
      <div className="relative">
        <LandingPage propertyData={editedData} />
        {/* Floating Action Buttons */}
        <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
          <button
            onClick={handleSaveChanges}
            disabled={isSaving}
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center gap-2 transform hover:shadow-xl"
          >
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="hidden sm:inline">Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span className="hidden sm:inline">Save Changes</span>
              </>
            )}
          </button>
          <button
            onClick={handleBackToEditor}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center gap-2 transform hover:shadow-xl"
          >
            <Eye className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Editor</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Property Admin</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPreviewMode(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={onLogout}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`py-4 px-6 border-b-2 font-medium text-sm flex items-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className={`p-6 transition-all duration-300 ${tabTransition ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            {tabTransition ? (
              <div className="space-y-4">
                <LoadingSkeleton height="h-8" width="w-1/3" />
                <LoadingSkeleton height="h-32" />
                <LoadingSkeleton height="h-4" lines={3} />
              </div>
            ) : (
              <>
            {activeTab === 'hero' && (
              <HeroEditor
                hero={editedData.hero}
                onChange={(hero) => setEditedData({ ...editedData, hero })}
              />
            )}
            {activeTab === 'brochureDownload' && (
              <BrochureDownloadEditor
                brochureDownload={editedData.brochureDownload}
                onChange={(brochureDownload) => setEditedData({ ...editedData, brochureDownload })}
              />
            )}
            {activeTab === 'floorPlans' && (
              <FloorPlansEditor
                floorPlans={editedData.floorPlans}
                onChange={(floorPlans) => setEditedData({ ...editedData, floorPlans })}
              />
            )}
            {activeTab === 'amenities' && (
              <AmenitiesEditor
                amenities={editedData.amenities}
                onChange={(amenities) => setEditedData({ ...editedData, amenities })}
              />
            )}
            {activeTab === 'gallery' && (
              <GalleryEditor
                gallery={editedData.gallery}
                onChange={(gallery) => setEditedData({ ...editedData, gallery })}
              />
            )}
            {activeTab === 'virtualTour' && (
              <VirtualTourEditor
                virtualTour={editedData.virtualTour}
                onChange={(virtualTour) => setEditedData({ ...editedData, virtualTour })}
              />
            )}
            {activeTab === 'contactForm' && (
              <ContactFormEditor
                contactForm={editedData.contactForm}
                onChange={(contactForm) => setEditedData({ ...editedData, contactForm })}
              />
            )}
            {activeTab === 'contact' && (
              <ContactEditor
                contact={editedData.contact}
                onChange={(contact) => setEditedData({ ...editedData, contact })}
              />
            )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;