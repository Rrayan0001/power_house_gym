import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { FilterBar } from "@/components/FilterBar";
import { MembersTable } from "@/components/MemberTable";
import { serializeMember } from "@/lib/serialize";
import { DatabaseNotConfigured } from "@/components/DatabaseNotConfigured";
import {
  membershipTypeValues,
  verificationStatusValues,
} from "@/lib/constants";
import { Prisma, type MembershipType, type VerificationStatus } from "@prisma/client";

export default async function MembersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string; status?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.q?.trim();
  const type = resolvedSearchParams?.type?.trim() ?? "";
  const status = resolvedSearchParams?.status?.trim() ?? "";
  const membershipType = membershipTypeValues.includes(type as MembershipType)
    ? (type as MembershipType)
    : undefined;
  const verificationStatus = verificationStatusValues.includes(
    status as VerificationStatus
  )
    ? (status as VerificationStatus)
    : undefined;

  const where = {
    ...(query
      ? {
          OR: [
            { name: { contains: query, mode: Prisma.QueryMode.insensitive } },
            { contact: { contains: query, mode: Prisma.QueryMode.insensitive } },
            { email: { contains: query, mode: Prisma.QueryMode.insensitive } },
          ],
        }
      : {}),
    ...(membershipType ? { membershipType } : {}),
    ...(verificationStatus ? { verificationStatus } : {}),
  };

  const members =
    !isDatabaseConfigured || !prisma
      ? []
      : await prisma.member.findMany({
          where,
          orderBy: { createdAt: "desc" },
        });
  const serializedMembers = members.map(serializeMember);

  return (
    <div className="space-y-6 animate-fade-up">
      {!isDatabaseConfigured && <DatabaseNotConfigured />}
      <FilterBar />
      <MembersTable members={serializedMembers} />
    </div>
  );
}
