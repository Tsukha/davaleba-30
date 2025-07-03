import type { Task } from "../types/Task";
import type { TaskValidator } from "../interfaces/TaskValidator";

export class TaskValidatorImpl implements TaskValidator {
  validate(task: Partial<Task>): string[] {
    const errors: string[] = [];

    if (!task.title || task.title.trim().length === 0) {
      errors.push("Title is required");
    }

    if (task.title && task.title.length > 100) {
      errors.push("Title must be less than 100 characters");
    }

    return errors;
  }
}
