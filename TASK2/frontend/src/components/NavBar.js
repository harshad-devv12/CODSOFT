import React from 'react';

const NavBar = ({ currentPage, setCurrentPage }) => (
  <nav className="bg-white shadow-sm border-b border-gray-200 mb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <button
            className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-200 focus:outline-none"
            onClick={() => setCurrentPage('dashboard')}
            aria-label="Go to Dashboard"
            type="button"
          >
            ProjectFlow
          </button>
        </div>
        <div className="flex space-x-6">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className={`text-sm font-medium transition-all duration-200 ${
              currentPage === 'dashboard'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-blue-600 hover:scale-105 hover:border-blue-400'
            }`}
            type="button"
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentPage('features')}
            className={`text-sm font-medium transition-all duration-200 ${
              currentPage === 'features'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-blue-600 hover:scale-105 hover:border-blue-400'
            }`}
            type="button"
          >
            Features
          </button>
          <button
            onClick={() => setCurrentPage('support')}
            className={`text-sm font-medium transition-all duration-200 ${
              currentPage === 'support'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-blue-600 hover:scale-105 hover:border-blue-400'
            }`}
            type="button"
          >
            Support
          </button>
          <button
            onClick={() => setCurrentPage('privacy')}
            className={`text-sm font-medium transition-all duration-200 ${
              currentPage === 'privacy'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-blue-600 hover:scale-105 hover:border-blue-400'
            }`}
            type="button"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setCurrentPage('terms')}
            className={`text-sm font-medium transition-all duration-200 ${
              currentPage === 'terms'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-blue-600 hover:scale-105 hover:border-blue-400'
            }`}
            type="button"
          >
            Terms of Service
          </button>
          <button
            onClick={() => setCurrentPage('cookies')}
            className={`text-sm font-medium transition-all duration-200 ${
              currentPage === 'cookies'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-blue-600 hover:scale-105 hover:border-blue-400'
            }`}
            type="button"
          >
            Cookie Policy
          </button>
          <button
            onClick={() => setCurrentPage('agreement')}
            className={`text-sm font-medium transition-all duration-200 ${
              currentPage === 'agreement'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-blue-600 hover:scale-105 hover:border-blue-400'
            }`}
            type="button"
          >
            User Agreement
          </button>
        </div>
      </div>
    </div>
  </nav>
);

export default NavBar; 