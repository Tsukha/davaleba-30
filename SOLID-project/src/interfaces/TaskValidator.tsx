import type { Task } from "../types/Task";

export interface TaskValidator {
  validate(task: Partial<Task>): string[];
}
