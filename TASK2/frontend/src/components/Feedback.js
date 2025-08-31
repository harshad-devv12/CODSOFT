import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, MessageSquare, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

function Feedback() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting, isValid }, 
    watch,
    reset 
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });
  
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  
  // Watch form values for enhanced UX
  const watchedName = watch('name');
  const watchedEmail = watch('email');
  const watchedMessage = watch('message');

  const onSubmit = async (data) => {
    setSubmitError(null);
    setSubmitSuccess(false);
    
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Feedback submitted:', data);
      
      // Show success message
      setSubmitSuccess(true);
      reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
      
    } catch (error) {
      setSubmitError('Failed to submit feedback. Please try again.');
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Send us your feedback</h1>
          <p className="text-lg text-gray-600">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
        
        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-700 font-medium">Thank you for your feedback!</span>
            </div>
            <p className="text-green-600 text-sm mt-1">We've received your message and will get back to you soon.</p>
          </div>
        )}
        
        {/* Feedback Form */}
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            {/* Name Field */}
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <User className="w-4 h-4 mr-2 text-gray-400" />
                Your Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("name")}
                  autoComplete="name"
                  placeholder="Enter your full name"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    watchedName ? 'border-green-300 bg-green-50' : 'border-gray-300'
                  }`}
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email", { 
                    required: 'Email is required', 
                    pattern: { 
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 
                      message: 'Please enter a valid email address' 
                    } 
                  })}
                  autoComplete="email"
                  placeholder="Enter your email address"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.email 
                      ? 'border-red-500 bg-red-50' 
                      : watchedEmail && !errors.email 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-gray-300'
                  }`}
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                {watchedEmail && !errors.email && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                )}
              </div>
              {errors.email && (
                <div className="flex items-center text-red-600 text-sm mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email.message}
                </div>
              )}
            </div>

            {/* Message Field */}
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <MessageSquare className="w-4 h-4 mr-2 text-gray-400" />
                Your Message *
              </label>
              <div className="relative">
                <textarea
                  {...register("message", { 
                    required: 'Message is required',
                    minLength: {
                      value: 10,
                      message: 'Message must be at least 10 characters long'
                    },
                    maxLength: {
                      value: 1000,
                      message: 'Message must not exceed 1000 characters'
                    }
                  })}
                  rows={6}
                  placeholder="Tell us what's on your mind..."
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                    errors.message 
                      ? 'border-red-500 bg-red-50' 
                      : watchedMessage && !errors.message 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-gray-300'
                  }`}
                />
                <MessageSquare className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
              </div>
              {errors.message && (
                <div className="flex items-center text-red-600 text-sm mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.message.message}
                </div>
              )}
              {watchedMessage && (
                <div className="text-xs text-gray-500 mt-1">
                  {watchedMessage.length}/1000 characters
                </div>
              )}
            </div>

            {/* Submit Error */}
            {submitError && (
              <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="text-sm">{submitError}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                isSubmitting || !isValid
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
        
        {/* Contact Info */}
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            You can also reach us directly at{' '}
            <a href="mailto:nikamharshadshivaji@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium">
              nikamharshadshivaji@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Feedback;

