"use client";

import { ClipboardList, ShieldCheck, Trophy } from "lucide-react";
import { MemberForm } from "@/components/MemberForm";

export function PublicIntakeClient() {
  return (
    <div className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-5xl space-y-6 sm:space-y-8">
        <section className="rounded-3xl border border-border bg-[linear-gradient(160deg,rgba(255,248,239,0.95),rgba(255,235,210,0.92))] p-5 sm:p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Power House Fitness Club
          </p>
          <h1 className="mt-2 text-3xl font-semibold brand-metal-text sm:text-5xl">
            Member Intake Questions
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
            Share your details and membership preferences. Admin verifies each
            submission before activation.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-[linear-gradient(165deg,rgba(255,248,238,0.94),rgba(255,237,218,0.9))] p-5">
            <ClipboardList className="h-5 w-5 text-accent" />
            <h2 className="mt-3 text-lg font-semibold">Answer Questions</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Provide your details, plan duration, and membership preferences.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-[linear-gradient(165deg,rgba(255,248,238,0.94),rgba(255,237,218,0.9))] p-5">
            <ShieldCheck className="h-5 w-5 text-accent" />
            <h2 className="mt-3 text-lg font-semibold">Admin Verification</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Admin reviews every submission and verifies records for accuracy.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-[linear-gradient(165deg,rgba(255,248,238,0.94),rgba(255,237,218,0.9))] p-5">
            <Trophy className="h-5 w-5 text-accent" />
            <h2 className="mt-3 text-lg font-semibold">Stored Securely</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Verified data is kept in the main member database for operations.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-[linear-gradient(150deg,rgba(255,250,242,0.96),rgba(255,238,217,0.93))] p-4 sm:p-8">
          <MemberForm
            mode="create"
            submitLabel="Submit Membership Request"
            successFeedback="popup"
            successTitle="Request Submitted"
            createSuccessMessage="Submission received. Your information is now pending admin verification."
          />
        </section>
      </div>
    </div>
  );
}
