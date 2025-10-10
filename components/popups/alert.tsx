"use client";

import React, { useEffect, useRef } from "react";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePopupStore } from "@/store/popup-store";

export interface AlertData {
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  showCloseButton?: boolean;
  autoClose?: boolean;
  duration?: number;
}

const alertIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const alertStyles = {
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
};

const iconStyles = {
  success: "text-green-600",
  error: "text-red-600",
  warning: "text-yellow-600",
  info: "text-blue-600",
};

const alertLabels = {
  success: "Success notification",
  error: "Error notification",
  warning: "Warning notification",
  info: "Information notification",
};

/**
 * AlertPopup Component
 * Accessible notification component with ARIA support
 * SEO-friendly with proper semantic structure
 */
export default function AlertPopup() {
  const { alertData, closeAlert } = usePopupStore();
  const alertRef = useRef<HTMLDivElement>(null);

  // Auto close functionality
  useEffect(() => {
    if (alertData?.autoClose !== false && alertData?.duration) {
      const timer = setTimeout(() => {
        closeAlert();
      }, alertData.duration || 5000);

      return () => clearTimeout(timer);
    }
  }, [alertData, closeAlert]);

  // Focus management for accessibility
  useEffect(() => {
    if (alertData && alertRef.current) {
      alertRef.current.focus();
    }
  }, [alertData]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && alertData) {
        closeAlert();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [alertData, closeAlert]);

  if (!alertData) return null;

  const Icon = alertIcons[alertData.type];

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="alert-title"
      aria-describedby={alertData.message ? "alert-message" : undefined}
    >
      <div
        ref={alertRef}
        className={cn(
          "min-w-[320px] max-w-[480px] w-full mx-4",
          "bg-white rounded-lg border-2",
          "animate-in zoom-in-95 duration-300",
          alertStyles[alertData.type]
        )}
        role="alert"
        aria-live="polite"
        aria-atomic="true"
        aria-label={alertLabels[alertData.type]}
        tabIndex={-1}
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <Icon 
              className={cn("w-8 h-8 flex-shrink-0 mt-1", iconStyles[alertData.type])} 
              aria-hidden="true"
            />
            <div className="flex-1 min-w-0">
              <h3 
                id="alert-title"
                className="font-medium text-xl mb-2"
              >
                {alertData.title}
              </h3>
              {alertData.message && (
                <p 
                  id="alert-message"
                  className="text-base opacity-90 leading-relaxed"
                >
                  {alertData.message}
                </p>
              )}
            </div>
            {(alertData.showCloseButton !== false) && (
              <button
                onClick={closeAlert}
                className={cn(
                  "flex-shrink-0 p-2 rounded-full hover:bg-black/10 transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2",
                  iconStyles[alertData.type]
                )}
                aria-label="Close notification"
                type="button"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
