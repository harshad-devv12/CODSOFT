import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  User, 
  DollarSign, 
  AlertTriangle, 
  Power, 
  Mail,
  ChevronDown,
  ChevronUp,
  ArrowLeft
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const TermsOfService = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const Section = ({ id, icon: Icon, title, children, defaultExpanded = false }) => {
    const isExpanded = expandedSections[id] ?? defaultExpanded;
    
    return (
      <div className="border border-gray-200 rounded-xl mb-4 overflow-hidden transition-all duration-200 hover:shadow-md">
        <button
          onClick={() => toggleSection(id)}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-200 flex items-center justify-between text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Icon className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
        {isExpanded && (
          <div className="px-6 py-6 bg-white">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/20 rounded-full">
                  <FileText className="w-12 h-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
              <p className="text-xl text-blue-100 mb-6">Please read these terms carefully before using our service.</p>
              <div className="flex items-center justify-center space-x-2 text-blue-100">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm">Effective Date: January 30, 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Section id="acceptance" icon={FileText} title="1. Acceptance of Terms" defaultExpanded>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>
                By accessing and using ProjectFlow ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>
          </Section>

          <Section id="user-accounts" icon={User} title="2. User Accounts">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>To use certain features of the Service, you must create an account. You agree to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
            </div>
          </Section>

          <Section id="payment" icon={DollarSign} title="3. Subscription and Payment">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>The Service offers various subscription plans. By subscribing, you agree to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Pay all fees associated with your chosen plan</li>
                <li>Provide accurate billing information</li>
                <li>Authorize recurring payments</li>
                <li>Pay applicable taxes</li>
              </ul>
              <p className="mt-4">
                We reserve the right to modify pricing with 30 days' notice. Refunds are provided according to our refund policy.
              </p>
            </div>
          </Section>

          <Section id="termination" icon={Power} title="4. Termination">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Violation of these Terms of Service</li>
                <li>Non-payment of fees</li>
                <li>Fraudulent or illegal activity</li>
                <li>Extended periods of inactivity</li>
              </ul>
              <p className="mt-4">
                Upon termination, your right to use the Service will cease immediately, and we may delete your account and data.
              </p>
            </div>
          </Section>

          <Section id="contact" icon={Mail} title="5. Contact Information">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mt-4">
                <p className="mb-2"><strong>Email:</strong> nikamharshadshivaji@gmail.com</p>
                <p className="mb-2"><strong>Phone:</strong> +91 9156633238</p>
                <p className="mb-2"><strong>GitHub:</strong> <a href="https://github.com/dev-harshhh19" target="_blank" rel="noopener noreferrer">dev-harshhh19</a></p>
                <p className="mb-2"><strong>LinkedIn:</strong> <a href="https://in.linkedin.com/in/harshad-nikam-311734281" target="_blank" rel="noopener noreferrer">harshad-nikam-311734281</a></p>
              </div>
            </div>
          </Section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
