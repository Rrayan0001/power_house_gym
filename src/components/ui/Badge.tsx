import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "accent" | "muted";
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        variant === "default" && "border-border text-foreground",
        variant === "accent" && "border-accent/40 text-accent",
        variant === "muted" && "border-border text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}
