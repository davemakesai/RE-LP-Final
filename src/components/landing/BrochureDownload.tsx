import React, { useState } from 'react';
import { Download, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';

interface BrochureDownloadProps {
  brochureDownload: {
    title: string;
    formEmail: string;
    brochureDownloadLink: string;
    welcomeTitle: string;
    contactNumber: string;
  };
}

interface FormData {
  name: string;
  contactNumber: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const BrochureDownload: React.FC<BrochureDownloadProps> = ({ brochureDownload }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contactNumber: ''
  });
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [showThankYou, setShowThankYou] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    setErrorMessage('');

    try {
      // FormSubmit.co integration
      const response = await fetch(`https://formsubmit.co/ajax/${brochureDownload.formEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `Brochure Download Request from ${formData.name}`,
          _template: 'table'
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setShowThankYou(true);
        setFormData({
          name: '',
          contactNumber: ''
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Failed to submit request. Please try again.');
      console.error('Form submission error:', error);
    }
  };

  const handleDownload = () => {
    if (brochureDownload.brochureDownloadLink) {
      // Convert Google Drive view link to download link
      let downloadLink = brochureDownload.brochureDownloadLink;
      if (downloadLink.includes('drive.google.com') && downloadLink.includes('/view')) {
        downloadLink = downloadLink.replace('/view?usp=sharing', '/export?format=pdf');
      }
      window.open(downloadLink, '_blank', 'noopener,noreferrer');
    }
    setShowThankYou(false);
    setSubmitStatus('idle');
  };

  const formatPhoneForTel = (phone: string): string => {
    return phone.replace(/\s+/g, '');
  };

  const isFormValid = formData.name.trim() !== '' && formData.contactNumber.trim() !== '';

  return (
    <>
      <section className="py-20 px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Form */}
            <AnimatedSection animation="slide-in-left">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                  {brochureDownload.title}
                </h2>
              
                <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 focus:scale-[1.02]"
                  />
                </div>

                {/* Contact Number Field */}
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your contact number"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 focus:scale-[1.02]"
                  />
                </div>

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{errorMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormValid || submitStatus === 'submitting'}
                  className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 group hover:scale-[1.02] hover:shadow-lg transform"
                >
                  {submitStatus === 'submitting' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      Download Brochure
                    </>
                  )}
                </button>
              </form>
              </div>
            </AnimatedSection>

            {/* Right Column - Welcome Card */}
            <AnimatedSection animation="slide-in-right" delay={200}>
              <div className="bg-gray-50 p-8 lg:p-12 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                  {brochureDownload.welcomeTitle}
                </h3>
              
                {/* Schedule Visit Button */}
                <a
                  href={`tel:${formatPhoneForTel(brochureDownload.contactNumber)}`}
                  className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 group transform hover:scale-105 hover:shadow-lg"
                  aria-label={`Call ${brochureDownload.contactNumber} to schedule a visit`}
                >
                  <Phone className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 group-hover:animate-bounce-gentle" />
                  Schedule a Visit
                </a>
              </div>
            </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Thank You Popup */}
      {showThankYou && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl animate-scale-in">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6">
              Here is the Brochure you requested
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDownload}
                className="flex-1 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 hover:shadow-lg"
              >
                <Download className="w-4 h-4" />
                Download Now
              </button>
              <button
                onClick={() => {
                  setShowThankYou(false);
                  setSubmitStatus('idle');
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BrochureDownload;