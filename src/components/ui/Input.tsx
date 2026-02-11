"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full min-h-[44px] rounded-xl border border-border bg-surface/70 px-3 py-2 text-base text-foreground",
          "placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 sm:text-sm",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
