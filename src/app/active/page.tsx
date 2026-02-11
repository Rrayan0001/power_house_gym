import { redirect } from "next/navigation";

export default function LegacyActivePage() {
  redirect("/admin/active");
}
