import { useState } from 'react';
import { FaTrashAlt, FaCheckCircle } from "react-icons/fa";

const TaskItem = ({ task, onUpdateStatus, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleMoveToInProgress = async () => {
    setIsUpdating(true);
    try {
      await onUpdateStatus(task._id, 'inprogress');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleMoveToDone = async () => {
    setIsUpdating(true);
    try {
      await onUpdateStatus(task._id, 'done');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
      setIsDeleting(true);
      try {
        await onDelete(task._id);
      } catch (error) {
        setIsDeleting(false);
      }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`task-card ${isDeleting ? 'task-card-deleting' : ''}`}>
      <div className="task-card-content">
        <h3 className="task-card-title">{task.title}</h3>
        <p className="task-card-date">{formatDate(task.createdAt)}</p>
      </div>
      
      <div className="task-card-actions">
        {task.status === 'todo' && (
          <button 
            className="btn-action btn-move-progress"
            onClick={handleMoveToInProgress}
            disabled={isUpdating}
          >
            {isUpdating ? 'Moving...' : 'Move to In Progress'}
          </button>
        )}
        
        {task.status === 'inprogress' && (
          <button 
            className="btn-action btn-move-done"
            onClick={handleMoveToDone}
            disabled={isUpdating}
          >
            {isUpdating ? 'Moving...' : 'Move to Done'}
          </button>
        )}
        
        {task.status === 'done' && (
          <div className="done-indicator">
            <FaCheckCircle />
          </div>
        )}
        
        <button 
          className="btn-delete-icon"
          onClick={handleDelete}
          disabled={isDeleting}
          title="Delete task"
        >
          {isDeleting ? '...' : <FaTrashAlt />}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;