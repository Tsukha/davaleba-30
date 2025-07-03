import type { Task } from "../types/Task";
import type { TaskRepository } from "../interfaces/TaskRepository";

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [];
  private nextId = 1;

  getTasks(): Task[] {
    return [...this.tasks];
  }

  addTask(taskData: Omit<Task, "id">): Task {
    const task: Task = {
      ...taskData,
      id: (this.nextId++).toString(),
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, updates: Partial<Task>): Task | null {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;

    this.tasks[index] = { ...this.tasks[index], ...updates };
    return this.tasks[index];
  }

  deleteTask(id: string): boolean {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;

    this.tasks.splice(index, 1);
    return true;
  }
}
