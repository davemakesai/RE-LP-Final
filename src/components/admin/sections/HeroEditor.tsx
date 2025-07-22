import React from 'react';

interface HeroEditorProps {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    phoneNumber: string;
  };
  onChange: (hero: HeroEditorProps['hero']) => void;
}

const HeroEditor: React.FC<HeroEditorProps> = ({ hero, onChange }) => {
  const handleChange = (field: keyof typeof hero, value: string) => {
    onChange({ ...hero, [field]: value });
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10;
  };

  const formatPhoneDisplay = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    return phone;
  };
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Hero Section</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Main Title
            </label>
            <input
              type="text"
              id="title"
              value={hero.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle
            </label>
            <textarea
              id="subtitle"
              rows={3}
              value={hero.subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number for Call Now CTA
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={hero.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 10-digit phone number"
              maxLength={10}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${
                hero.phoneNumber && !validatePhoneNumber(hero.phoneNumber)
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {hero.phoneNumber && !validatePhoneNumber(hero.phoneNumber) && (
              <p className="text-red-600 text-sm mt-1">Please enter a valid 10-digit phone number</p>
            )}
            {hero.phoneNumber && validatePhoneNumber(hero.phoneNumber) && (
              <p className="text-green-600 text-sm mt-1">
                Will display as: {formatPhoneDisplay(hero.phoneNumber)}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="backgroundImage" className="block text-sm font-medium text-gray-700 mb-2">
              Background Image URL
            </label>
            <input
              type="url"
              id="backgroundImage"
              value={hero.backgroundImage}
              onChange={(e) => handleChange('backgroundImage', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
          <div 
            className="relative h-64 rounded-lg overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${hero.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 flex flex-col justify-center p-6">
              <h1 className="text-2xl font-bold text-white mb-2 truncate">
                {hero.title}
              </h1>
              <p className="text-sm text-gray-200 line-clamp-2">
                {hero.subtitle}
              </p>
              {hero.phoneNumber && validatePhoneNumber(hero.phoneNumber) && (
                <div className="mt-4">
                  <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Call Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroEditor;