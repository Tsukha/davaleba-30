import type { NotificationService } from "../interfaces/NotificationService";

export class SimpleNotificationService implements NotificationService {
  private callback: (
    message: string,
    type: "success" | "error" | "info"
  ) => void;

  constructor(
    callback: (message: string, type: "success" | "error" | "info") => void
  ) {
    this.callback = callback;
  }

  notify(message: string, type: "success" | "error" | "info"): void {
    this.callback(message, type);
  }
}
