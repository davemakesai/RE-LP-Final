import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';

interface FooterSectionProps {
  contact: {
    address: string;
    phone: string;
    email: string;
    mapEmbedUrl: string;
    whatsappNumber: string;
  };
}

const FooterSection: React.FC<FooterSectionProps> = ({ contact }) => {
  const formatPhoneForTel = (phone: string): string => {
    return phone.replace(/\s+/g, '');
  };

  const formatAddress = (address: string): string[] => {
    return address.split('\n').filter(line => line.trim() !== '');
  };

  return (
    <footer className="bg-gray-900 text-white py-16 px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Contact Information */}
          <AnimatedSection animation="slide-in-left">
            <div className="space-y-8">
            {/* Address */}
            <div className="flex items-start gap-4 transform transition-all duration-300 hover:scale-[1.02]">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Address</h3>
                <div className="text-gray-300 leading-relaxed">
                  {formatAddress(contact.address).map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 transform transition-all duration-300 hover:scale-[1.02]">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Contact Number</h3>
                <p className="text-gray-300 mb-3">{contact.phone}</p>
                <a
                  href={`tel:${formatPhoneForTel(contact.phone)}`}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  aria-label={`Call ${contact.phone}`}
                >
                  <Phone className="w-4 h-4 group-hover:animate-bounce-gentle" />
                  Call Now
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 transform transition-all duration-300 hover:scale-[1.02]">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Email Address</h3>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-blue-400 hover:text-blue-300 transition-all duration-300 text-lg transform hover:scale-105"
                  aria-label={`Send email to ${contact.email}`}
                >
                  {contact.email}
                </a>
              </div>
            </div>
            </div>
          </AnimatedSection>

          {/* Right Column - Google Maps */}
          <AnimatedSection animation="slide-in-right" delay={200}>
            <div className="lg:pl-8">
              <h3 className="text-xl font-semibold text-white mb-4">Find Us</h3>
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              {contact.mapEmbedUrl ? (
                <div className="relative w-full aspect-video lg:aspect-[4/3]">
                  <iframe
                    src={contact.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Property Location"
                    className="absolute inset-0"
                  />
                </div>
              ) : (
                <div className="w-full aspect-video lg:aspect-[4/3] flex items-center justify-center bg-gray-700">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400">Map will appear here</p>
                  </div>
                </div>
              )}
            </div>
            </div>
          </AnimatedSection>
          </div>
        </AnimatedSection>

        {/* Bottom Section */}
        <AnimatedSection delay={400}>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400 transition-colors duration-300 hover:text-gray-300">
              © 2024 Radhe Apartments. All rights reserved.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  );
};

export default FooterSection;