"use server";

import { z } from "zod";
import {
  clearAdminSession,
  createAdminSession,
  isAdminAuthConfigured,
  verifyAdminCredentials,
} from "@/lib/auth/server";

export type AuthActionResult = {
  ok: boolean;
  message?: string;
};

const adminLoginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export async function loginAdmin(
  input: z.infer<typeof adminLoginSchema>
): Promise<AuthActionResult> {
  if (!isAdminAuthConfigured()) {
    return {
      ok: false,
      message:
        "Admin auth is not configured. Set ADMIN_PASSWORD (and optionally AUTH_SECRET).",
    };
  }

  const parsed = adminLoginSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message };
  }

  const valid = await verifyAdminCredentials(parsed.data.password);
  if (!valid) {
    return { ok: false, message: "Incorrect admin password." };
  }

  await createAdminSession();
  return { ok: true };
}

export async function logoutAdmin(): Promise<AuthActionResult> {
  await clearAdminSession();
  return { ok: true };
}
