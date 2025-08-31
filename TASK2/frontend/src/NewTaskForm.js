import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

function NewTaskForm({ newTask, onSubmit, isEditing = false }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: newTask,
  });

  useEffect(() => {
    reset(newTask);
  }, [newTask, reset]);

  const handleFormSubmit = (data) => {
    if (data.deadline) {
      data.deadline = new Date(data.deadline).toISOString();
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Task Title *</label>
        <input
          type="text"
          {...register("title", { required: true })}
          required
          autoFocus
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          {...register("description")}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
        <select
          {...register("priority")}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          {...register("status")}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="review">Review</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
        <input
          type="text"
          {...register("assigned_to")}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
        <input
          type="datetime-local"
          {...register("deadline")}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Hours</label>
        <input
          type="number"
          {...register("estimated_hours", { valueAsNumber: true })}
          min="0"
          step="0.5"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {isEditing && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time Spent (hours)</label>
          <input
            type="number"
            {...register("time_spent", { valueAsNumber: true })}
            min="0"
            step="0.5"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          {isEditing ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
}

export default NewTaskForm;