import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';

// Mock providers for testing
const MockAuthProvider = ({ children }) => {
  const mockAuthValue = {
    user: null,
    token: null,
    loading: false,
    login: jest.fn(),
    logout: jest.fn(),
    updateProfile: jest.fn(),
    deleteAccount: jest.fn()
  };

  return (
    <div data-testid="auth-provider">
      {React.cloneElement(children, { mockAuth: mockAuthValue })}
    </div>
  );
};

const MockThemeProvider = ({ children }) => {
  const mockThemeValue = {
    theme: 'light',
    toggleTheme: jest.fn()
  };

  return (
    <div data-testid="theme-provider">
      {React.cloneElement(children, { mockTheme: mockThemeValue })}
    </div>
  );
};

// Custom render function with providers
export const renderWithProviders = (ui, options = {}) => {
  const Wrapper = ({ children }) => (
    <BrowserRouter>
      <MockAuthProvider>
        <MockThemeProvider>
          {children}
        </MockThemeProvider>
      </MockAuthProvider>
    </BrowserRouter>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

// Mock API responses
export const mockApiResponses = {
  projects: [
    {
      id: 1,
      name: 'Test Project',
      description: 'A test project',
      status: 'active',
      priority: 'medium',
      estimated_hours: 40,
      deadline: '2024-12-31',
      tasks: []
    }
  ],
  project: {
    id: 1,
    name: 'Test Project',
    description: 'A test project',
    status: 'active',
    priority: 'medium',
    estimated_hours: 40,
    deadline: '2024-12-31',
    tasks: [
      {
        id: 1,
        title: 'Test Task',
        description: 'A test task',
        status: 'todo',
        priority: 'medium'
      }
    ]
  }
};

// Test utilities
export const waitForLoadingToFinish = () => {
  return new Promise(resolve => setTimeout(resolve, 100));
};

export default {
  renderWithProviders,
  mockApiResponses,
  waitForLoadingToFinish
};
