"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LogOut, Search, Shield } from "lucide-react";
import { logoutAdmin } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const titleMap: Record<string, string> = {
  "/admin": "Admin Dashboard",
  "/admin/members": "Members",
  "/admin/add-member": "Add Member",
  "/admin/active": "Active Memberships",
};

export function HeaderBar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = React.useState(searchParams.get("q") ?? "");
  const [loggingOut, startLogoutTransition] = React.useTransition();
  const title = titleMap[pathname] ?? "Member Profile";

  React.useEffect(() => {
    setValue(searchParams.get("q") ?? "");
  }, [searchParams]);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname);
    }, 300);

    return () => clearTimeout(handler);
  }, [value, pathname, router, searchParams]);

  function handleLogout() {
    startLogoutTransition(async () => {
      await logoutAdmin();
      router.replace("/admin/login");
      router.refresh();
    });
  }

  return (
    <header className="flex flex-col gap-3 border-b border-border bg-[linear-gradient(180deg,rgba(255,252,248,0.92),rgba(255,241,224,0.86))] px-4 py-4 sm:px-6 sm:py-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Power House
        </p>
        <h2 className="text-xl font-semibold brand-metal-text sm:text-2xl">{title}</h2>
      </div>
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-end lg:max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Search by name, mobile, or email"
            className="pl-9"
          />
        </div>
        <div className="hidden items-center justify-center rounded-xl border border-border bg-surface/70 px-4 py-2 text-xs font-semibold text-muted-foreground sm:flex">
          <Shield className="mr-2 h-4 w-4 text-accent" />
          Admin
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full sm:w-auto"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {loggingOut ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </header>
  );
}
