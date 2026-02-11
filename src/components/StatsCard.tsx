import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type StatsCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  accent?: "blue" | "red" | "steel";
};

const accentStyles: Record<string, string> = {
  blue: "text-accent bg-accent/20 border-accent/40",
  red: "text-danger bg-danger/20 border-danger/40",
  steel: "text-foreground bg-muted/55 border-border",
};

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  accent = "steel",
}: StatsCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-[linear-gradient(155deg,rgba(255,248,238,0.95),rgba(255,237,214,0.9))] p-5 transition hover:-translate-y-1 hover:border-accent/45">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {title}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-foreground">{value}</h3>
          {description && (
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl border",
            accentStyles[accent]
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition group-hover:opacity-100" />
    </div>
  );
}
