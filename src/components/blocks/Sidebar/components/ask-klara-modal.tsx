"use client";

import * as React from "react";
import { Search, Send } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AskKlaraModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AskKlaraModal({ open, onOpenChange }: AskKlaraModalProps) {
  const t = useTranslations("askKlara");
  const [query, setQuery] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // TODO: Implement actual search functionality
      console.log("Searching for:", query);
      // Reset the form and close modal
      setQuery("");
      onOpenChange(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" showCloseButton={false}>
        <DialogTitle className="flex items-center gap-2 hidden">
          <Search className="h-5 w-5" />
          Ask Klara
        </DialogTitle>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-md p-[2px]"
              style={{
                background:
                  "linear-gradient(90deg, #FF2394, #280595, #FF2394, #280595)",
                backgroundSize: "200% 200%",
                animation: "gradient-flow 3s ease-in-out infinite",
              }}
            >
              <div className="h-full w-full rounded-md bg-background"></div>
            </div>
            <div className="relative">
              <Input
                placeholder={t("placeholder")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-4 pr-12 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 relative z-10"
                autoFocus
              />
              <Button
                type="submit"
                size="sm"
                className="cursor-pointer absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 z-10 bg-gradient-to-r from-[#FF2394] to-[#280595] hover:from-[#FF2394]/90 hover:to-[#280595]/90 border-0"
                disabled={!query.trim()}
              >
                <Search className="h-3 w-3" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </div>
          <div className="text-xs text-muted-foreground text-center">
            Press{" "}
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>
              {t("shortcut")}
            </kbd>{" "}
            {t("shortcutLabel")}
          </div>
        </form>
      </DialogContent>
      <style jsx global>{`
        @keyframes gradient-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </Dialog>
  );
}
