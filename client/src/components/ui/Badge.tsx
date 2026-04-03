import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "violet";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full",
        {
          "bg-zinc-800 text-zinc-400": variant === "default",
          "bg-green-950 text-green-400": variant === "success",
          "bg-amber-950 text-amber-400": variant === "warning",
          "bg-red-950 text-red-400": variant === "error",
          "bg-violet-950 text-violet-400": variant === "violet",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
