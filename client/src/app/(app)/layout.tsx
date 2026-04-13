"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { PageSpinner } from "@/components/ui/Spinner";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MailWarning } from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [levelChanging, setLevelChanging] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
    } else if (!user.onboardingComplete) {
      router.replace("/onboarding");
    }
  }, [user, loading, router]);

  // Close drawer on navigation (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (loading) return <PageSpinner />;
  if (!user || !user.onboardingComplete) return null;

  return (
    <div className="flex min-h-screen bg-zinc-950">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLevelChanging={setLevelChanging}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Email verification banner */}
        {user && !user.isEmailVerified && (
          <div className="flex items-center justify-between gap-3 px-4 py-2 bg-amber-950/60 border-b border-amber-800/50 text-xs text-amber-300">
            <span className="flex items-center gap-1.5">
              <MailWarning size={13} className="shrink-0" />
              Your email is not verified.
            </span>
            <Link
              href="/verify-email"
              className="underline underline-offset-2 hover:text-amber-200 transition-colors shrink-0"
            >
              Verify now
            </Link>
          </div>
        )}

        {/* Level-switch loading bar */}
        <div className="h-0.5 w-full bg-transparent overflow-hidden">
          {levelChanging && (
            <div className="h-full w-full bg-violet-500 animate-pulse" />
          )}
        </div>

        <main
          className={cn(
            "flex-1 p-4 md:p-6 overflow-auto transition-opacity duration-300",
            levelChanging && "opacity-40 pointer-events-none"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
