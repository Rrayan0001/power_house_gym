import type { Member } from "@prisma/client";

export function serializeMember(member: Member) {
  return {
    ...member,
    startDate: member.startDate.toISOString(),
    endDate: member.endDate.toISOString(),
    createdAt: member.createdAt.toISOString(),
    updatedAt: member.updatedAt.toISOString(),
  };
}
