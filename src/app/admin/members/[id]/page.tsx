import { notFound } from "next/navigation";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { MemberDetailClient } from "@/components/MemberDetailClient";
import { serializeMember } from "@/lib/serialize";
import { DatabaseNotConfigured } from "@/components/DatabaseNotConfigured";

export default async function MemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  if (!isDatabaseConfigured || !prisma) {
    return (
      <div className="animate-fade-up">
        <DatabaseNotConfigured />
      </div>
    );
  }

  const member = await prisma.member.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!member) {
    notFound();
  }

  const serializedMember = serializeMember(member);

  return (
    <div className="animate-fade-up">
      <MemberDetailClient member={serializedMember} />
    </div>
  );
}
