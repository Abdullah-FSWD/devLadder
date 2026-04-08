import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md";
}

export function ProgressBar({ value, className, showLabel = false, size = "md" }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn("w-full bg-zinc-800 rounded-full overflow-hidden", {
          "h-1.5": size === "sm",
          "h-2": size === "md",
        })}
      >
        <div
          className="h-full bg-violet-500 rounded-full transition-all duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-zinc-500 mt-1">{clamped}%</p>
      )}
    </div>
  );
}
