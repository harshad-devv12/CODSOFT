import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, Loader2, UserPlus } from 'lucide-react';
import EmailVerificationAlert from './ui/EmailVerificationAlert';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

function Register() {
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
      password: '',
      confirmPassword: '',
      privacy: false
    }
  });
  
  const [submitError, setSubmitError] = useState(null);
  const [showEmailAlert, setShowEmailAlert] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  
  // Watch form values for enhanced UX
  const watchedName = watch('name');
  const watchedEmail = watch('email');
  const watchedPassword = watch('password');
  const watchedConfirmPassword = watch('confirmPassword');
  const watchedPrivacy = watch('privacy');

  const onSubmit = async (data) => {
    setSubmitError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      // Show email verification alert instead of immediately navigating
      setRegisteredEmail(data.email);
      setShowEmailAlert(true);
      // Reset form after successful registration
      reset();

    } catch (error) {
      setSubmitError(error.message);
    }
  };

  const handleFormReset = () => {
    reset();
    setSubmitError(null);
    setShowEmailAlert(false);
  };

  const handleAlertClose = () => {
    setShowEmailAlert(false);
    // Navigate to login page after closing the alert
    navigate('/login', { state: { message: 'Registration successful! Please check your email to verify your account before logging in.' } });
  };

  return (
    <>
      <EmailVerificationAlert 
        isOpen={showEmailAlert}
        onClose={handleAlertClose}
        email={registeredEmail}
      />
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Register
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          {/* Name Field */}
          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <User className="w-4 h-4 mr-2 text-gray-400" />
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                {...register("name")}
                autoComplete="name"
                autoFocus
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

          {/* Password Field */}
          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Lock className="w-4 h-4 mr-2 text-gray-400" />
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register("password", { 
                  required: 'Password is required', 
                  minLength: { 
                    value: 6, 
                    message: 'Password must be at least 6 characters long' 
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: 'Password must contain uppercase, lowercase, and number'
                  }
                })}
                autoComplete="new-password"
                placeholder="Create a strong password"
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.password 
                    ? 'border-red-500 bg-red-50' 
                    : watchedPassword && !errors.password 
                    ? 'border-green-300 bg-green-50' 
                    : 'border-gray-300'
                }`}
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <div className="flex items-center text-red-600 text-sm mt-1">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.password.message}
              </div>
            )}
            {watchedPassword && watchedPassword.length > 0 && (
              <div className="text-xs text-gray-500 mt-1">
                Password strength: {watchedPassword.length < 6 ? 'Weak' : watchedPassword.length < 8 ? 'Medium' : 'Strong'}
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Lock className="w-4 h-4 mr-2 text-gray-400" />
              Confirm Password *
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                {...register("confirmPassword", { 
                  required: 'Please confirm your password',
                  validate: value => value === watchedPassword || 'Passwords do not match'
                })}
                autoComplete="new-password"
                placeholder="Confirm your password"
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.confirmPassword 
                    ? 'border-red-500 bg-red-50' 
                    : watchedConfirmPassword && !errors.confirmPassword && watchedConfirmPassword === watchedPassword
                    ? 'border-green-300 bg-green-50' 
                    : 'border-gray-300'
                }`}
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <div className="flex items-center text-red-600 text-sm mt-1">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.confirmPassword.message}
              </div>
            )}
            {watchedConfirmPassword && watchedConfirmPassword === watchedPassword && watchedConfirmPassword.length > 0 && (
              <div className="flex items-center text-green-600 text-sm mt-1">
                <CheckCircle className="w-4 h-4 mr-1" />
                Passwords match
              </div>
            )}
          </div>
          {/* Privacy Policy Checkbox */}
          <div className="space-y-2">
            <div className="flex items-start space-x-3">
              <input 
                type="checkbox" 
                id="privacy" 
                {...register("privacy", { required: 'You must agree to the privacy policy' })} 
                className={`mt-1 w-4 h-4 text-blue-600 border-2 rounded focus:ring-2 focus:ring-blue-500 ${
                  errors.privacy ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <label htmlFor="privacy" className="text-sm text-gray-700 leading-5">
                I agree to the{' '}
                <Link 
                  to="/privacy-policy" 
                  className="text-blue-600 hover:text-blue-700 underline font-medium"
                  target="_blank"
                >
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link 
                  to="/terms-of-service" 
                  className="text-blue-600 hover:text-blue-700 underline font-medium"
                  target="_blank"
                >
                  Terms of Service
                </Link>
              </label>
            </div>
            {errors.privacy && (
              <div className="flex items-center text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.privacy.message}
              </div>
            )}
            {watchedPrivacy && (
              <div className="flex items-center text-green-600 text-sm mt-1">
                <CheckCircle className="w-4 h-4 mr-1" />
                Terms and conditions accepted
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
                Creating Account...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Create Account
              </>
            )}
          </button>
          
          {/* Clear Form Button */}
          {(watchedName || watchedEmail || watchedPassword || watchedConfirmPassword || watchedPrivacy) && (
            <div className="text-center">
              <button
                type="button"
                onClick={handleFormReset}
                className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors underline"
              >
                Clear Form
              </button>
            </div>
          )}
          
          <div className="text-center">
            <Link to="/login" className="text-blue-600 hover:text-blue-700 text-sm">
              Already have an account? Sign In
            </Link>
          </div>
        </form>
        </div>
      </div>
    </>
  );
}

export default Register;
