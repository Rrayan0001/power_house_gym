"use client";

import { useRouter } from "next/navigation";
import { MemberForm } from "@/components/MemberForm";

export function AddMemberClient() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-surface/70 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-foreground">New Member</h3>
        <p className="text-sm text-muted-foreground">
          Capture full membership details for Power House.
        </p>
      </div>
      <div className="rounded-2xl border border-border bg-panel/60 p-4 sm:p-6">
        <MemberForm mode="create" onSuccess={() => router.push("/admin/members")} />
      </div>
    </div>
  );
}
