import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { StatsCard } from "@/components/StatsCard";
import { FilterBar } from "@/components/FilterBar";
import { MembersTable } from "@/components/MemberTable";
import { Users, Flame, Timer, UserCheck, ShieldAlert } from "lucide-react";
import { serializeMember } from "@/lib/serialize";
import { DatabaseNotConfigured } from "@/components/DatabaseNotConfigured";
import {
  membershipTypeValues,
  verificationStatusValues,
} from "@/lib/constants";
import { Prisma, type MembershipType, type VerificationStatus } from "@prisma/client";

export default async function DashboardPage({
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
  const now = new Date();
  const soon = new Date();
  soon.setDate(now.getDate() + 14);

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

  const [
    members,
    totalMembers,
    activeMembers,
    expiringSoon,
    trainerMembers,
    pendingMembers,
  ] =
    !isDatabaseConfigured || !prisma
      ? [[], 0, 0, 0, 0, 0]
      : await prisma.$transaction([
        prisma.member.findMany({
          where,
          orderBy: { createdAt: "desc" },
        }),
        prisma.member.count(),
        prisma.member.count({
          where: {
            endDate: { gte: now },
          },
        }),
        prisma.member.count({
          where: {
            endDate: { gte: now, lte: soon },
          },
        }),
        prisma.member.count({
          where: {
            membershipType: "WITH_PERSONAL_TRAINER",
          },
        }),
        prisma.member.count({
          where: {
            verificationStatus: "PENDING",
          },
        }),
      ]);

  const serializedMembers = members.map(serializeMember);

  return (
    <div className="space-y-6 animate-fade-up">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatsCard
          title="Total Members"
          value={totalMembers}
          description="All registered members"
          icon={Users}
          accent="steel"
        />
        <StatsCard
          title="Active Memberships"
          value={activeMembers}
          description="Currently in training"
          icon={Flame}
          accent="blue"
        />
        <StatsCard
          title="Expiring Soon"
          value={expiringSoon}
          description="Next 14 days"
          icon={Timer}
          accent="red"
        />
        <StatsCard
          title="Personal Trainer"
          value={trainerMembers}
          description="Premium coaching"
          icon={UserCheck}
          accent="steel"
        />
        <StatsCard
          title="Pending Verification"
          value={pendingMembers}
          description="Needs admin approval"
          icon={ShieldAlert}
          accent="red"
        />
      </section>

      {!isDatabaseConfigured && <DatabaseNotConfigured />}
      <FilterBar />
      <MembersTable members={serializedMembers} />
    </div>
  );
}
