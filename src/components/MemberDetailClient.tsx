"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { deleteMember, verifyMember } from "@/app/actions/members";
import { ActionModal } from "@/components/ActionModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MemberForm } from "@/components/MemberForm";
import type { MemberRow } from "@/components/MemberTable";
import { formatVerificationStatus } from "@/lib/format";
import type { MemberInput } from "@/lib/validators";

function toDateInput(value: string) {
  const date = new Date(value);
  return date.toISOString().split("T")[0] ?? "";
}

function toFormDefaults(member: MemberRow): Partial<MemberInput> {
  return {
    name: member.name,
    contact: member.contact,
    email: member.email ?? "",
    address: member.address,
    age: member.age,
    gender: member.gender,
    startDate: toDateInput(member.startDate),
    endDate: toDateInput(member.endDate),
    membershipDuration: member.membershipDuration as MemberInput["membershipDuration"],
    membershipType: member.membershipType as MemberInput["membershipType"],
  };
}

export function MemberDetailClient({ member }: { member: MemberRow }) {
  const router = useRouter();
  const [openDelete, setOpenDelete] = React.useState(false);
  const [status, setStatus] = React.useState(member.verificationStatus);
  const [pending, startTransition] = React.useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteMember(member.id);
      router.push("/admin/members");
    });
  }

  function handleVerify() {
    startTransition(async () => {
      const result = await verifyMember(member.id);
      if (result.ok) {
        setStatus("VERIFIED");
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-surface/70 p-4 sm:p-6 md:flex-row md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Member Profile
          </p>
          <h3 className="text-2xl font-semibold text-foreground">{member.name}</h3>
          <p className="text-sm text-muted-foreground">{member.contact}</p>
          <p className="text-sm text-muted-foreground">{member.email ?? "-"}</p>
          <div className="mt-3">
            <Badge variant={status === "VERIFIED" ? "accent" : "muted"}>
              {formatVerificationStatus(status)}
            </Badge>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
          {status !== "VERIFIED" && (
            <Button onClick={handleVerify} disabled={pending} className="w-full sm:w-auto">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Verify Member
            </Button>
          )}
          <Button
            variant="danger"
            onClick={() => setOpenDelete(true)}
            className="w-full sm:w-auto"
          >
            Delete Member
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-panel/60 p-4 sm:p-6">
        <MemberForm
          mode="edit"
          memberId={member.id}
          initialData={toFormDefaults(member)}
        />
      </div>

      <ActionModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        title="Delete Member"
        description="This action permanently removes the member record."
        confirmText={pending ? "Deleting..." : "Delete"}
        confirmVariant="danger"
        onConfirm={handleDelete}
      >
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete {member.name}? This cannot be undone.
        </p>
      </ActionModal>
    </div>
  );
}
