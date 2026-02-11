import { Sidebar } from "@/components/Sidebar";
import { HeaderBar } from "@/components/HeaderBar";
import { MobileNav } from "@/components/MobileNav";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(255,140,74,0.2),transparent_36%),radial-gradient(circle_at_88%_20%,rgba(255,168,85,0.18),transparent_34%)]" />
      <div className="relative flex">
        <Sidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <HeaderBar />
          <main className="flex-1 space-y-5 px-4 py-5 pb-24 sm:px-6 sm:py-7 lg:space-y-6 lg:pb-8">
            {children}
          </main>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
