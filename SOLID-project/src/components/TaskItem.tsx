import React from "react";
import type { Task } from "../types/Task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
}) => {
  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""} priority-${
        task.priority
      }`}
    >
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
        />
        <span className="task-title">{task.title}</span>
        <span className="task-priority">{task.priority}</span>
      </div>
      <button onClick={() => onDelete(task.id)} className="delete-btn">
        ×
      </button>
    </div>
  );
};
