import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { isAdminAuthConfigured, isAdminAuthenticated } from "@/lib/auth/server";

export default async function AdminLoginPage() {
  const authenticated = await isAdminAuthenticated();
  if (authenticated) {
    redirect("/admin");
  }

  const authConfigured = isAdminAuthConfigured();

  return (
    <div className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-md space-y-5">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-panel/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition hover:border-accent/50 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Intake Form
        </Link>

        {!authConfigured && (
          <div className="rounded-xl border border-danger/35 bg-danger/10 px-4 py-3 text-sm text-danger">
            Admin password is not configured. Add <code>ADMIN_PASSWORD</code> in
            your environment variables.
          </div>
        )}

        <div className="rounded-3xl border border-border bg-[linear-gradient(160deg,rgba(255,250,242,0.96),rgba(255,238,217,0.93))] p-5 sm:p-6">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
