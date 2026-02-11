import { AlertTriangle } from "lucide-react";

export function DatabaseNotConfigured() {
  return (
    <div className="rounded-2xl border border-danger/40 bg-danger/10 p-5 text-sm text-foreground">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 text-danger" />
        <div>
          <p className="font-semibold">Database is not configured</p>
          <p className="mt-1 text-muted-foreground">
            Add a valid DATABASE_URL in .env.local and restart the dev server.
          </p>
        </div>
      </div>
    </div>
  );
}
