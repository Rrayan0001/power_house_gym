import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { MembersTable } from "@/components/MemberTable";
import { serializeMember } from "@/lib/serialize";
import { DatabaseNotConfigured } from "@/components/DatabaseNotConfigured";

export default async function ActiveMembershipsPage() {
  const now = new Date();
  const members =
    !isDatabaseConfigured || !prisma
      ? []
      : await prisma.member.findMany({
          where: {
            endDate: { gte: now },
          },
          orderBy: { endDate: "asc" },
        });
  const serializedMembers = members.map(serializeMember);

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="rounded-2xl border border-border bg-surface/70 p-6">
        <h3 className="text-lg font-semibold text-foreground">Active Memberships</h3>
        <p className="text-sm text-muted-foreground">
          Members with ongoing plans.
        </p>
      </div>
      {!isDatabaseConfigured && <DatabaseNotConfigured />}
      <MembersTable members={serializedMembers} />
    </div>
  );
}
