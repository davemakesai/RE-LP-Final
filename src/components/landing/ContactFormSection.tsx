import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';

interface ContactFormSectionProps {
  contactForm: {
    title: string;
    propertyImage: string;
    propertyOptions: string[];
    budgetRanges: string[];
    recipientEmail: string;
  };
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  propertyInterested: string;
  budgetRange: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactFormSection: React.FC<ContactFormSectionProps> = ({ contactForm }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    propertyInterested: '',
    budgetRange: ''
  });

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      // Note: This is a basic implementation. You may need to adjust based on FormSubmit.co requirements
      const response = await fetch(`https://formsubmit.co/ajax/${contactForm.recipientEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `Property Inquiry from ${formData.fullName}`,
          _template: 'table'
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          propertyInterested: '',
          budgetRange: ''
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Failed to submit inquiry. Please try again.');
      console.error('Form submission error:', error);
    }
  };

  const isFormValid = formData.fullName && formData.email && formData.phone;

  return (
    <section className="py-20 px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Heading */}
          <AnimatedSection animation="slide-in-left">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {contactForm.title}
              </h2>
              
              {/* Property Image - Desktop Only */}
              {contactForm.propertyImage && (
                <div className="mt-8 hidden lg:block">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                    <img
                      src={contactForm.propertyImage}
                      alt="Property showcase"
                      className="w-full h-64 xl:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              )}
              
              {/* Property Image - Mobile Only */}
              {contactForm.propertyImage && (
                <div className="mt-6 lg:hidden">
                  <div className="relative overflow-hidden rounded-xl shadow-md">
                    <img
                      src={contactForm.propertyImage}
                      alt="Property showcase"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Right Column - Form */}
          <AnimatedSection animation="slide-in-right" delay={200}>
            <div className="bg-gray-50 p-8 lg:p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
            {submitStatus === 'success' ? (
              <div className="text-center py-8 animate-fade-in">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600">
                  Your inquiry has been submitted successfully. We'll get back to you soon.
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-6 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
                {/* Full Name */}
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 focus:scale-[1.02]"
                  />
                </div>

                {/* Email */}
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 focus:scale-[1.02]"
                  />
                </div>

                {/* Phone */}
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 focus:scale-[1.02]"
                  />
                </div>

                {/* Property Interested */}
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <label htmlFor="propertyInterested" className="block text-sm font-medium text-gray-700 mb-2">
                    Property Interested In
                  </label>
                  <select
                    id="propertyInterested"
                    name="propertyInterested"
                    value={formData.propertyInterested}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 focus:scale-[1.02]"
                  >
                    <option value="">Select a property type</option>
                    {contactForm.propertyOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget Range */}
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range
                  </label>
                  <select
                    id="budgetRange"
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 focus:scale-[1.02]"
                  >
                    <option value="">Select your budget range</option>
                    {contactForm.budgetRanges.map((range, index) => (
                      <option key={index} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
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
                  className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.02] hover:shadow-lg"
                >
                  {submitStatus === 'submitting' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
            </div>
          </AnimatedSection>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactFormSection;