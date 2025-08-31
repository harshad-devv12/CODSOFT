import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Logger from '../utils/logger';

const AuthContext = createContext(null);

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [maintenanceMessage, setMaintenanceMessage] = useState(null); // New state for maintenance message
  const navigate = useNavigate();

  const updateProfile = async (updates) => {
    try {
      const { data, error } = await supabase.auth.updateUser({ data: updates });
      if (error) {
        if (error.message && error.message.includes('Auth session missing!')) {
          Logger.warn('Auth session missing during profile update. Displaying maintenance message.');
          setMaintenanceMessage('Profile update is temporarily under maintenance. Please try again later.');
          return { success: false, message: 'Under maintenance' };
        } else {
          throw error;
        }
      }
      setUser(data.user);
      setMaintenanceMessage(null); // Clear message on success
      return { success: true, user: data.user };
    } catch (error) {
      Logger.error('Error updating profile:', error);
      setMaintenanceMessage('An unexpected error occurred during profile update.');
      throw error; // Re-throw other errors
    }
  };

  const deleteAccount = async () => {
    // For now, we'll just logout the user since Supabase client API doesn't allow user deletion
    // In a real implementation, you'd call your backend API to schedule deletion
    Logger.info('Account deletion scheduled');
    await logout();
  };

  useEffect(() => {
    // Check for existing session token in localStorage on mount
    const existingToken = localStorage.getItem('jwtToken');
    if (existingToken) {
      // Validate the session token with our backend
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
      fetch(`${apiUrl}/api/projects`, {
        headers: {
          'Authorization': `Bearer ${existingToken}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Token is valid, keep the session
          setToken(existingToken);
          // The backend's authenticateToken middleware now sets req.user from Supabase
          // We don't need to fetch user info separately here, but we can set a basic user object
          // if needed for immediate UI updates before a full user object is available.
          // For now, we'll assume the backend correctly authenticates and the user object
          // will be populated on subsequent requests or a dedicated user info endpoint.
          // setUser({ email: 'authenticated' }); // Removed placeholder
        } else {
          // Token is invalid, clear it
          localStorage.removeItem('jwtToken');
          setUser(null);
          setToken(null);
        }
        setLoading(false);
      })
      .catch(error => {
        Logger.warn('Session validation failed:', error.message);
        localStorage.removeItem('jwtToken');
        setUser(null);
        setToken(null);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    try {
      // Use our backend login endpoint instead of direct Supabase
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
      const response = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      
      
      
      const data = await response.json();
      
      const userWithToken = { ...data.user, access_token: data.access_token };
      setUser(userWithToken);
      setToken(data.access_token); // Use Supabase access token
      localStorage.setItem('jwtToken', data.access_token);
      setLoading(false);
      navigate('/dashboard');
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    
    try {
      // Call backend logout endpoint
      const currentToken = localStorage.getItem('jwtToken');
      if (currentToken) {
        try {
          const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
          await fetch(`${apiUrl}/api/logout`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${currentToken}`,
              'Content-Type': 'application/json'
            }
          });
        } catch (backendError) {
          Logger.warn('Backend logout failed:', backendError.message);
          // Continue with local cleanup even if backend fails
        }
      }

      // Supabase logout (client-side)
      const { error: supabaseSignOutError } = await supabase.auth.signOut();
      if (supabaseSignOutError) {
        Logger.warn('Supabase client-side logout failed:', supabaseSignOutError.message);
      }

    } catch (error) {
      Logger.warn('Logout process encountered issues:', error.message);
    } finally {
      // Always perform local cleanup
      setUser(null);
      setToken(null);
      localStorage.removeItem('jwtToken');
      setLoading(false);
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateProfile, deleteAccount, maintenanceMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);