export interface NotificationService {
  notify(message: string, type: "success" | "error" | "info"): void;
}
