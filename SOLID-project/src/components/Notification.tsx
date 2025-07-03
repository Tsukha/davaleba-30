import React from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${type}`}>
      {message}
      <button onClick={onClose} className="notification-close">
        ×
      </button>
    </div>
  );
};
