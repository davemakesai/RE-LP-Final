import React from 'react';

interface HeroEditorProps {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  onChange: (hero: HeroEditorProps['hero']) => void;
}

const HeroEditor: React.FC<HeroEditorProps> = ({ hero, onChange }) => {
  const handleChange = (field: keyof typeof hero, value: string) => {
    onChange({ ...hero, [field]: value });
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroEditor;