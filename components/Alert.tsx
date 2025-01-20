"use client";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";
import type { FC, ReactNode } from "react";
import React from "react";

type AlertType = "info" | "success" | "warning" | "error";

interface AlertProps {
  children: ReactNode;
  type?: AlertType;
  title?: string;
  dismissible?: boolean;
}

const Alert: FC<AlertProps> = ({
  children,
  type = "info",
  title,
  dismissible = false,
}) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(true);

  if (!isVisible) return null;

  const styles: Record<AlertType, string> = {
    info: "bg-blue-50 text-blue-800 border-blue-200",
    success: "bg-green-50 text-green-800 border-green-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    error: "bg-red-50 text-red-800 border-red-200",
  };

  const icons: Record<AlertType, React.ReactElement> = {
    info: <Info className="w-5 h-5" />,
    success: <CheckCircle2 className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
  };

  const defaultTitles: Record<AlertType, string> = {
    info: "Info",
    success: "Success",
    warning: "Warning",
    error: "Error",
  };

  return (
    <div className={`rounded-lg border p-4 my-4 ${styles[type]}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icons[type]}
          <span className="font-medium">{title || defaultTitles[type]}</span>
        </div>
        {dismissible && (
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:opacity-80 transition-opacity"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="mt-2 text-sm">{children}</div>
    </div>
  );
};

export default Alert;
