"use server";

import { revalidatePath } from "next/cache";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { memberInputSchema, type MemberInput } from "@/lib/validators";

export type ActionResult = {
  ok: boolean;
  message?: string;
};

function revalidateMemberPaths(memberId?: string) {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/members");
  revalidatePath("/admin/active");
  if (memberId) {
    revalidatePath(`/admin/members/${memberId}`);
  }
}

export async function createMember(input: MemberInput): Promise<ActionResult> {
  if (!isDatabaseConfigured || !prisma) {
    return {
      ok: false,
      message: "Database is not configured. Add DATABASE_URL in .env.local.",
    };
  }

  const parsed = memberInputSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message };
  }

  const data = parsed.data;
  const existing = await prisma.member.findFirst({
    where: {
      OR: [
        { contact: data.contact },
        { email: { equals: data.email, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      contact: true,
      email: true,
    },
  });

  if (existing) {
    if (existing.contact === data.contact) {
      return {
        ok: false,
        message: "Mobile number already exists. Duplicate entry is not allowed.",
      };
    }
    return {
      ok: false,
      message: "Email already exists. Duplicate entry is not allowed.",
    };
  }

  await prisma.member.create({
    data: {
      name: data.name,
      contact: data.contact,
      email: data.email,
      address: data.address,
      age: data.age,
      gender: data.gender,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      membershipDuration: data.membershipDuration,
      membershipType: data.membershipType,
      verificationStatus: "PENDING",
    },
  });

  revalidateMemberPaths();

  return { ok: true };
}

export async function updateMember(
  id: string,
  input: MemberInput
): Promise<ActionResult> {
  if (!isDatabaseConfigured || !prisma) {
    return {
      ok: false,
      message: "Database is not configured. Add DATABASE_URL in .env.local.",
    };
  }

  const parsed = memberInputSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message };
  }

  const data = parsed.data;
  const duplicate = await prisma.member.findFirst({
    where: {
      id: { not: id },
      OR: [
        { contact: data.contact },
        { email: { equals: data.email, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      contact: true,
      email: true,
    },
  });

  if (duplicate) {
    if (duplicate.contact === data.contact) {
      return {
        ok: false,
        message: "Mobile number already exists. Duplicate entry is not allowed.",
      };
    }
    return {
      ok: false,
      message: "Email already exists. Duplicate entry is not allowed.",
    };
  }

  await prisma.member.update({
    where: { id },
    data: {
      name: data.name,
      contact: data.contact,
      email: data.email,
      address: data.address,
      age: data.age,
      gender: data.gender,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      membershipDuration: data.membershipDuration,
      membershipType: data.membershipType,
    },
  });

  revalidateMemberPaths(id);

  return { ok: true };
}

export async function deleteMember(id: string): Promise<ActionResult> {
  if (!isDatabaseConfigured || !prisma) {
    return {
      ok: false,
      message: "Database is not configured. Add DATABASE_URL in .env.local.",
    };
  }

  await prisma.member.delete({
    where: { id },
  });

  revalidateMemberPaths(id);

  return { ok: true };
}

export async function verifyMember(id: string): Promise<ActionResult> {
  if (!isDatabaseConfigured || !prisma) {
    return {
      ok: false,
      message: "Database is not configured. Add DATABASE_URL in .env.local.",
    };
  }

  await prisma.member.update({
    where: { id },
    data: {
      verificationStatus: "VERIFIED",
    },
  });

  revalidateMemberPaths(id);

  return { ok: true };
}
