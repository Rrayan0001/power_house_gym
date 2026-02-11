import { redirect } from "next/navigation";

export default async function LegacyMemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  redirect(`/admin/members/${resolvedParams.id}`);
}
