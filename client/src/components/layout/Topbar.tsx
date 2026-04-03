"use client";

import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/track/mern": "MERN Track",
  "/track/dsa": "DSA Track",
};

export function Topbar() {
  const pathname = usePathname();
  const title = titles[pathname] ?? "";

  return (
    <header className="h-14 border-b border-zinc-800 px-6 flex items-center">
      <h1 className="text-sm font-semibold text-zinc-100">{title}</h1>
    </header>
  );
}
