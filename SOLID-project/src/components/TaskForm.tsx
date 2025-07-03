import React, { useState } from "react";
import type { Task } from "../types/Task";

interface TaskFormProps {
  onSubmit: (task: Omit<Task, "id">) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const handleSubmit = () => {
    onSubmit({
      title: title.trim(),
      priority,
      completed: false,
      createdAt: new Date(),
    });
    setTitle("");
    setPriority("medium");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="task-form">
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter task title..."
          className="task-input"
        />
        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "low" | "medium" | "high")
          }
          className="priority-select"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={handleSubmit} className="add-btn">
          Add Task
        </button>
      </div>
    </div>
  );
};
