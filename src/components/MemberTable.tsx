"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Eye, Pencil, Trash2 } from "lucide-react";
import { deleteMember, verifyMember } from "@/app/actions/members";
import { ActionModal } from "@/components/ActionModal";
import { IconButton } from "@/components/IconButton";
import { Button } from "@/components/ui/Button";
import { MemberForm } from "@/components/MemberForm";
import { Badge } from "@/components/ui/Badge";
import {
  formatDate,
  formatMembershipDuration,
  formatMembershipType,
  formatVerificationStatus,
} from "@/lib/format";
import type { MemberInput } from "@/lib/validators";

export type MemberRow = {
  id: string;
  name: string;
  contact: string;
  email: string | null;
  address: string;
  age: number;
  gender: string;
  startDate: string;
  endDate: string;
  membershipDuration: string;
  membershipType: string;
  verificationStatus: string;
};

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

export function MemberTable({ members }: { members: MemberRow[] }) {
  const router = useRouter();
  const [viewMember, setViewMember] = React.useState<MemberRow | null>(null);
  const [editMember, setEditMember] = React.useState<MemberRow | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<MemberRow | null>(null);
  const [verifyingId, setVerifyingId] = React.useState<string | null>(null);
  const [deleting, startTransition] = React.useTransition();

  function handleDelete() {
    if (!deleteTarget) return;
    startTransition(async () => {
      await deleteMember(deleteTarget.id);
      setDeleteTarget(null);
    });
  }

  function handleVerify(id: string) {
    setVerifyingId(id);
    startTransition(async () => {
      try {
        await verifyMember(id);
      } finally {
        setVerifyingId(null);
      }
    });
  }

  return (
    <div className="rounded-2xl border border-border bg-panel/60">
      <div className="flex flex-col gap-3 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Member Directory</h3>
          <p className="text-sm text-muted-foreground">
            Manage current and past memberships.
          </p>
        </div>
      </div>

      {members.length === 0 ? (
        <div className="px-5 py-8 text-center text-sm text-muted-foreground">
          No members found. Adjust filters and refresh.
        </div>
      ) : (
        <>
          <div className="space-y-3 p-4 md:hidden">
            {members.map((member) => (
              <article key={member.id} className="rounded-xl border border-border bg-panel/85 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-base font-semibold text-foreground">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.contact}</p>
                    <p className="text-sm text-muted-foreground">{member.email ?? "-"}</p>
                  </div>
                  <Badge
                    variant={member.verificationStatus === "VERIFIED" ? "accent" : "muted"}
                  >
                    {formatVerificationStatus(member.verificationStatus)}
                  </Badge>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div>
                    <p className="uppercase tracking-[0.12em]">Membership</p>
                    <p className="mt-1 text-foreground">
                      {formatMembershipType(member.membershipType)}
                    </p>
                  </div>
                  <div>
                    <p className="uppercase tracking-[0.12em]">Duration</p>
                    <p className="mt-1 text-foreground">
                      {formatMembershipDuration(member.membershipDuration)}
                    </p>
                  </div>
                  <div>
                    <p className="uppercase tracking-[0.12em]">Start</p>
                    <p className="mt-1 text-foreground">{formatDate(member.startDate)}</p>
                  </div>
                  <div>
                    <p className="uppercase tracking-[0.12em]">End</p>
                    <p className="mt-1 text-foreground">{formatDate(member.endDate)}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {member.verificationStatus !== "VERIFIED" && (
                    <Button
                      onClick={() => handleVerify(member.id)}
                      disabled={verifyingId === member.id}
                      className="col-span-2"
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      {verifyingId === member.id ? "Verifying..." : "Verify Member"}
                    </Button>
                  )}
                  <Button variant="secondary" onClick={() => setViewMember(member)}>
                    View
                  </Button>
                  <Button variant="secondary" onClick={() => setEditMember(member)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => setDeleteTarget(member)}
                    className="col-span-2"
                  >
                    Delete
                  </Button>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full text-left text-sm">
              <thead className="sticky top-0 bg-panel/95 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Mobile</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Gender</th>
                  <th className="px-5 py-3">Membership</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Start Date</th>
                  <th className="px-5 py-3">End Date</th>
                  <th className="px-5 py-3">Duration</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr
                    key={member.id}
                    className="border-t border-border/60 transition hover:bg-muted/40"
                  >
                    <td className="px-5 py-4 font-semibold text-foreground">{member.name}</td>
                    <td className="px-5 py-4 text-muted-foreground">{member.contact}</td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {member.email ?? "-"}
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant="muted">{member.gender}</Badge>
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant="accent">
                        {formatMembershipType(member.membershipType)}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <Badge
                        variant={
                          member.verificationStatus === "VERIFIED" ? "accent" : "muted"
                        }
                      >
                        {formatVerificationStatus(member.verificationStatus)}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {formatDate(member.startDate)}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {formatDate(member.endDate)}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {formatMembershipDuration(member.membershipDuration)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {member.verificationStatus !== "VERIFIED" && (
                          <IconButton
                            onClick={() => handleVerify(member.id)}
                            aria-label="Verify member"
                            title="Verify member"
                            disabled={verifyingId === member.id}
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </IconButton>
                        )}
                        <IconButton onClick={() => setViewMember(member)}>
                          <Eye className="h-4 w-4" />
                        </IconButton>
                        <IconButton onClick={() => setEditMember(member)}>
                          <Pencil className="h-4 w-4" />
                        </IconButton>
                        <IconButton
                          variant="danger"
                          onClick={() => setDeleteTarget(member)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <ActionModal
        open={!!viewMember}
        onClose={() => setViewMember(null)}
        title="Member Profile"
        description="Full membership overview"
        footer={false}
      >
        {viewMember && (
          <div className="space-y-6">
            <div className="grid gap-4 text-sm text-muted-foreground md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em]">Name</p>
                <p className="text-foreground">{viewMember.name}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em]">Contact</p>
                <p className="text-foreground">{viewMember.contact}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em]">Email</p>
                <p className="text-foreground">{viewMember.email ?? "-"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em]">Gender</p>
                <p className="text-foreground">{viewMember.gender}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em]">Age</p>
                <p className="text-foreground">{viewMember.age}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em]">Membership</p>
                <p className="text-foreground">
                  {formatMembershipType(viewMember.membershipType)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em]">Status</p>
                <p className="text-foreground">
                  {formatVerificationStatus(viewMember.verificationStatus)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em]">Duration</p>
                <p className="text-foreground">
                  {formatMembershipDuration(viewMember.membershipDuration)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em]">Start Date</p>
                <p className="text-foreground">{formatDate(viewMember.startDate)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em]">End Date</p>
                <p className="text-foreground">{formatDate(viewMember.endDate)}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs uppercase tracking-[0.2em]">Address</p>
                <p className="text-foreground">{viewMember.address}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => router.push(`/admin/members/${viewMember.id}`)}>
                View Full Profile
              </Button>
            </div>
          </div>
        )}
      </ActionModal>

      <ActionModal
        open={!!editMember}
        onClose={() => setEditMember(null)}
        title="Edit Member"
        description="Update member information"
        footer={false}
      >
        {editMember && (
          <MemberForm
            mode="edit"
            memberId={editMember.id}
            initialData={toFormDefaults(editMember)}
            onSuccess={() => setEditMember(null)}
          />
        )}
      </ActionModal>

      <ActionModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Member"
        description="This action permanently removes the member record."
        confirmText={deleting ? "Deleting..." : "Delete"}
        confirmVariant="danger"
        onConfirm={handleDelete}
      >
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete {deleteTarget?.name}? This cannot be undone.
        </p>
      </ActionModal>
    </div>
  );
}

export const MembersTable = MemberTable;
