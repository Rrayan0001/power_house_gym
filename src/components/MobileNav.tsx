"use client";

import { usePathname, useRouter } from "next/navigation";
import { LayoutGrid, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutGrid },
  { href: "/admin/active", label: "Active", icon: Activity },
];

export function MobileNav() {
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
    <nav className="fixed bottom-4 left-1/2 z-40 flex w-[92%] max-w-md -translate-x-1/2 items-center justify-around rounded-2xl border border-border bg-[linear-gradient(180deg,rgba(255,252,248,0.96),rgba(255,241,225,0.96))] px-4 py-3 shadow-[0_10px_24px_rgba(233,91,31,0.18)] lg:hidden">
      {navItems.map((item) => {
        const isActive = isItemActive(item.href);
        const Icon = item.icon;
        return (
          <button
            type="button"
            key={item.href}
            onClick={() => router.push(item.href)}
            className={cn(
              "flex flex-col items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em]",
              isActive ? "text-accent" : "text-muted-foreground"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <span
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-xl border border-border",
                isActive
                  ? "border-accent/45 bg-accent text-accent-foreground"
                  : "bg-surface/70"
              )}
            >
              <Icon className="h-4 w-4" />
            </span>
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
