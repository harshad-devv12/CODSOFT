import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft, X } from 'lucide-react';
import Logger from '../utils/logger';
import TaskList from '../TaskList';
import NewTaskForm from '../NewTaskForm';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskData, setEditTaskData] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    Logger.debug('ProjectDetails - ID from useParams:', id, 'Type:', typeof id);
    if (!token) return;
    if (!id || id === 'undefined') {
      Logger.error('Invalid project ID:', id);
      setError('Invalid project ID');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    Logger.debug('Making request to:', `${API_BASE_URL}/api/projects/${id}`);
    fetch(`${API_BASE_URL}/api/projects/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('Project not found');
          }
          throw new Error('Failed to fetch project details');
        }
        return res.json();
      })
      .then(data => {
        setProject(data);
        setTasks(data.tasks || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id, token]);

  const handleAddTask = (taskData) => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ ...taskData, projectId: id }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to create task');
        return res.json();
      })
      .then(newTask => {
        setTasks([...tasks, newTask]);
        setLoading(false);
        setShowTaskForm(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleUpdateTaskStatus = (taskId, newStatus) => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update task');
        return res.json();
      })
      .then(updatedTask => {
        setTasks(tasks.map(task =>
          task.id === taskId ? updatedTask : task
        ));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleDeleteTask = (taskId) => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete task');
        return res.json();
      })
      .then(() => {
        setTasks(tasks.filter(task => task.id !== taskId));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleEditClick = (task) => {
    setEditTaskId(task.id);
    setEditTaskData(task);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTaskData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = (taskId) => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(editTaskData),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update task');
        return res.json();
      })
      .then(updatedTask => {
        setTasks(tasks.map(task =>
          task.id === taskId ? updatedTask : task
        ));
        setEditTaskId(null);
        setEditTaskData(null);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleEditCancel = () => {
    setEditTaskId(null);
    setEditTaskData(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-blue-600 font-semibold">Loading project details...</div>
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

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center">Project not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-md mr-2 transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to Dashboard</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Project Details</h1>
          </div>
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-4">{project.name}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>

          {/* Project Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{tasks.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {tasks.filter(t => t.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {tasks.filter(t => t.status === 'in_progress').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                {Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100) || 0}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Progress</div>
            </div>
          </div>

          <div className="mb-6">
            <button
              onClick={() => setShowTaskForm(!showTaskForm)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-semibold transition-colors ${
                showTaskForm 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {showTaskForm ? <X size={16} /> : <Plus size={16} />}
              <span>{showTaskForm ? 'Cancel' : 'New Task'}</span>
            </button>
          </div>

          {showTaskForm && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">Add New Task</h3>
              <NewTaskForm
                newTask={{
                  title: '',
                  description: '',
                  priority: 'medium',
                  status: 'todo',
                  assigned_to: '',
                  deadline: '',
                  estimated_hours: 0
                }}
                onSubmit={handleAddTask}
              />
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Tasks</h3>
            <TaskList
              tasks={tasks}
              editTaskId={editTaskId}
              editTaskData={editTaskData}
              onEditClick={handleEditClick}
              onEditChange={handleEditChange}
              onEditSave={handleEditSave}
              onEditCancel={handleEditCancel}
              onDeleteTask={handleDeleteTask}
              onStatusChange={handleUpdateTaskStatus}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
