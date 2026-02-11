"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full min-h-[44px] rounded-xl border border-border bg-surface/70 px-3 py-2 text-base text-foreground",
          "focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 sm:text-sm",
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";
