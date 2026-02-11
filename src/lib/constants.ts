export const membershipDurationOptions = [
  { value: "ONE_MONTH", label: "1 Month" },
  { value: "THREE_MONTHS", label: "3 Months" },
  { value: "SIX_MONTHS", label: "6 Months" },
  { value: "ONE_YEAR", label: "1 Year" },
] as const;

export const membershipTypeOptions = [
  { value: "WITH_PERSONAL_TRAINER", label: "With Personal Trainer" },
  { value: "WITHOUT_PERSONAL_TRAINER", label: "Without Personal Trainer" },
] as const;
export const membershipTypeValues = membershipTypeOptions.map(
  (option) => option.value
);

export const verificationStatusOptions = [
  { value: "PENDING", label: "Pending Verification" },
  { value: "VERIFIED", label: "Verified" },
] as const;
export const verificationStatusValues = verificationStatusOptions.map(
  (option) => option.value
);

export const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non_binary", label: "Non-binary" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
] as const;

export const membershipTypeLabels: Record<string, string> = {
  WITH_PERSONAL_TRAINER: "With Personal Trainer",
  WITHOUT_PERSONAL_TRAINER: "Without Personal Trainer",
};

export const membershipDurationLabels: Record<string, string> = {
  ONE_MONTH: "1 Month",
  THREE_MONTHS: "3 Months",
  SIX_MONTHS: "6 Months",
  ONE_YEAR: "1 Year",
};

export const verificationStatusLabels: Record<string, string> = {
  PENDING: "Pending Verification",
  VERIFIED: "Verified",
};
