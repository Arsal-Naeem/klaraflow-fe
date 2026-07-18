import * as React from "react";
import { cn } from "@/utils/helpers";

/**
 * GradientCard
 * A surface card that reveals the app's pink -> purple accent glow in the
 * bottom-right corner on hover (matches the Employees cards in the design).
 */
export function GradientCard({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card p-5 transition-all duration-300 hover:border-foreground/20 hover:shadow-lg",
        className,
      )}
      {...props}
    >
      {/* Purple/magenta accent glow -- fades in bottom-right on hover */}
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,35,148,0.28)_0%,rgba(40,5,149,0.38)_45%,transparent_70%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
