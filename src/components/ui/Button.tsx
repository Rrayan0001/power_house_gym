"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-[44px] items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" &&
          "bg-gradient-to-r from-[#ff8731] via-[#eb5a22] to-[#cf3d1a] text-[#fffaf2] shadow-[0_10px_24px_rgba(232,91,31,0.25)] hover:-translate-y-[1px] hover:brightness-105",
        variant === "secondary" &&
          "bg-panel text-foreground ring-1 ring-border hover:-translate-y-[1px] hover:border-accent/35 hover:bg-surface/80",
        variant === "ghost" &&
          "bg-transparent text-foreground hover:bg-muted/60",
        variant === "danger" &&
          "bg-gradient-to-r from-[#aa1010] to-[#d11f1f] text-white hover:brightness-110",
        className
      )}
      {...props}
    />
  );
}
