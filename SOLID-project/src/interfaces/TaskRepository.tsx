import type { Task } from "../types/Task";

export interface TaskRepository {
  getTasks(): Task[];
  addTask(task: Omit<Task, "id">): Task;
  updateTask(id: string, updates: Partial<Task>): Task | null;
  deleteTask(id: string): boolean;
}
