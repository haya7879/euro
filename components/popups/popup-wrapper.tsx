import React, { useEffect, useRef, ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PopupWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  maxWidth?: string;
  showCloseButton?: boolean;
}

/**
 * PopupWrapper Component
 * Accessible modal wrapper with SEO optimizations
 * Includes proper ARIA attributes, focus management, and keyboard navigation
 */
export default function PopupWrapper({
  isOpen,
  onClose,
  title,
  description,
  children,
  className = "",
  maxWidth = "max-w-[1152px]",
  showCloseButton = true,
}: PopupWrapperProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Store the previously focused element
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  // Focus management for accessibility
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    // Return focus to the previously focused element when modal closes
    return () => {
      if (!isOpen && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Trap focus within modal
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable?.focus();
          e.preventDefault();
        }
      }
    };

    modal.addEventListener("keydown", handleTab as EventListener);
    return () => modal.removeEventListener("keydown", handleTab as EventListener);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 z-[100] inset-0 bg-black/70 flex items-center justify-center p-4 overflow-y-auto md:p-4 max-md:items-start max-md:pt-8 max-md:p-2"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby={description ? "modal-description" : undefined}
    >
      {/* Modal Content */}
      <div
        ref={modalRef}
        className={cn(
          "bg-gradient-to-br from-[#f8faff] to-[#f0f4ff] w-full rounded-lg md:rounded-[18px] md:p-2.5 overflow-hidden relative mx-auto max-md:rounded-lg",
          maxWidth,
          className
        )}
        role="document"
      >
        {/* Hidden title for screen readers */}
        <h1 id="modal-title" className="sr-only">
          {title}
        </h1>
        {description && (
          <p id="modal-description" className="sr-only">
            {description}
          </p>
        )}

        {/* Close Button */}
        {showCloseButton && (
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-1 right-2.5 bg-none border-none text-sm text-[#6F6F6F] cursor-pointer z-10 p-2.5 rounded-full transition-all duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#3E5EC0] focus:ring-offset-2"
            aria-label={`Close ${title} dialog`}
            type="button"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
}

