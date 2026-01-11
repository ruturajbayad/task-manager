import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { taskAPI } from './services/api';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await taskAPI.getTasks();
      setTasks(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (title) => {
    try {
      setIsCreating(true);
      setError(null);
      const response = await taskAPI.createTask(title);
      setTasks(prevTasks => [response.data, ...prevTasks]);
      toast.success('Task created');
    } catch (err) {
      setError(err.message || 'Failed to create task');
      throw err;
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateStatus = async (taskId, newStatus) => {
    const previousTasks = [...tasks];
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );

    try {
      await taskAPI.updateTaskStatus(taskId, newStatus);
      toast.success('Task status updated');
    } catch (err) {
      setTasks(previousTasks);
      setError(err.message || 'Failed to update task status');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const previousTasks = [...tasks];
    setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));

    try {
      await taskAPI.deleteTask(taskId);
      toast.success('Task deleted');
    } catch (err) {
      setTasks(previousTasks);
      setError(err.message || 'Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="app">
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <header className="app-header">
        <div className="container">
          <h1 className="app-title">Task Manager</h1>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {error && (
            <div className="error-banner">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="error-close">×</button>
            </div>
          )}

          <TaskForm onSubmit={handleCreateTask} isLoading={isCreating} />
          
          <TaskList
            tasks={tasks}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDeleteTask}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
}

export default App