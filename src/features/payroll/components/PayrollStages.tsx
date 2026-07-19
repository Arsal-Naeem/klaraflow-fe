"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/utils/helpers";
import { PayrollStage } from "../types";

function Circle({ stage, index }: { stage: PayrollStage; index: number }) {
  return (
    <div
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
        stage.status === "complete" &&
          "border-transparent bg-primary text-primary-foreground",
        stage.status === "current" && "border-foreground text-foreground",
        stage.status === "upcoming" && "border-border text-muted-foreground",
      )}
    >
      {stage.status === "complete" ? (
        <Check className="h-4 w-4" />
      ) : (
        <span>{index + 1}</span>
      )}
    </div>
  );
}

export function PayrollStages({
  stages,
  orientation = "vertical",
}: {
  stages: PayrollStage[];
  orientation?: "vertical" | "horizontal";
}) {
  if (orientation === "horizontal") {
    return (
      <div className="flex w-full items-start">
        {stages.map((s, i) => (
          <React.Fragment key={s.key}>
            <div className="flex w-24 shrink-0 flex-col items-center gap-2 text-center">
              <Circle stage={s} index={i} />
              <p
                className={cn(
                  "text-xs font-medium",
                  s.status === "upcoming" && "text-muted-foreground",
                )}
              >
                {s.label}
              </p>
            </div>
            {i < stages.length - 1 && (
              <span
                className={cn(
                  "mt-4 h-0.5 flex-1",
                  s.status === "complete" ? "bg-foreground/40" : "bg-border",
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {stages.map((s, i) => (
        <div key={s.key} className="flex gap-3">
          <div className="flex flex-col items-center">
            <Circle stage={s} index={i} />
            {i < stages.length - 1 && (
              <span
                className={cn(
                  "my-1 w-0.5 flex-1",
                  s.status === "complete" ? "bg-foreground/40" : "bg-border",
                )}
              />
            )}
          </div>
          <div className="pb-6">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{s.label}</p>
              {s.status === "current" && (
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  In progress
                </span>
              )}
            </div>
            <p className="text-muted-foreground text-xs">{s.description}</p>
            {s.completedOn && (
              <p className="text-muted-foreground mt-0.5 text-[11px]">
                Completed {new Date(s.completedOn).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
