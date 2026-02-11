import { redirect } from "next/navigation";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { isAdminAuthenticated } from "@/lib/auth/server";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  return <AdminLayout>{children}</AdminLayout>;
}
