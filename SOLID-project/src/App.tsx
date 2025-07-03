import React, { useState } from "react";
import type { Task } from "./types/Task";
import { TaskService } from "./services/TaskService";
import { InMemoryTaskRepository } from "./implementations/InMemoryTaskRepository";
import { TaskValidatorImpl } from "./implementations/TaskValidatorImpl";
import { SimpleNotificationService } from "./implementations/SimpleNotificationService";
import { TaskItem } from "./components/TaskItem";
import { TaskForm } from "./components/TaskForm";
import { Notification } from "./components/Notification";
import "./App.css";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  // Dependency Injection
  const taskService = React.useMemo(() => {
    const repository = new InMemoryTaskRepository();
    const validator = new TaskValidatorImpl();
    const notificationService = new SimpleNotificationService((message, type) =>
      setNotification({ message, type })
    );

    return new TaskService(repository, validator, notificationService);
  }, []);

  // Load initial tasks
  React.useEffect(() => {
    setTasks(taskService.getAllTasks());
  }, [taskService]);

  const handleAddTask = (taskData: Omit<Task, "id">) => {
    const newTask = taskService.createTask(taskData);
    if (newTask) {
      setTasks(taskService.getAllTasks());
    }
  };

  const handleToggleTask = (id: string) => {
    taskService.toggleTask(id);
    setTasks(taskService.getAllTasks());
  };

  const handleDeleteTask = (id: string) => {
    taskService.removeTask(id);
    setTasks(taskService.getAllTasks());
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>SOLID Task Manager</h1>

        <TaskForm onSubmit={handleAddTask} />

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-state">No tasks yet. Add one above!</p>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </div>

        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={handleCloseNotification}
          />
        )}
      </div>
    </div>
  );
};

export default App;
