import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Eye, 
  Lock, 
  Users, 
  FileText, 
  Clock, 
  Mail,
  ChevronDown,
  ChevronUp,
  ArrowLeft
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const PrivacyPolicy = () => {
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
                  <Shield className="w-12 h-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-xl text-blue-100 mb-6">Your privacy is our priority. Learn how we protect and handle your data.</p>
              <div className="flex items-center justify-center space-x-2 text-blue-100">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Last updated: January 30, 2025</span>
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
          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Data Protection</h3>
              </div>
              <p className="text-gray-600 text-sm">We use industry-standard encryption and security measures to protect your information.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Transparency</h3>
              </div>
              <p className="text-gray-600 text-sm">We're clear about what data we collect and how we use it for your benefit.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Your Rights</h3>
              </div>
              <p className="text-gray-600 text-sm">You have full control over your data with rights to access, modify, or delete it.</p>
            </div>
          </div>

          <Section id="introduction" icon={FileText} title="1. Introduction" defaultExpanded>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>
                Welcome to ProjectFlow. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you how we look after your personal data when you visit our website 
                and tell you about your privacy rights and how the law protects you.
              </p>
            </div>
          </Section>

          <Section id="information" icon={Users} title="2. Information We Collect">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h3>
              <ul className="list-disc list-inside space-y-1 mb-4">
                <li>Name and contact information (email address, phone number)</li>
                <li>Account credentials and profile information</li>
                <li>Payment and billing information</li>
                <li>Communication preferences</li>
              </ul>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Usage Information</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Project and task data you create and manage</li>
                <li>Time tracking information</li>
                <li>User activity and interaction with our services</li>
                <li>Device and browser information</li>
              </ul>
            </div>
          </Section>

          <Section id="how-we-use" icon={Eye} title="3. How We Use Your Information">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, investigate, and prevent fraudulent transactions</li>
                <li>Personalize and improve your experience</li>
              </ul>
            </div>
          </Section>

          <Section id="data-security" icon={Lock} title="4. Data Security">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication</li>
                <li>Secure data centers and infrastructure</li>
                <li>Employee training on data protection</li>
              </ul>
            </div>
          </Section>

          <Section id="contact" icon={Mail} title="5. Contact Us">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>
                If you have any questions about this privacy policy or our data practices, please contact us:
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

export default PrivacyPolicy;
