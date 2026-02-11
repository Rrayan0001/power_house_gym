import {
  membershipDurationLabels,
  membershipTypeLabels,
  verificationStatusLabels,
} from "@/lib/constants";

export function formatDate(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

export function formatMembershipType(value: string) {
  return membershipTypeLabels[value] ?? value;
}

export function formatMembershipDuration(value: string) {
  return membershipDurationLabels[value] ?? value;
}

export function formatVerificationStatus(value: string) {
  return verificationStatusLabels[value] ?? value;
}
