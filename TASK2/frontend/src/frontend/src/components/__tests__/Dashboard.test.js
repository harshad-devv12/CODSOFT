import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../utils/testUtils';
import Dashboard from '../Dashboard';

// Mock fetch globally
global.fetch = jest.fn();

// Mock the auth context
jest.mock('../../../../context/AuthContext', () => ({
  ...jest.requireActual('../../context/AuthContext'),
  useAuth: () => ({
    token: 'mock-token',
    user: { id: 1, email: 'test@example.com' }
  })
}));

describe('Dashboard Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders dashboard with loading state initially', () => {
    // Mock successful API responses
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'API is working' })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ([])
      });

    renderWithProviders(<Dashboard />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders projects list when data is loaded', async () => {
    // Mock successful API responses
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'API is working' })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ([
          {
            id: 1,
            name: 'Test Project',
            description: 'A test project',
            status: 'active',
            priority: 'medium'
          }
        ])
      });

    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText('My Projects')).toBeInTheDocument();
    expect(screen.getByText('New Project')).toBeInTheDocument();
  });

  test('handles API errors gracefully', async () => {
    // Mock API failure
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'API is working' })
      })
      .mockRejectedValueOnce(new Error('Network error'));

    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/failed to connect to server/i)).toBeInTheDocument();
    });
  });

  test('renders filter controls', async () => {
    // Mock successful API responses
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'API is working' })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ([])
      });

    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    expect(screen.getByDisplayValue('All Statuses')).toBeInTheDocument();
    expect(screen.getByDisplayValue('All Priorities')).toBeInTheDocument();
  });
});
