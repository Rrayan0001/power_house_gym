"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { loginAdmin } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState<string | null>(null);
  const [pending, startTransition] = React.useTransition();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting || pending) return;

    setMessage(null);
    setIsSubmitting(true);

    startTransition(async () => {
      try {
        const result = await loginAdmin({ password });
        if (!result.ok) {
          setMessage(result.message ?? "Login failed.");
          return;
        }

        router.replace("/admin");
        router.refresh();
      } finally {
        setIsSubmitting(false);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-2xl border border-border bg-panel/70 p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Admin Access
        </p>
        <h1 className="mt-2 flex items-center gap-2 text-2xl font-semibold brand-metal-text">
          <ShieldCheck className="h-6 w-6 text-accent" />
          Power House Dashboard
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter the admin password to open the dashboard.
        </p>
      </div>

      <label className="block space-y-2 text-sm font-semibold text-foreground">
        Admin Password
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter admin password"
            className="pl-9"
            required
          />
        </div>
      </label>

      {message && (
        <div className="rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
          {message}
        </div>
      )}

      <Button type="submit" disabled={pending || isSubmitting} className="w-full">
        {pending || isSubmitting ? "Checking..." : "Login to Admin"}
      </Button>
    </form>
  );
}
