import { useState } from 'react';

const TaskForm = ({ onSubmit, isLoading }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    if (title.trim().length < 3) {
      setError('Task title must be at least 3 characters');
      return;
    }

    try {
      await onSubmit(title.trim());
      setTitle('');
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to create task');
    }
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
    if (error) setError('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className={`form-input ${error ? 'form-input-error' : ''}`}
          placeholder="Enter a new task..."
          value={title}
          onChange={handleChange}
          disabled={isLoading}
          maxLength={200}
        />
        <button 
          type="submit" 
          className="btn-primary"
          disabled={isLoading || !title.trim()}
        >
          {isLoading ? 'Adding...' : 'Add Task'}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default TaskForm;