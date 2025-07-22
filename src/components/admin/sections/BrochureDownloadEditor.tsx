import React from 'react';
import { Download, Phone, Mail, Info, ExternalLink } from 'lucide-react';

interface BrochureDownloadEditorProps {
  brochureDownload: {
    title: string;
    formEmail: string;
    brochureDownloadLink: string;
    welcomeTitle: string;
    contactNumber: string;
  };
  onChange: (brochureDownload: BrochureDownloadEditorProps['brochureDownload']) => void;
}

const BrochureDownloadEditor: React.FC<BrochureDownloadEditorProps> = ({ brochureDownload, onChange }) => {
  const handleChange = (field: keyof typeof brochureDownload, value: string) => {
    onChange({ ...brochureDownload, [field]: value });
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  };

  const validateGoogleDriveUrl = (url: string): boolean => {
    return url.includes('drive.google.com') || url === '';
  };

  const formatPhoneForTel = (phone: string): string => {
    return phone.replace(/\s+/g, '');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Brochure Download Section</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Form Fields */}
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Section Title
            </label>
            <input
              type="text"
              id="title"
              value={brochureDownload.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="welcomeTitle" className="block text-sm font-medium text-gray-700 mb-2">
              Welcome Title
            </label>
            <input
              type="text"
              id="welcomeTitle"
              value={brochureDownload.welcomeTitle}
              onChange={(e) => handleChange('welcomeTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              value={brochureDownload.contactNumber}
              onChange={(e) => handleChange('contactNumber', e.target.value)}
              placeholder="Contact number for scheduling visit"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${
                brochureDownload.contactNumber && !validatePhoneNumber(brochureDownload.contactNumber)
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {brochureDownload.contactNumber && !validatePhoneNumber(brochureDownload.contactNumber) && (
              <p className="text-red-600 text-sm mt-1">Please enter a valid phone number</p>
            )}
          </div>

          <div>
            <label htmlFor="formEmail" className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Form Email (FormSubmit Endpoint)
            </label>
            <input
              type="email"
              id="formEmail"
              value={brochureDownload.formEmail}
              onChange={(e) => handleChange('formEmail', e.target.value)}
              placeholder="your-email@example.com"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${
                brochureDownload.formEmail && !validateEmail(brochureDownload.formEmail)
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {brochureDownload.formEmail && !validateEmail(brochureDownload.formEmail) && (
              <p className="text-red-600 text-sm mt-1">Please enter a valid email address</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              This email will receive brochure download requests
            </p>
          </div>

          <div>
            <label htmlFor="brochureDownloadLink" className="block text-sm font-medium text-gray-700 mb-2">
              <Download className="w-4 h-4 inline mr-2" />
              Brochure Download Link (Google Drive URL)
            </label>
            <input
              type="url"
              id="brochureDownloadLink"
              value={brochureDownload.brochureDownloadLink}
              onChange={(e) => handleChange('brochureDownloadLink', e.target.value)}
              placeholder="https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${
                brochureDownload.brochureDownloadLink && !validateGoogleDriveUrl(brochureDownload.brochureDownloadLink)
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {brochureDownload.brochureDownloadLink && !validateGoogleDriveUrl(brochureDownload.brochureDownloadLink) && (
              <p className="text-red-600 text-sm mt-1">Please enter a valid Google Drive URL</p>
            )}
          </div>

          {/* Google Drive Tutorial */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-2">📄 How to get Google Drive download link:</h4>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Upload your brochure PDF to Google Drive</li>
                  <li>Right-click the file and select "Get link"</li>
                  <li>Set permissions to "Anyone with the link can view"</li>
                  <li>Copy the complete share URL</li>
                  <li>Paste the URL in the field above</li>
                </ol>
                <p className="text-sm text-blue-700 mt-2">
                  <strong>Note:</strong> The system will automatically convert the view link to a download link.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
          <div className="bg-white rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column Preview */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  {brochureDownload.title}
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
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
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your contact number"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      disabled
                    />
                  </div>
                  
                  <button className="w-full bg-black text-white py-2 px-4 rounded text-sm flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Brochure
                  </button>
                </div>
              </div>

              {/* Right Column Preview */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="text-lg font-bold text-gray-900 mb-3">
                  {brochureDownload.welcomeTitle}
                </h5>
                
                <a
                  href={`tel:${formatPhoneForTel(brochureDownload.contactNumber)}`}
                  className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Schedule a Visit
                </a>
              </div>
            </div>

            {/* Download Link Test */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Brochure Download Link:</span>
                {brochureDownload.brochureDownloadLink && validateGoogleDriveUrl(brochureDownload.brochureDownloadLink) ? (
                  <a
                    href={brochureDownload.brochureDownloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                  >
                    Test Link <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-gray-400 text-sm">No valid link</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrochureDownloadEditor;