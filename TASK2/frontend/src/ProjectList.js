import React from 'react';
import { Edit as EditIcon, Trash2 as DeleteIcon } from 'lucide-react';

function ProjectList({ projects, onProjectClick, onDeleteProject, onEditProject, statusFilter, priorityFilter }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    return new Date(dateString).toLocaleDateString();
  };

  const isOverdue = (deadline) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  // Filter projects based on status and priority
  const filteredProjects = projects.filter(project => {
    const statusMatch = statusFilter === 'all' || project.status === statusFilter;
    const priorityMatch = priorityFilter === 'all' || project.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  if (!filteredProjects || filteredProjects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No projects found. Create your first project!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProjects.map(project => (
        <div 
          key={project.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 p-6 cursor-pointer transition-all duration-200 hover:-translate-y-1"
          onClick={() => {
            onProjectClick(project.id);
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
              {project.name}
            </h3>
            
            <div className="flex space-x-2 ml-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditProject(project);
                }}
                className="text-blue-600 hover:text-blue-800 p-1"
                title="Edit Project"
              >
                <EditIcon size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`Are you sure you want to delete "${project.name}"?`)) {
                    onDeleteProject(project.id);
                  }
                }}
                className="text-red-600 hover:text-red-800 p-1"
                title="Delete Project"
              >
                <DeleteIcon size={16} />
              </button>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {project.description || 'No description available'}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
              project.status === 'completed' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
              project.status === 'active' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
              project.status === 'suspended' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
              'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}>
              {project.status?.replace('_', ' ') || 'active'}
            </span>
            <span className={`inline-block px-2 py-1 rounded border text-xs font-medium ${
              project.priority === 'urgent' ? 'border-red-200 dark:border-red-700 text-red-800 dark:text-red-300' :
              project.priority === 'high' ? 'border-orange-200 dark:border-orange-700 text-orange-800 dark:text-orange-300' :
              project.priority === 'medium' ? 'border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-300' :
              'border-green-200 dark:border-green-700 text-green-800 dark:text-green-300'
            }`}>
              {project.priority}
            </span>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Estimated:</span>
              <span className="font-medium text-gray-900 dark:text-white">{project.estimated_hours || 0}h</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Tasks:</span>
              <span className="font-medium text-gray-900 dark:text-white">{project.tasks ? project.tasks.length : 0}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 dark:text-gray-400">Deadline:</span>
              <span className={`font-medium ${isOverdue(project.deadline) ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>
                {formatDate(project.deadline)}
              </span>
            </div>
            {isOverdue(project.deadline) && (
              <p className="text-xs text-red-600 mt-1">⚠️ Overdue</p>
            )}
          </div>

          {project.tasks && project.tasks.length > 0 && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Progress</span>
                <span>
                  {Math.round((project.tasks.filter(t => t.status === 'completed').length / project.tasks.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(project.tasks.filter(t => t.status === 'completed').length / project.tasks.length) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
