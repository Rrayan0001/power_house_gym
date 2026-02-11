"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "ghost" | "danger";
};

export function IconButton({
  className,
  variant = "ghost",
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface/70 text-foreground transition",
        "hover:-translate-y-[1px] hover:bg-muted",
        variant === "danger" && "text-danger hover:bg-danger/10",
        className
      )}
      {...props}
    />
  );
}
