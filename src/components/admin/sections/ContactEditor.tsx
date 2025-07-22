import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, Info } from 'lucide-react';

interface ContactEditorProps {
  contact: {
    address: string;
    phone: string;
    email: string;
    mapEmbedUrl: string;
    whatsappNumber: string;
  };
  onChange: (contact: ContactEditorProps['contact']) => void;
}

const ContactEditor: React.FC<ContactEditorProps> = ({ contact, onChange }) => {
  const handleChange = (field: keyof typeof contact, value: string) => {
    onChange({ ...contact, [field]: value });
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  };

  const validateWhatsAppNumber = (number: string): boolean => {
    const cleanNumber = number.replace(/\D/g, '');
    return cleanNumber.length === 10;
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMapUrl = (url: string): boolean => {
    return url.includes('google.com/maps/embed') || url === '';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Contact Information</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Form Fields */}
        <div className="space-y-6">
          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Address
            </label>
            <textarea
              id="address"
              rows={4}
              value={contact.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Enter complete address with line breaks"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              Use line breaks to separate address lines
            </p>
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Contact Number
            </label>
            <input
              type="tel"
              id="phone"
              value={contact.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+91 98765 43210"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${
                contact.phone && !validatePhoneNumber(contact.phone)
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {contact.phone && !validatePhoneNumber(contact.phone) && (
              <p className="text-red-600 text-sm mt-1">Please enter a valid phone number</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={contact.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="info@example.com"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${
                contact.email && !validateEmail(contact.email)
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {contact.email && !validateEmail(contact.email) && (
              <p className="text-red-600 text-sm mt-1">Please enter a valid email address</p>
            )}
          </div>

          {/* WhatsApp Number */}
          <div>
            <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-2">
              <MessageCircle className="w-4 h-4 inline mr-2" />
              WhatsApp Number
            </label>
            <input
              type="tel"
              id="whatsappNumber"
              value={contact.whatsappNumber}
              onChange={(e) => handleChange('whatsappNumber', e.target.value.replace(/\D/g, ''))}
              placeholder="9876543210"
              maxLength={10}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${
                contact.whatsappNumber && !validateWhatsAppNumber(contact.whatsappNumber)
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {contact.whatsappNumber && !validateWhatsAppNumber(contact.whatsappNumber) && (
              <p className="text-red-600 text-sm mt-1">Please enter a valid 10-digit WhatsApp number</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Enter 10-digit number without country code (+91 will be added automatically)
            </p>
          </div>

          {/* Google Maps Embed URL */}
          <div>
            <label htmlFor="mapEmbedUrl" className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Google Maps Embed URL
            </label>
            <input
              type="url"
              id="mapEmbedUrl"
              value={contact.mapEmbedUrl}
              onChange={(e) => handleChange('mapEmbedUrl', e.target.value)}
              placeholder="https://www.google.com/maps/embed?pb=..."
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${
                contact.mapEmbedUrl && !validateMapUrl(contact.mapEmbedUrl)
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {contact.mapEmbedUrl && !validateMapUrl(contact.mapEmbedUrl) && (
              <p className="text-red-600 text-sm mt-1">Please enter a valid Google Maps embed URL</p>
            )}
          </div>

          {/* Google Maps Tutorial */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-2">🗺️ How to get Google Maps embed URL:</h4>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Go to Google Maps and search your location</li>
                  <li>Click "Share" button</li>
                  <li>Click "Embed a map" tab</li>
                  <li>Copy the URL from src="..." in the HTML code</li>
                  <li>Paste the complete embed URL in the field above</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
          <div className="bg-gray-900 text-white rounded-lg p-6 space-y-6">
            {/* Address Preview */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Address</h4>
                <div className="text-gray-300 text-sm">
                  {contact.address.split('\n').map((line, index) => (
                    <div key={index}>{line || 'Address line'}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Phone Preview */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Contact</h4>
                <p className="text-gray-300 text-sm mb-2">{contact.phone || 'Phone number'}</p>
                <button className="bg-green-600 text-white px-3 py-1 rounded text-xs">
                  Call Now
                </button>
              </div>
            </div>

            {/* Email Preview */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Email</h4>
                <p className="text-blue-400 text-sm">{contact.email || 'email@example.com'}</p>
              </div>
            </div>

            {/* Map Preview */}
            <div>
              <h4 className="font-semibold text-white mb-2">Location</h4>
              <div className="bg-gray-700 rounded aspect-video flex items-center justify-center">
                {contact.mapEmbedUrl && validateMapUrl(contact.mapEmbedUrl) ? (
                  <iframe
                    src={contact.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Map Preview"
                    className="rounded"
                  />
                ) : (
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                    <p className="text-gray-400 text-xs">Map Preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* WhatsApp Button Preview */}
          <div className="mt-4 relative">
            <p className="text-sm font-medium text-gray-700 mb-2">WhatsApp Button Preview:</p>
            <div className="bg-gray-200 rounded-lg p-4 relative h-20">
              <div className="absolute bottom-2 right-2">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-xs text-gray-500">
                {contact.whatsappNumber 
                  ? `Opens: wa.me/91${contact.whatsappNumber}` 
                  : 'WhatsApp number required'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactEditor;