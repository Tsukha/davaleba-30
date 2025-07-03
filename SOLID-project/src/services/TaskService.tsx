import type { Task } from "../types/Task";
import type { TaskRepository } from "../interfaces/TaskRepository";
import type { TaskValidator } from "../interfaces/TaskValidator";
import type { NotificationService } from "../interfaces/NotificationService";

export class TaskService {
  private repository: TaskRepository;
  private validator: TaskValidator;
  private notificationService: NotificationService;

  constructor(
    repository: TaskRepository,
    validator: TaskValidator,
    notificationService: NotificationService
  ) {
    this.repository = repository;
    this.validator = validator;
    this.notificationService = notificationService;
  }

  getAllTasks(): Task[] {
    return this.repository.getTasks();
  }

  createTask(taskData: Omit<Task, "id">): Task | null {
    const errors = this.validator.validate(taskData);
    if (errors.length > 0) {
      this.notificationService.notify(errors.join(", "), "error");
      return null;
    }

    const task = this.repository.addTask(taskData);
    this.notificationService.notify("Task created successfully!", "success");
    return task;
  }

  toggleTask(id: string): boolean {
    const tasks = this.repository.getTasks();
    const task = tasks.find((t) => t.id === id);
    if (!task) return false;

    this.repository.updateTask(id, { completed: !task.completed });
    this.notificationService.notify(
      `Task ${task.completed ? "uncompleted" : "completed"}!`,
      "info"
    );
    return true;
  }

  removeTask(id: string): boolean {
    const success = this.repository.deleteTask(id);
    if (success) {
      this.notificationService.notify("Task deleted!", "info");
    }
    return success;
  }
}
