"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { trackApi, sectionApi } from "@/lib/api";
import { PageSpinner } from "@/components/ui/Spinner";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Lock, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function TrackPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const { data: track, isLoading: trackLoading } = useQuery({
    queryKey: ["track", slug],
    queryFn: () => trackApi.get(slug),
  });

  const { data: sections, isLoading: sectionsLoading } = useQuery({
    queryKey: ["sections", track?._id],
    queryFn: () => sectionApi.forTrack(track._id),
    enabled: !!track?._id,
  });

  if (trackLoading || sectionsLoading) return <PageSpinner />;

  const completed = sections?.filter((s: SectionItem) => s.isCompleted).length ?? 0;
  const total = sections?.length ?? 0;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-zinc-100">{track?.name}</h2>
        <p className="text-sm text-zinc-500 mt-1">{track?.description}</p>
      </div>

      {/* Progress summary */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-zinc-400">Track progress</span>
          <span className="text-xs font-semibold text-violet-400">{percent}%</span>
        </div>
        <ProgressBar value={percent} size="sm" />
        <p className="text-xs text-zinc-600 mt-2">
          {completed} of {total} sections completed
        </p>
      </div>

      {/* Section list */}
      <div className="space-y-2">
        {sections?.map((section: SectionItem, index: number) => (
          <SectionCard key={section._id} section={section} index={index} slug={slug} />
        ))}
      </div>
    </div>
  );
}

interface SectionItem {
  _id: string;
  title: string;
  description: string;
  order: number;
  isUnlocked: boolean;
  isCompleted: boolean;
}

function SectionCard({
  section,
  index,
  slug,
}: {
  section: SectionItem;
  index: number;
  slug: string;
}) {
  const isLocked = !section.isUnlocked;

  const inner = (
    <div
      className={cn(
        "flex items-center gap-4 p-4 rounded-xl border transition-colors",
        isLocked
          ? "border-zinc-800 bg-zinc-900/50 opacity-60 cursor-not-allowed"
          : section.isCompleted
          ? "border-green-900/50 bg-green-950/20 hover:border-green-800/50"
          : "border-zinc-800 bg-zinc-900 hover:border-zinc-700 cursor-pointer"
      )}
    >
      {/* Order indicator */}
      <div
        className={cn(
          "w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-xs font-bold",
          isLocked
            ? "bg-zinc-800 text-zinc-600"
            : section.isCompleted
            ? "bg-green-900 text-green-400"
            : "bg-violet-900/50 text-violet-400"
        )}
      >
        {isLocked ? (
          <Lock size={14} />
        ) : section.isCompleted ? (
          <CheckCircle2 size={16} />
        ) : (
          index + 1
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-zinc-100 truncate">{section.title}</p>
        <p className="text-xs text-zinc-500 truncate mt-0.5">{section.description}</p>
      </div>

      {/* Status badge */}
      <div className="flex items-center gap-2 shrink-0">
        {isLocked && <Badge>Locked</Badge>}
        {section.isCompleted && <Badge variant="success">Done</Badge>}
        {!isLocked && !section.isCompleted && (
          <ChevronRight size={16} className="text-zinc-600" />
        )}
      </div>
    </div>
  );

  if (isLocked) return <div>{inner}</div>;

  return (
    <Link href={`/track/${slug}/section/${section._id}`}>{inner}</Link>
  );
}
