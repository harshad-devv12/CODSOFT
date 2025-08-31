import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Features from './Features';
import Support from './Support';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import CookiePolicy from './CookiePolicy';
import UserAgreement from './UserAgreement';
import { AnimatePresence, motion } from 'framer-motion';
import NavBar from './NavBar';

const AppContainer = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'features':
        return <Features />;
      case 'support':
        return <Support />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'terms':
        return <TermsOfService />;
      case 'cookies':
        return <CookiePolicy />;
      case 'agreement':
        return <UserAgreement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NavBar */}
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Content */}
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ProjectFlow</h3>
              <p className="text-gray-300 text-sm">
                Powerful project management tool for teams of all sizes.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="https://github.com/dev-harshhh19" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </a>
                <a href="https://in.linkedin.com/in/harshad-nikam-311734281" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z"/></svg>
                </a>
                <a href="https://instagram.com/dev.harshhh19/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.775.13 4.602.388 3.635 1.355 2.668 2.322 2.41 3.495 2.352 4.772.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.058 1.277.316 2.45 1.283 3.417.967.967 2.14 1.225 3.417 1.283C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 1.277-.058 2.45-.316 3.417-1.283.967-.967 1.225-2.14 1.283-3.417.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.058-1.277-.316-2.45-1.283-3.417-.967-.967-2.14-1.225-3.417-1.283C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                </a>
                <a href="https://twitter.com/not_harshad_19/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
              </div>
              <div className="mt-4 text-gray-400 text-xs">
                <div>Email: <a href="mailto:nikamharshadshivaji@gmail.com" className="hover:text-white">nikamharshadshivaji@gmail.com</a></div>
                <div>Phone: <a href="tel:+919156633238" className="hover:text-white">+91 9156633238</a></div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <button
                    onClick={() => setCurrentPage('dashboard')}
                    className="hover:text-white hover:scale-110 transition-all duration-200"
                    type="button"
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage('features')}
                    className="hover:text-white hover:scale-110 transition-all duration-200"
                    type="button"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage('support')}
                    className="hover:text-white hover:scale-110 transition-all duration-200"
                    type="button"
                  >
                    Support
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <button
                    onClick={() => setCurrentPage('privacy')}
                    className={`hover:text-white hover:scale-105 transition-all duration-200 ${currentPage === 'privacy' ? 'text-white font-bold underline' : ''}`}
                    type="button"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage('terms')}
                    className={`hover:text-white hover:scale-105 transition-all duration-200 ${currentPage === 'terms' ? 'text-white font-bold underline' : ''}`}
                    type="button"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage('cookies')}
                    className={`hover:text-white hover:scale-105 transition-all duration-200 ${currentPage === 'cookies' ? 'text-white font-bold underline' : ''}`}
                    type="button"
                  >
                    Cookie Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage('agreement')}
                    className={`hover:text-white hover:scale-105 transition-all duration-200 ${currentPage === 'agreement' ? 'text-white font-bold underline' : ''}`}
                    type="button"
                  >
                    User Agreement
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <button onClick={() => setCurrentPage('support')} className="hover:text-white hover:scale-105 transition-all duration-200" type="button">Contact Support</button>
                </li>
                <li>
                  <button type="button" className="hover:text-white hover:scale-105 transition-all duration-200 underline" onClick={() => window.location='mailto:nikamharshadshivaji@gmail.com'}>Email Us</button>
                </li>
                <li>
                  <button type="button" className="hover:text-white hover:scale-105 transition-all duration-200 underline" onClick={() => window.location='tel:+919156633238'}>Call Us</button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} ProjectFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppContainer; 