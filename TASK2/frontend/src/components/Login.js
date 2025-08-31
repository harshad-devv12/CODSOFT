import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting, isValid }, 
    watch,
    reset,
    setFocus
  } = useForm({
    mode: 'onChange', // Real-time validation
    defaultValues: {
      email: '',
      password: ''
    }
  });
  
  const { login } = useAuth();
  const [submitError, setSubmitError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(null);
  
  // Watch form values for enhanced UX
  const watchedEmail = watch('email');
  const watchedPassword = watch('password');

  useEffect(() => {
    if (location.state && location.state.message) {
      setSuccessMessage(location.state.message);
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        window.history.replaceState({}, document.title, location.pathname);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const onSubmit = async (data) => {
    setSubmitError(null);
    setSuccessMessage(null);
    try {
      await login(data.email, data.password);
    } catch (error) {
      setSubmitError(error.message);
      // Focus back to email field on error for better UX
      setFocus('email');
    }
  };

  const handleFormReset = () => {
    reset();
    setSubmitError(null);
    setSuccessMessage(null);
    setFocus('email');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600">
            Sign in to access your account
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div className="text-green-800 text-sm">
              {successMessage}
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className={`w-5 h-5 ${
                  errors.email ? 'text-red-400' : watchedEmail ? 'text-blue-500' : 'text-gray-400'
                }`} />
              </div>
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
                autoFocus
                placeholder="Enter your email"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                  errors.email 
                    ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                    : watchedEmail 
                    ? 'border-blue-300 bg-blue-50' 
                    : 'border-gray-300 bg-gray-50 hover:bg-white'
                }`}
              />
              {watchedEmail && !errors.email && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              )}
            </div>
            {errors.email && (
              <div className="mt-2 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              </div>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className={`w-5 h-5 ${
                  errors.password ? 'text-red-400' : watchedPassword ? 'text-blue-500' : 'text-gray-400'
                }`} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register("password", {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                autoComplete="current-password"
                placeholder="Enter your password"
                className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                  errors.password 
                    ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                    : watchedPassword 
                    ? 'border-blue-300 bg-blue-50' 
                    : 'border-gray-300 bg-gray-50 hover:bg-white'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && (
              <div className="mt-2 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <p className="text-red-600 text-sm">{errors.password.message}</p>
              </div>
            )}
          </div>

          {/* Submit Error */}
          {submitError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="text-red-800 text-sm">
                {submitError}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
              isSubmitting || !isValid
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>

          {/* Clear Form Button */}
          {(watchedEmail || watchedPassword) && (
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

          {/* Forgot Password & Register Links */}
          <div className="space-y-4 text-center">
            <Link 
              to="/forgot-password" 
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
            >
              Forgot your password?
            </Link>
            
            <div className="pt-4 border-t border-gray-200">
              <p className="text-gray-600 text-sm mb-2">
                Don't have an account?
              </p>
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center w-full py-2 px-4 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-xl transition-colors duration-200"
              >
                Create Account
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;