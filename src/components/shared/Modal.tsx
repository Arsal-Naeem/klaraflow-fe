"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/utils/helpers";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Lightweight, dependency-free modal (no backend / no extra UI libs needed).
 * Includes the accent gradient top bar for on-brand styling.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  className,
}: ModalProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          "bg-popover text-popover-foreground relative z-10 w-full max-w-lg overflow-hidden rounded-xl border shadow-lg",
          className,
        )}
      >
        <div className="h-1 w-full bg-[linear-gradient(90deg,#ff2394_0%,#280595_100%)]" />
        <div className="p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              {title && <h2 className="text-lg font-semibold">{title}</h2>}
              {description && (
                <p className="text-muted-foreground text-sm">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
