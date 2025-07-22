import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import AdminRoute from './components/admin/AdminRoute';

export interface PropertyData {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    phoneNumber: string;
  };
  overview: {
    title: string;
    description: string;
    welcomeTitle: string;
    welcomeDescription: string;
  };
  floorPlans: {
    title: string;
    plans: Array<{
      id: string;
      label: string;
      image: string;
    }>;
  };
  gallery: Array<{
    id: string;
    category: 'Interior' | 'Exterior';
    roomName: string;
    title: string;
    description: string;
    image: string;
  }>;
  amenities: {
    title: string;
    topRow: Array<{
      id: string;
      name: string;
      icon: string;
    }>;
    bottomRow: Array<{
      id: string;
      name: string;
      icon: string;
    }>;
  };
  virtualTour: {
    title: string;
    subtitle: string;
    videoUrl: string;
  };
  contactForm: {
    title: string;
    propertyOptions: string[];
    budgetRanges: string[];
    recipientEmail: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    mapEmbedUrl: string;
    whatsappNumber: string;
  };
  brochureDownload: {
    title: string;
    formEmail: string;
    brochureDownloadLink: string;
    welcomeTitle: string;
    contactNumber: string;
  };
}

// Default sample data for initial setup
const defaultPropertyData: PropertyData = {
  hero: {
    title: "Radhe Apartments",
    subtitle: "Luxury 3 BHK Apartments in the heart of Ahmedabad",
    backgroundImage: "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    phoneNumber: "9876543210"
  },
  overview: {
    title: "Property Overview",
    description: "Take a closer look at this magnificent property.",
    welcomeTitle: "Welcome to Your Dream Home",
    welcomeDescription: "This stunning property features a modern architecture and luxurious amenities."
  },
  floorPlans: {
    title: "Floor Plans",
    plans: [
      {
        id: '1',
        label: '2 BHK',
        image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      },
      {
        id: '2',
        label: '2nd Floor Plan',
        image: 'https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      },
      {
        id: '3',
        label: 'Basement Plan',
        image: 'https://images.pexels.com/photos/323772/pexels-photo-323772.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      },
      {
        id: '4',
        label: '3 BHK',
        image: 'https://images.pexels.com/photos/323774/pexels-photo-323774.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      }
    ]
  },
  gallery: [
    {
      id: '1',
      category: 'Interior',
      roomName: 'Living Room',
      title: 'Spacious Living Room',
      description: 'A luxurious space with ample sunlight and modern furnishings.',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    },
    {
      id: '2',
      category: 'Interior',
      roomName: 'Kitchen',
      title: 'Gourmet Kitchen',
      description: 'Equipped with state-of-the-art appliances and premium finishes.',
      image: 'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    },
    {
      id: '3',
      category: 'Exterior',
      roomName: 'Pool',
      title: 'Infinity Pool',
      description: 'Relax in your private pool with stunning city views.',
      image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    },
    {
      id: '4',
      category: 'Interior',
      roomName: 'Bedroom',
      title: 'Master Bedroom',
      description: 'A peaceful retreat with stunning views and premium comfort.',
      image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    },
    {
      id: '5',
      category: 'Exterior',
      roomName: 'Garden',
      title: 'Lush Garden',
      description: 'A beautiful space for outdoor activities and relaxation.',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    },
    {
      id: '6',
      category: 'Exterior',
      roomName: 'Balcony',
      title: 'Private Balcony',
      description: 'Enjoy breathtaking sunsets from your private outdoor space.',
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    }
  ],
  amenities: {
    title: "Best Amenities",
    topRow: [
      { id: '1', name: 'Multimedia Room', icon: 'Monitor' },
      { id: '2', name: 'House Help Entry', icon: 'Users' },
      { id: '3', name: 'Private Elevators', icon: 'ArrowUpDown' },
      { id: '4', name: 'Entry Foyer', icon: 'DoorOpen' },
      { id: '5', name: 'Home Office Area', icon: 'Briefcase' },
      { id: '6', name: 'Meeting Room', icon: 'Users2' },
      { id: '7', name: 'Covered Pool', icon: 'Waves' },
      { id: '8', name: 'Life-Size Games', icon: 'Gamepad2' }
    ],
    bottomRow: [
      { id: '9', name: 'Multipurpose Court', icon: 'Trophy' },
      { id: '10', name: 'Banquet Hall', icon: 'Utensils' },
      { id: '11', name: 'Steam Rooms', icon: 'Droplets' },
      { id: '12', name: 'Library', icon: 'BookOpen' },
      { id: '13', name: 'Modern Gym', icon: 'Dumbbell' },
      { id: '14', name: 'Indoor Games', icon: 'Gamepad' },
      { id: '15', name: 'Refreshment Zone', icon: 'Coffee' },
      { id: '16', name: 'Driver\'s Room', icon: 'Car' }
    ]
  },
  virtualTour: {
    title: "Virtual Tour",
    subtitle: "Experience the property online.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  contactForm: {
    title: "Inquire About This Beautiful Property",
    propertyOptions: ["Luxury Villa", "Modern Apartment", "Family House"],
    budgetRanges: ["Under ₹50L", "₹50L - ₹1Cr", "₹1Cr - ₹2Cr", "Above ₹2Cr"],
    recipientEmail: "devmerchant2003@gmail.com"
  },
  contact: {
    address: "123 Luxury Avenue\nPrime Location, Ahmedabad\nGujarat 380001, India",
    phone: "+91 98765 43210",
    email: "info@radheapartments.com",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9990!2d72.5713621!3d23.0224986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAxJzIxLjAiTiA3MsKwMzQnMTcuMCJF!5e0!3m2!1sen!2sin!4v1234567890",
    whatsappNumber: "9876543210"
  },
  brochureDownload: {
    title: "Property Overview",
    formEmail: "devmerchant2003@gmail.com",
    brochureDownloadLink: "https://drive.google.com/file/d/1234567890/view?usp=sharing",
    welcomeTitle: "Welcome to Your Dream Home",
    contactNumber: "+91 98765 43210"
  }
};

// Storage key for localStorage
const STORAGE_KEY = 'real-estate-property-data';

// Load saved property data from localStorage or use default
const loadPropertyData = (): PropertyData => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsedData = JSON.parse(saved);
      // Merge with default data to ensure all properties exist
      return { ...defaultPropertyData, ...parsedData };
    }
  } catch (error) {
    console.warn('Failed to load saved property data:', error);
  }
  return defaultPropertyData;
};

// Save property data to localStorage
const savePropertyData = (data: PropertyData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save property data:', error);
  }
};
function App() {
  const [propertyData, setPropertyData] = useState<PropertyData>(loadPropertyData);

  const updatePropertyData = (newData: PropertyData, shouldSave: boolean = false) => {
    setPropertyData(newData);
    if (shouldSave) {
      savePropertyData(newData);
    }
  };

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route 
            path="/" 
            element={<LandingPage propertyData={propertyData} />} 
          />
          <Route 
            path="/admin" 
            element={
              <AdminRoute 
                propertyData={propertyData} 
                updatePropertyData={updatePropertyData} 
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;