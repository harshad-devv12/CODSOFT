import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import ProjectList from '../ProjectList';
import NewProjectModal from '../NewProjectModal';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';
import Logger from '../utils/logger';
import LoadingSpinner from './ui/LoadingSpinner';


const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth(); // Get token from AuthContext

  // Test backend connection first
  useEffect(() => {
    Logger.debug('Dashboard - Testing backend connection...');
    fetch(`${API_BASE_URL}/api/test`)
      .then(res => res.json())
      .then(data => {
        Logger.debug('Backend connection test successful:', data);
      })
      .catch(err => {
        Logger.error('Backend connection test failed:', err);
      });
  }, []);

  // Fetch projects from backend
  useEffect(() => {
    if (!token) {
      Logger.info('Dashboard - No token available, skipping project fetch');
      return; // Don't fetch if not authenticated
    }

    Logger.debug('Dashboard - Token available, fetching projects...');
    setLoading(true);
    setError(null);
    
    fetch(`${API_BASE_URL}/api/projects`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        Logger.debug('Dashboard - Response status:', res.status);
        Logger.debug('Dashboard - Response headers:', res.headers);
        
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error('Authentication failed. Please log in again.');
          } else if (res.status === 403) {
            throw new Error('Access denied. Please check your permissions.');
          } else {
            throw new Error(`Failed to fetch projects (${res.status})`);
          }
        }
        return res.json();
      })
      .then(data => {
        Logger.info('Dashboard - Fetched projects successfully:', data);
        Logger.debug('Dashboard - First project:', data[0]);
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        Logger.error('Dashboard - Error fetching projects:', err);
        setError(err.message || 'Failed to connect to server. Please check your connection.');
        setLoading(false);
      });
  }, [token]); // Re-fetch when token changes

  const handleOpenModal = () => {
    setEditingProject(null);
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProject(null);
  };
  
  const handleAddProject = (formData) => {
    setLoading(true);
    
    const url = editingProject 
      ? `${API_BASE_URL}/api/projects/${editingProject.id}` // Use id for PostgreSQL
      : `${API_BASE_URL}/api/projects`;
    const method = editingProject ? 'PUT' : 'POST';
    
    fetch(url, {
      method,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error(editingProject ? 'Failed to update project' : 'Failed to create project');
        return res.json();
      })
      .then(project => {
        if (editingProject) {
          setProjects(projects.map(p => p.id === editingProject.id ? project : p)); // Use id
        } else {
          setProjects([...projects, project]);
        }
        setLoading(false);
        handleCloseModal();
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };
  const handleProjectClick = (id) => {
    Logger.debug('Dashboard - Navigating to project with ID:', id);
    navigate(`/projects/${id}`);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowModal(true);
  };

  const handleDeleteProject = (projectId) => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete project');
        return res.json();
      })
      .then(() => {
        setProjects(projects.filter(p => p.id !== projectId)); // Use id
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  // Task management functions (currently unused but kept for future use)
  // const handleAddTask = (projectId, taskData) => {
  //   // Implementation for adding tasks
  // };
  
  // const handleUpdateTaskStatus = (projectId, taskId, newStatus) => {
  //   // Implementation for updating task status
  // };
  
  // const handleDeleteTask = (projectId, taskId) => {
  //   // Implementation for deleting tasks
  // };

  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading projects..." />
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600 font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex flex-col">
      <Header />
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Projects</h1>
            <button
              onClick={handleOpenModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
            >
              <Plus size={20} />
              <span>New Project</span>
            </button>
          </div>
          
          {/* Filter Controls */}
          <div className="flex space-x-4 mb-6">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md"
            >
              <option value="all">All Statuses</option>
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <ProjectList
            projects={projects}
            onProjectClick={handleProjectClick}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
          />

          <NewProjectModal
            showModal={showModal}
            handleCloseModal={handleCloseModal}
            handleAddProject={handleAddProject}
            editingProject={editingProject}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;