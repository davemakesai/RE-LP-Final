import React from 'react';
import { Phone } from 'lucide-react';

interface PhoneButtonProps {
  phoneNumber: string;
}

const PhoneButton: React.FC<PhoneButtonProps> = ({ phoneNumber }) => {
  const handlePhoneClick = () => {
    if (phoneNumber) {
      const cleanNumber = phoneNumber.replace(/\s+/g, '');
      window.open(`tel:${cleanNumber}`, '_self');
    }
  };

  if (!phoneNumber) {
    return null;
  }

  return (
    <button
      onClick={handlePhoneClick}
      className="fixed bottom-5 left-5 z-[1000] w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group animate-bounce-gentle"
      aria-label={`Call ${phoneNumber}`}
    >
      <Phone className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />

      {/* Pulse Animation */}
      <div className="absolute inset-0 rounded-full bg-blue-500 animate-pulse-gentle opacity-30"></div>
    </button>
  );
};

export default PhoneButton;