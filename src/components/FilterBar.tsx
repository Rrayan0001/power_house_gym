"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/utils";
import { membershipTypeOptions, verificationStatusOptions } from "@/lib/constants";

export function FilterBar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeType = searchParams.get("type") ?? "";
  const activeStatus = searchParams.get("status") ?? "";

  function updateType(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("type", value);
    } else {
      params.delete("type");
    }
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  }

  function updateStatus(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("status", value);
    } else {
      params.delete("status");
    }
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  }

  function clearFilters() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("type");
    params.delete("status");
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface/70 p-4">
      <div className="hidden flex-wrap items-center gap-3 md:flex">
        <Badge variant={activeType || activeStatus ? "accent" : "muted"}>
          Filters
        </Badge>
        {membershipTypeOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => updateType(option.value)}
            className={cn(
              "rounded-full border px-4 py-1 text-xs font-semibold transition",
              activeType === option.value
                ? "border-accent/50 bg-accent/15 text-accent"
                : "border-border text-muted-foreground hover:border-accent/30 hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        ))}
        {verificationStatusOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => updateStatus(option.value)}
            className={cn(
              "rounded-full border px-4 py-1 text-xs font-semibold transition",
              activeStatus === option.value
                ? "border-accent/50 bg-accent/15 text-accent"
                : "border-border text-muted-foreground hover:border-accent/30 hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        ))}
        {(activeType || activeStatus) && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        )}
      </div>
      <div className="grid w-full gap-3 sm:grid-cols-2">
        <Select
          value={activeType}
          onChange={(event) => updateType(event.target.value)}
        >
          <option value="">All Membership Types</option>
          {membershipTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <Select
          value={activeStatus}
          onChange={(event) => updateStatus(event.target.value)}
        >
          <option value="">All Verification Statuses</option>
          {verificationStatusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>
      {(activeType || activeStatus) && (
        <button
          type="button"
          onClick={clearFilters}
          className="w-full rounded-xl border border-border px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:border-accent/40 hover:text-foreground md:hidden"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
