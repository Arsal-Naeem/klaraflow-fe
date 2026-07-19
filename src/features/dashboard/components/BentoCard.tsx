"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/utils/helpers";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
  noPadding?: boolean;
}

export function BentoCard({
  children,
  className,
  index = 0,
  noPadding = false,
}: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.06, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("min-w-0", className)}
    >
      <Card
        className={cn(
          "group relative h-full overflow-hidden border-border/60 transition-all duration-300 hover:border-border hover:shadow-md",
          !noPadding && "p-5"
        )}
      >
        {children}
      </Card>
    </motion.div>
  );
}

export function BentoCardHeader({
  icon: Icon,
  title,
  subtitle,
  action,
}: {
  icon?: React.ElementType;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-2">
      <div className="flex items-center gap-2.5 min-w-0">
        {Icon && (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold leading-none">{title}</h3>
          {subtitle && (
            <p className="mt-1 truncate text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {action}
    </div>
  );
}
