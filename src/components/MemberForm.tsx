"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { createMember, updateMember } from "@/app/actions/members";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import {
  genderOptions,
  membershipDurationOptions,
  membershipTypeOptions,
} from "@/lib/constants";
import type { MemberInput } from "@/lib/validators";

export type MemberFormProps = {
  mode?: "create" | "edit";
  memberId?: string;
  initialData?: Partial<MemberInput>;
  onSuccess?: () => void;
  submitLabel?: string;
  createSuccessMessage?: string;
  editSuccessMessage?: string;
  successFeedback?: "inline" | "popup";
  successTitle?: string;
};

const emptyState: MemberInput = {
  name: "",
  contact: "",
  email: "",
  address: "",
  age: 18,
  gender: "",
  startDate: "",
  endDate: "",
  membershipDuration: "ONE_MONTH",
  membershipType: "WITHOUT_PERSONAL_TRAINER",
};

function RequiredMark() {
  return <span className="ml-1 text-danger">*</span>;
}

export function MemberForm({
  mode = "create",
  memberId,
  initialData,
  onSuccess,
  submitLabel,
  createSuccessMessage = "Member created successfully.",
  editSuccessMessage = "Member updated successfully.",
  successFeedback = "inline",
  successTitle = "Success",
}: MemberFormProps) {
  const [form, setForm] = React.useState<MemberInput>({
    ...emptyState,
    ...initialData,
  });
  const [pending, startTransition] = React.useTransition();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [popupMessage, setPopupMessage] = React.useState<string | null>(null);

  function handleChange<T extends keyof MemberInput>(
    key: T,
    value: MemberInput[T]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleMobileChange(value: string) {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
    handleChange("contact", digitsOnly);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (isSubmitting || pending) return;

    setMessage(null);
    setIsSubmitting(true);

    startTransition(async () => {
      try {
        if (mode === "edit" && !memberId) {
          setMessage("Missing member ID. Please refresh and try again.");
          return;
        }

        const result =
          mode === "create"
            ? await createMember(form)
            : await updateMember(memberId!, form);

        if (!result.ok) {
          setMessage(result.message ?? "Something went wrong.");
          return;
        }

        const successMessage =
          mode === "create" ? createSuccessMessage : editSuccessMessage;
        if (successFeedback === "popup") {
          setMessage(null);
          setPopupMessage(successMessage);
        } else {
          setMessage(successMessage);
        }

        if (mode === "create") {
          setForm(emptyState);
        }
        onSuccess?.();
      } finally {
        setIsSubmitting(false);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
      <p className="text-xs font-medium text-muted-foreground">
        Fields marked with <RequiredMark /> are compulsory.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold text-foreground">
          Full Name
          <RequiredMark />
          <Input
            value={form.name}
            onChange={(event) => handleChange("name", event.target.value)}
            placeholder="Member name"
            autoComplete="name"
            required
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-foreground">
          Mobile Number
          <RequiredMark />
          <Input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            pattern="[6-9][0-9]{9}"
            title="Enter a 10-digit mobile number starting with 6, 7, 8, or 9"
            autoComplete="tel-national"
            value={form.contact}
            onChange={(event) => handleMobileChange(event.target.value)}
            placeholder="10-digit mobile number"
            required
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-foreground">
          Email
          <RequiredMark />
          <Input
            type="email"
            value={form.email}
            onChange={(event) => handleChange("email", event.target.value)}
            placeholder="name@example.com"
            autoComplete="email"
            required
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-foreground">
          Age
          <RequiredMark />
          <Input
            type="number"
            min={12}
            value={form.age}
            onChange={(event) => handleChange("age", Number(event.target.value))}
            required
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-foreground">
          Gender
          <RequiredMark />
          <Select
            value={form.gender}
            onChange={(event) => handleChange("gender", event.target.value)}
            required
          >
            <option value="">Select gender</option>
            {genderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </label>

        <label className="space-y-2 text-sm font-semibold text-foreground md:col-span-2">
          Address
          <RequiredMark />
          <textarea
            value={form.address}
            onChange={(event) => handleChange("address", event.target.value)}
            placeholder="Street address"
            required
            className="min-h-[110px] w-full rounded-xl border border-border bg-surface/70 px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 sm:min-h-[96px] sm:text-sm"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-2 text-sm font-semibold text-foreground">
          Start Date
          <RequiredMark />
          <Input
            type="date"
            value={form.startDate}
            onChange={(event) => handleChange("startDate", event.target.value)}
            required
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-foreground">
          End Date
          <RequiredMark />
          <Input
            type="date"
            value={form.endDate}
            onChange={(event) => handleChange("endDate", event.target.value)}
            required
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-foreground">
          Duration
          <RequiredMark />
          <Select
            value={form.membershipDuration}
            onChange={(event) =>
              handleChange(
                "membershipDuration",
                event.target.value as MemberInput["membershipDuration"]
              )
            }
            required
          >
            {membershipDurationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold text-foreground">
          Membership Type
          <RequiredMark />
          <Select
            value={form.membershipType}
            onChange={(event) =>
              handleChange(
                "membershipType",
                event.target.value as MemberInput["membershipType"]
              )
            }
            required
          >
            {membershipTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </label>
      </div>

      {message && (
        <div className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground">
          {message}
        </div>
      )}

      <div className="flex items-center justify-end">
        <Button
          type="submit"
          disabled={pending || isSubmitting}
          className="w-full sm:w-auto"
        >
          {pending || isSubmitting
            ? "Saving..."
            : submitLabel ??
            (mode === "create" ? "Add Member" : "Update Member")}
        </Button>
      </div>

      <Modal
        open={Boolean(popupMessage)}
        onClose={() => setPopupMessage(null)}
        title={successTitle}
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-xl border border-border bg-surface/70 p-4">
            <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/15">
              <CheckCircle2 className="h-4 w-4 text-accent" />
            </span>
            <p className="text-sm text-foreground">{popupMessage}</p>
          </div>
          <div className="flex justify-end">
            <Button type="button" onClick={() => setPopupMessage(null)}>
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </form>
  );
}
