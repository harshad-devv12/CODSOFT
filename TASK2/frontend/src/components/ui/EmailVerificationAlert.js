import React from 'react';
import { Mail, CheckCircle, X } from 'lucide-react';

const EmailVerificationAlert = ({ isOpen, onClose, email }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 transform animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <div className="flex justify-end mb-2">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Icon and content */}
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
            <Mail size={32} className="text-blue-600" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Check Your Email!
          </h3>
          
          <p className="text-gray-600 mb-4 leading-relaxed">
            We've sent a verification link to:
          </p>
          
          <div className="bg-gray-50 rounded-lg p-3 mb-6">
            <p className="font-semibold text-gray-800 break-all">
              {email}
            </p>
          </div>
          
          <div className="flex items-start text-left text-sm text-gray-600 mb-6 space-x-3">
            <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="mb-2">
                <strong>Click the verification link</strong> in your email to activate your account.
              </p>
              <p>
                Don't see the email? Check your spam folder or contact support.
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Got It!
          </button>
          
          <p className="text-xs text-gray-500 mt-4">
            You can close this dialog and continue to the login page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationAlert;
