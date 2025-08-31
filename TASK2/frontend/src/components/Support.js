import React, { useState } from 'react';

// Header Component
function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">ProjectFlow</h1>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition">
              Home
            </a>
            <a href="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition">
              Dashboard
            </a>
            <a href="/features" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition">
              Features
            </a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">ProjectFlow</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Streamline your project management with our comprehensive tool. 
              Track progress, manage tasks, and boost team productivity.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/dev-harshhh19" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
              <a href="https://in.linkedin.com/in/harshad-nikam-311734281" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z"/></svg>
              </a>
              <a href="https://instagram.com/dev.harshhh19/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.775.13 4.602.388 3.635 1.355 2.668 2.322 2.41 3.495 2.352 4.772.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.058 1.277.316 2.45 1.283 3.417.967.967 2.14 1.225 3.417 1.283C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 1.277-.058 2.45-.316 3.417-1.283.967-.967 1.225-2.14 1.283-3.417.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.058-1.277-.316-2.45-1.283-3.417-.967-.967-2.14-1.225-3.417-1.283C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
              <a href="https://twitter.com/not_harshad_19/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
            </div>
            <div className="mt-4 text-gray-400 text-xs">
              <div>Email: <a href="mailto:nikamharshadshivaji@gmail.com" className="hover:text-white">nikamharshadshivaji@gmail.com</a></div>
              <div>Phone: <a href="tel:+919156633238" className="hover:text-white">+91 9156633238</a></div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/dashboard" className="text-gray-300 hover:text-blue-400 transition">Dashboard</a></li>
              <li><a href="/features" className="text-gray-300 hover:text-blue-400 transition">Features</a></li>
              <li><a href="/support" className="text-gray-300 hover:text-blue-400 transition">Support</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/dashboard" className="text-gray-300 hover:text-blue-400 transition">App</a></li>
              <li><a href="/privacy-policy" className="text-gray-300 hover:text-blue-400 transition">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="text-gray-300 hover:text-blue-400 transition">Terms of Service</a></li>
              <li><a href="/cookie-policy" className="text-gray-300 hover:text-blue-400 transition">Cookie Policy</a></li>
              <li><a href="/user-agreement" className="text-gray-300 hover:text-blue-400 transition">User Agreement</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li><a href="mailto:nikamharshadshivaji@gmail.com" className="text-gray-300 hover:text-blue-400 transition">Email</a></li>
              <li><a href="tel:+919156633238" className="text-gray-300 hover:text-blue-400 transition">Phone</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} ProjectFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

const Support = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (you can replace this with actual API call)
    setTimeout(() => {
      setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
      setContactForm({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 5000);
    }, 1000);
  };

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSocialClick = (url, platform) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:nikamharshadshivaji@gmail.com?subject=Support Request';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+919156633238';
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const openGuide = (guideId) => {
    setSelectedGuide(guideId);
  };

  const closeGuide = () => {
    setSelectedGuide(null);
  };

  const handleContactSupport = () => {
    window.location.href = 'mailto:nikamharshadshivaji@gmail.com?subject=Support Request&body=Hello,%0D%0A%0D%0AI need help with:%0D%0A';
  };

  const handleRequestFeature = () => {
    window.location.href = 'mailto:nikamharshadshivaji@gmail.com?subject=Feature Request&body=Hello,%0D%0A%0D%0AI would like to request a new feature:%0D%0A';
  };

  const faqs = [
    {
      question: "How do I create a new project?",
      answer: "To create a new project, click the 'New Project' button on your dashboard. Fill in the project details including name, description, priority, and due date, then click 'Create Project'."
    },
    {
      question: "Can I assign tasks to team members?",
      answer: "Yes, you can assign tasks to team members. When creating or editing a task, you'll see an 'Assigned To' field where you can select team members from your project."
    },
    {
      question: "How do I track time on tasks?",
      answer: "Time tracking is available on all tasks. Click the timer icon next to any task to start tracking time. You can pause, resume, and stop the timer as needed."
    },
    {
      question: "Can I export project data?",
      answer: "Yes, you can export project data in various formats including PDF and CSV. Go to the project details page and click the 'Export' button to download your data."
    },
    {
      question: "How do I change project status?",
      answer: "To change project status, go to the project details page and click on the status dropdown. You can change it to Active, Completed, Suspended, or Terminated."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes, we have mobile apps available for both iOS and Android. You can download them from the App Store or Google Play Store."
    }
  ];

  const contactMethods = [
    {
      title: "Email Support",
      description: "Get help via email within 24 hours",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      action: "Send Email",
      onClick: handleEmailClick
    },
    {
      title: "Phone Support",
      description: "Call us for immediate assistance",
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      action: "Call Now",
      onClick: handlePhoneClick
    },
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help you get the most out of our project management tool
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help articles, FAQs, or guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                {method.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
              <p className="text-gray-600 mb-4">{method.description}</p>
              <button 
                onClick={method.onClick}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
              >
                {method.action}
              </button>
            </div>
          ))}
        </div>

        {/* Social Media Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect With Us</h2>
            <p className="text-gray-600">Follow us on social media for updates and news</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => handleSocialClick('https://github.com/dev-harshhh19', 'GitHub')}
              className="flex items-center justify-center space-x-2 bg-gray-800 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              <span>GitHub</span>
            </button>
            
            <button
              onClick={() => handleSocialClick('https://in.linkedin.com/in/harshad-nikam-311734281', 'LinkedIn')}
              className="flex items-center justify-center space-x-2 bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z"/>
              </svg>
              <span>LinkedIn</span>
            </button>
            
            <button
              onClick={() => handleSocialClick('https://instagram.com/dev.harshhh19/', 'Instagram')}
              className="flex items-center justify-center space-x-2 bg-pink-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-pink-500 transition-colors duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.775.13 4.602.388 3.635 1.355 2.668 2.322 2.41 3.495 2.352 4.772.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.058 1.277.316 2.45 1.283 3.417.967.967 2.14 1.225 3.417 1.283C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 1.277-.058 2.45-.316 3.417-1.283.967-.967 1.225-2.14 1.283-3.417.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.058-1.277-.316-2.45-1.283-3.417-.967-.967-2.14-1.225-3.417-1.283C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
              <span>Instagram</span>
            </button>
            
            <button
              onClick={() => handleSocialClick('https://twitter.com/not_harshad_19/', 'Twitter')}
              className="flex items-center justify-center space-x-2 bg-blue-400 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-300 transition-colors duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              <span>Twitter</span>
            </button>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
            <p className="text-gray-600">Have a question or feedback? We'd love to hear from you!</p>
          </div>
          
          {submitMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              {submitMessage}
            </div>
          )}
          
          <form onSubmit={handleContactSubmit} className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={contactForm.subject}
                onChange={handleContactChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="What's this about?"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={contactForm.message}
                onChange={handleContactChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Tell us more about your question or feedback..."
              />
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 transform hover:scale-105"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              <button
                onClick={() => setActiveTab('faq')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'faq'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Frequently Asked Questions
              </button>
              <button
                onClick={() => setActiveTab('guides')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'guides'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Getting Started Guides
              </button>
              <button
                onClick={() => setActiveTab('troubleshooting')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'troubleshooting'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Troubleshooting
              </button>
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'faq' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left p-6 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                      >
                        <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                        <svg 
                          className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                            expandedFaq === index ? 'rotate-180' : ''
                          }`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {expandedFaq === index && (
                        <div className="px-6 pb-6">
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No FAQs found matching your search.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'guides' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started Guides</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Quick Start Guide</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Learn the basics of setting up your first project and managing tasks.</p>
                    <button 
                      onClick={() => openGuide('quickstart')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                    >
                      Read Guide →
                    </button>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Team Collaboration</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Discover how to work effectively with your team members.</p>
                    <button 
                      onClick={() => openGuide('collaboration')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                    >
                      Read Guide →
                    </button>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Advanced Features</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Master advanced features like time tracking and reporting.</p>
                    <button 
                      onClick={() => openGuide('advanced')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                    >
                      Read Guide →
                    </button>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">API Documentation</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Integrate our API into your existing workflows.</p>
                    <button 
                      onClick={() => openGuide('api')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                    >
                      Read Guide →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'troubleshooting' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Troubleshooting</h2>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Issues</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Project not loading properly</li>
                      <li>• Tasks not saving</li>
                      <li>• Time tracking issues</li>
                      <li>• Performance problems</li>
                    </ul>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">System Requirements</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Modern web browser (Chrome, Firefox, Safari, Edge)</li>
                      <li>• Stable internet connection</li>
                      <li>• JavaScript enabled</li>
                      <li>• Cookies enabled</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Still Need Help Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Still Need Help?</h2>
          <p className="text-lg text-gray-600 mb-8">Our support team is available 24/7 to assist you</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleContactSupport}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
            >
              Contact Support
            </button>
            <button 
              onClick={handleRequestFeature}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300 transform hover:scale-105"
            >
              Request Feature
            </button>
          </div>
        </div>
      </div>
      </div>
      
      {/* Guide Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedGuide === 'quickstart' && 'Quick Start Guide'}
                {selectedGuide === 'collaboration' && 'Team Collaboration Guide'}
                {selectedGuide === 'advanced' && 'Advanced Features Guide'}
                {selectedGuide === 'api' && 'API Documentation'}
              </h2>
              <button 
                onClick={closeGuide}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              {selectedGuide === 'quickstart' && (
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-4">Getting Started with ProjectFlow</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">1. Create Your First Project</h4>
                      <p className="text-gray-600 mb-2">Start by creating a new project from your dashboard:</p>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Click the "New Project" button</li>
                        <li>Fill in project name and description</li>
                        <li>Set priority level and deadline</li>
                        <li>Click "Create Project"</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">2. Add Tasks to Your Project</h4>
                      <p className="text-gray-600 mb-2">Break down your project into manageable tasks:</p>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Click on your project to open details</li>
                        <li>Click "+ New Task" button</li>
                        <li>Add task title, description, and priority</li>
                        <li>Set deadlines and assign team members</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">3. Track Progress</h4>
                      <p className="text-gray-600 mb-2">Monitor your project's progress:</p>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Update task status (To Do, In Progress, Completed)</li>
                        <li>View project statistics on the dashboard</li>
                        <li>Use filters to focus on specific tasks</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedGuide === 'collaboration' && (
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-4">Team Collaboration Features</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">1. Assign Tasks to Team Members</h4>
                      <p className="text-gray-600 mb-2">Distribute work among your team:</p>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Use the "Assigned To" field when creating tasks</li>
                        <li>Team members receive notifications</li>
                        <li>Track individual workloads</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">2. Real-time Updates</h4>
                      <p className="text-gray-600 mb-2">Stay synchronized with your team:</p>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>See live updates when tasks change status</li>
                        <li>Get instant notifications</li>
                        <li>View team activity in real-time</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">3. Project Sharing</h4>
                      <p className="text-gray-600 mb-2">Collaborate effectively:</p>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Share project dashboards with team</li>
                        <li>Set different permission levels</li>
                        <li>Monitor team productivity</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedGuide === 'advanced' && (
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-4">Advanced Features</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">1. Time Tracking</h4>
                      <p className="text-gray-600 mb-2">Monitor time spent on tasks:</p>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Start/stop timers for individual tasks</li>
                        <li>View time reports and analytics</li>
                        <li>Set estimated vs actual time comparisons</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">2. Advanced Filtering</h4>
                      <p className="text-gray-600 mb-2">Find exactly what you need:</p>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Filter by status, priority, assignee</li>
                        <li>Search by keywords in titles/descriptions</li>
                        <li>Create custom filter combinations</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">3. Reporting & Analytics</h4>
                      <p className="text-gray-600 mb-2">Generate insights:</p>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Export project data to CSV/PDF</li>
                        <li>View productivity analytics</li>
                        <li>Generate custom reports</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedGuide === 'api' && (
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-4">API Documentation</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">1. Getting Started with API</h4>
                      <p className="text-gray-600 mb-2">Authentication and basic setup:</p>
                      <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                        <p>Base URL: https://api.projectflow.com/v1</p>
                        <p>Authentication: Bearer Token</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">2. Projects Endpoint</h4>
                      <p className="text-gray-600 mb-2">Manage projects programmatically:</p>
                      <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                        <p>GET /projects - List all projects</p>
                        <p>POST /projects - Create new project</p>
                        <p>PUT /projects/:id - Update project</p>
                        <p>DELETE /projects/:id - Delete project</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">3. Tasks Endpoint</h4>
                      <p className="text-gray-600 mb-2">Task management via API:</p>
                      <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                        <p>GET /tasks - List all tasks</p>
                        <p>POST /tasks - Create new task</p>
                        <p>PUT /tasks/:id - Update task</p>
                        <p>DELETE /tasks/:id - Delete task</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Support; 