import { z } from "zod";

const indianMobileRegex = /^[6-9][0-9]{9}$/;

export const memberInputSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  contact: z
    .string()
    .trim()
    .regex(
      indianMobileRegex,
      "Mobile number must be 10 digits and start with 6, 7, 8, or 9"
    ),
  email: z.string().trim().toLowerCase().email("Valid email is required"),
  address: z.string().trim().min(1, "Address is required"),
  age: z.coerce.number().int().min(12, "Age must be at least 12"),
  gender: z.string().trim().min(1, "Gender is required"),
  startDate: z.string().trim().min(1, "Start date is required"),
  endDate: z.string().trim().min(1, "End date is required"),
  membershipDuration: z.enum(["ONE_MONTH", "THREE_MONTHS", "SIX_MONTHS", "ONE_YEAR"]),
  membershipType: z.enum(["WITH_PERSONAL_TRAINER", "WITHOUT_PERSONAL_TRAINER"]),
});

export type MemberInput = z.infer<typeof memberInputSchema>;
