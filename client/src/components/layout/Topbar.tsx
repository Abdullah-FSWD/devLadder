"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

function getTitle(pathname: string): string {
  if (pathname === "/dashboard") return "Dashboard";
  if (pathname === "/track/mern") return "MERN Track";
  if (pathname === "/track/dsa") return "DSA Track";
  if (pathname.includes("/section/") && pathname.endsWith("/test")) return "Section Test";
  if (pathname.includes("/section/")) return "Section";
  return "";
}

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const pathname = usePathname();
  const title = getTitle(pathname);

  return (
    <header className="h-14 border-b border-zinc-800 px-4 md:px-6 flex items-center gap-3 bg-zinc-950 sticky top-0 z-20">
      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors -ml-1"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <h1 className="text-sm font-semibold text-zinc-100 truncate">{title}</h1>
    </header>
  );
}
