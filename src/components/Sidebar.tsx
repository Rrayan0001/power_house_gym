"use client";

import { usePathname, useRouter } from "next/navigation";
import { LayoutGrid, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutGrid },
  { href: "/admin/active", label: "Active Memberships", icon: Activity },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function isItemActive(href: string) {
    if (href === "/admin") {
      return (
        pathname === "/admin" ||
        pathname.startsWith("/admin/members") ||
        pathname.startsWith("/admin/add-member")
      );
    }
    if (href === "/admin/active") {
      return pathname.startsWith("/admin/active");
    }
    return pathname.startsWith(href);
  }

  return (
    <aside className="hidden h-screen w-64 flex-col border-r border-border bg-[linear-gradient(180deg,rgba(255,252,247,0.98),rgba(255,243,229,0.98))] p-6 lg:flex">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Power House
        </p>
        <h1 className="text-2xl font-semibold brand-metal-text">Gym Admin</h1>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = isItemActive(item.href);
          const Icon = item.icon;
          return (
            <button
              type="button"
              key={item.href}
              onClick={() => router.push(item.href)}
              className={cn(
                "group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium transition",
                isActive
                  ? "bg-accent/18 text-accent ring-1 ring-accent/30"
                  : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg border border-border",
                  isActive
                    ? "border-accent/45 bg-accent text-accent-foreground"
                    : "bg-surface/60"
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="mt-auto rounded-2xl border border-border bg-[linear-gradient(160deg,rgba(255,237,216,0.8),rgba(255,247,237,0.92))] p-4 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground">Gym Member Manager</p>
        <p className="mt-1">Strength-focused operations console.</p>
      </div>
    </aside>
  );
}
