import { useState } from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdateStatus, onDelete, isLoading }) => {
  const [activeTab, setActiveTab] = useState('todo');

  if (isLoading) {
    return (
      <div className="task-list">
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  const groupedTasks = {
    todo: tasks.filter(task => task.status === 'todo'),
    inprogress: tasks.filter(task => task.status === 'inprogress'),
    done: tasks.filter(task => task.status === 'done')
  };

  const currentTasks = groupedTasks[activeTab];

  return (
    <div className="task-list">
      <div className="tabs-container">
        <button
          className={`tab ${activeTab === 'todo' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('todo')}
        >
          Todo ({groupedTasks.todo.length})
        </button>
        <button
          className={`tab ${activeTab === 'inprogress' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('inprogress')}
        >
          In Progress ({groupedTasks.inprogress.length})
        </button>
        <button
          className={`tab ${activeTab === 'done' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('done')}
        >
          Done ({groupedTasks.done.length})
        </button>
      </div>

        {currentTasks.length === 0 ? (
          <div className="empty-state">No tasks in this section</div>
        ) : (
          <div className="tasks-grid">
            {currentTasks.map(task => (
              <TaskItem
                key={task._id}
                task={task}
                onUpdateStatus={onUpdateStatus}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
    </div>
  );
};

export default TaskList;