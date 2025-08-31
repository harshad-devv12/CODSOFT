import React from 'react';
import { Edit as EditIcon, Trash2 as DeleteIcon } from 'lucide-react';

function TaskList({ tasks, editTaskId, editTaskData, onEditClick, onEditChange, onEditSave, onEditCancel, onDeleteTask, onStatusChange }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    return new Date(dateString).toLocaleDateString();
  };

  const isOverdue = (deadline) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No tasks yet. Add your first task!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <div key={task._id || task.id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{task.title}</h3>
              <p className="text-gray-600 text-sm">{task.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEditClick(task)}
                className="text-blue-600 hover:text-blue-800 p-1"
              >
                <EditIcon size={16} />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
                    onDeleteTask(task._id || task.id);
                  }
                }}
                className="text-red-600 hover:text-red-800 p-1"
              >
                <DeleteIcon size={16} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <label className="text-gray-500 text-xs">Status</label>
              <select
                value={task.status}
                onChange={e => onStatusChange(task._id || task.id, e.target.value)}
                className="block w-full mt-1 text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="review">Review</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            <div>
              <label className="text-gray-500 text-xs block">Priority</label>
              <span className={`inline-block px-2 py-1 rounded text-xs ${
                task.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                task.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {task.priority}
              </span>
            </div>
            
            <div>
              <label className="text-gray-500 text-xs block">Assigned To</label>
              <p className="text-sm">{task.assigned_to || 'Unassigned'}</p>
            </div>
            
            <div>
              <label className="text-gray-500 text-xs block">Deadline</label>
              <p className={`text-sm ${isOverdue(task.deadline) ? 'text-red-600' : ''}`}>
                {formatDate(task.deadline)}
                {isOverdue(task.deadline) && <span className="text-xs text-red-600 block">⚠️ Overdue</span>}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
