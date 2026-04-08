"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Code2,
  LogOut,
  X,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/lib/api";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "MERN Track", href: "/track/mern", icon: Code2 },
  { label: "DSA Track", href: "/track/dsa", icon: BookOpen },
];

const LEVELS = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout, setUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [levelOpen, setLevelOpen] = useState(false);
  const [switchingLevel, setSwitchingLevel] = useState(false);

  async function handleLevelChange(level: string) {
    if (level === user?.experienceLevel || switchingLevel) return;
    setSwitchingLevel(true);
    try {
      const updated = await userApi.setLevel(level);
      setUser(updated);
      // Invalidate all content queries so they re-fetch with new level
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      queryClient.invalidateQueries({ queryKey: ["progress-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["track"] });
      router.push("/dashboard");
    } finally {
      setSwitchingLevel(false);
      setLevelOpen(false);
    }
  }

  const sidebarContent = (
    <aside
      className={cn(
        "w-64 shrink-0 bg-zinc-900 border-r border-zinc-800 flex flex-col h-screen",
        // Mobile: fixed overlay drawer
        "fixed top-0 left-0 z-40 transition-transform duration-300",
        // Desktop: sticky sidebar (overrides fixed)
        "md:sticky md:z-auto",
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      {/* Logo row */}
      <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
        <span className="text-base font-bold text-zinc-100">
          Dev<span className="text-violet-500">Ladder</span>
        </span>
        {/* Mobile close */}
        <button
          onClick={onClose}
          className="md:hidden p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
        >
          <X size={17} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                active
                  ? "bg-violet-900 text-violet-400 font-medium"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              )}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-zinc-800 space-y-1">
        {/* Level switcher */}
        <div className="relative">
          <button
            onClick={() => setLevelOpen((p) => !p)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <div className="text-left">
              <p className="text-xs text-zinc-500 leading-none mb-0.5">Level</p>
              <p className="text-sm font-medium text-zinc-200 capitalize">
                {user?.experienceLevel ?? "—"}
              </p>
            </div>
            <ChevronDown
              size={14}
              className={cn(
                "text-zinc-500 transition-transform",
                levelOpen && "rotate-180"
              )}
            />
          </button>

          {levelOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-1 bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden shadow-xl z-50">
              {LEVELS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => handleLevelChange(l.id)}
                  disabled={switchingLevel}
                  className={cn(
                    "w-full text-left px-3 py-2.5 text-sm transition-colors",
                    user?.experienceLevel === l.id
                      ? "text-violet-400 bg-violet-900/40 font-medium"
                      : "text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100"
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User info */}
        <div className="px-3 py-2">
          <p className="text-sm font-medium text-zinc-200 truncate">{user?.name}</p>
          <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
        </div>

        {/* Theme toggle + sign out */}
        <div className="flex gap-1">
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            <span className="text-xs">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
          <button
            onClick={logout}
            title="Sign out"
            className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          >
            <LogOut size={16} />
            <span className="text-xs">Sign out</span>
          </button>
        </div>
      </div>
    </aside>
  );

  return sidebarContent;
}
