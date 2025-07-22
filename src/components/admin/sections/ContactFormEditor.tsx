import React from 'react';
import { Plus, Trash2, Mail } from 'lucide-react';

interface ContactFormEditorProps {
  contactForm: {
    title: string;
    propertyImage: string;
    propertyOptions: string[];
    budgetRanges: string[];
    recipientEmail: string;
  };
  onChange: (contactForm: ContactFormEditorProps['contactForm']) => void;
}

const ContactFormEditor: React.FC<ContactFormEditorProps> = ({ contactForm, onChange }) => {
  const handleTitleChange = (title: string) => {
    onChange({ ...contactForm, title });
  };

  const handleEmailChange = (recipientEmail: string) => {
    onChange({ ...contactForm, recipientEmail });
  };

  const handlePropertyImageChange = (propertyImage: string) => {
    onChange({ ...contactForm, propertyImage });
  };

  const handlePropertyOptionChange = (index: number, value: string) => {
    const updatedOptions = [...contactForm.propertyOptions];
    updatedOptions[index] = value;
    onChange({ ...contactForm, propertyOptions: updatedOptions });
  };

  const handleAddPropertyOption = () => {
    onChange({
      ...contactForm,
      propertyOptions: [...contactForm.propertyOptions, 'New Property Type']
    });
  };

  const handleRemovePropertyOption = (index: number) => {
    const updatedOptions = contactForm.propertyOptions.filter((_, i) => i !== index);
    onChange({ ...contactForm, propertyOptions: updatedOptions });
  };

  const handleBudgetRangeChange = (index: number, value: string) => {
    const updatedRanges = [...contactForm.budgetRanges];
    updatedRanges[index] = value;
    onChange({ ...contactForm, budgetRanges: updatedRanges });
  };

  const handleAddBudgetRange = () => {
    onChange({
      ...contactForm,
      budgetRanges: [...contactForm.budgetRanges, 'New Budget Range']
    });
  };

  const handleRemoveBudgetRange = (index: number) => {
    const updatedRanges = contactForm.budgetRanges.filter((_, i) => i !== index);
    onChange({ ...contactForm, budgetRanges: updatedRanges });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Contact Form</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Form Settings */}
        <div className="space-y-6">
          {/* Section Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Section Title
            </label>
            <input
              type="text"
              id="title"
              value={contactForm.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Recipient Email */}
          <div>
            <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700 mb-2">
              Form Recipient Email
            </label>
            <input
              type="email"
              id="recipientEmail"
              value={contactForm.recipientEmail}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="your-email@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              This email will receive form submissions via FormSubmit.co
            </p>
          </div>

          {/* Property Image */}
          <div>
            <label htmlFor="propertyImage" className="block text-sm font-medium text-gray-700 mb-2">
              Property Image
            </label>
            <input
              type="url"
              id="propertyImage"
              value={contactForm.propertyImage}
              onChange={(e) => handlePropertyImageChange(e.target.value)}
              placeholder="https://example.com/property-image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              Image will display in the left column on desktop screens
            </p>
          </div>

          {/* Property Options */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Property Options
              </label>
              <button
                onClick={handleAddPropertyOption}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors duration-200"
              >
                <Plus className="w-3 h-3" />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {contactForm.propertyOptions.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handlePropertyOptionChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => handleRemovePropertyOption(index)}
                    className="text-red-600 hover:text-red-800 p-2 rounded hover:bg-red-50 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Ranges */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Budget Ranges
              </label>
              <button
                onClick={handleAddBudgetRange}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors duration-200"
              >
                <Plus className="w-3 h-3" />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {contactForm.budgetRanges.map((range, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={range}
                    onChange={(e) => handleBudgetRangeChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => handleRemoveBudgetRange(index)}
                    className="text-red-600 hover:text-red-800 p-2 rounded hover:bg-red-50 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
          <div className="bg-white rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{contactForm.title}</h4>
                
                {/* Property Image Preview */}
                {contactForm.propertyImage && (
                  <div className="mt-4 mb-4">
                    <div className="bg-gray-100 rounded-lg overflow-hidden aspect-video">
                      <img 
                        src={contactForm.propertyImage} 
                        alt="Property preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Property Image Preview</p>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Interested In
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm" disabled>
                      <option>Select a property type</option>
                      {contactForm.propertyOptions.map((option, index) => (
                        <option key={index}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Budget Range
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm" disabled>
                      <option>Select your budget range</option>
                      {contactForm.budgetRanges.map((range, index) => (
                        <option key={index}>{range}</option>
                      ))}
                    </select>
                  </div>
                  <button className="w-full bg-black text-white py-2 px-4 rounded text-sm flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    Submit Inquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFormEditor;