"use client";

import { useQuery } from "@tanstack/react-query";
import { progressApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Spinner";
import Link from "next/link";
import { ArrowRight, Code2, BookOpen } from "lucide-react";

const trackIcon: Record<string, React.ReactNode> = {
  mern: <Code2 size={18} className="text-violet-500" />,
  dsa: <BookOpen size={18} className="text-violet-500" />,
};

export default function DashboardPage() {
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["progress-dashboard"],
    queryFn: progressApi.dashboard,
  });

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="max-w-3xl space-y-6">
      {/* Greeting */}
      <div>
        <h2 className="text-xl font-semibold text-zinc-100">
          Welcome back, {user?.name?.split(" ")[0]}
        </h2>
        <p className="text-sm text-zinc-500 mt-0.5 capitalize">
          {user?.experienceLevel} level
        </p>
      </div>

      {/* Overall progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Overall Progress</CardTitle>
            <span className="text-2xl font-bold text-violet-500">
              {data?.overallPercent ?? 0}%
            </span>
          </div>
        </CardHeader>
        <ProgressBar value={data?.overallPercent ?? 0} size="md" />
      </Card>

      {/* Per-track cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data?.tracks?.map(
          (t: {
            track: { _id: string; name: string; slug: string };
            percent: number;
            completedSections: number;
            totalSections: number;
            sections: Array<{ _id: string; title: string; isCompleted: boolean; order: number }>;
          }) => (
            <Card key={t.track._id} className="hover:border-zinc-700 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  {trackIcon[t.track.slug]}
                  <span className="text-sm font-semibold text-zinc-100">{t.track.name}</span>
                </div>
                <Badge variant="violet">{t.percent}%</Badge>
              </div>
              <ProgressBar value={t.percent} size="sm" className="mb-3" />
              <p className="text-xs text-zinc-500 mb-4">
                {t.completedSections} / {t.totalSections} sections complete
              </p>

              {/* Current section */}
              {t.sections?.find((s) => !s.isCompleted) && (
                <div className="bg-zinc-950 rounded-lg px-3 py-2.5 mb-3">
                  <p className="text-xs text-zinc-500 mb-0.5">Continue with</p>
                  <p className="text-xs font-medium text-zinc-300 truncate">
                    {t.sections.find((s) => !s.isCompleted)?.title}
                  </p>
                </div>
              )}

              <Link
                href={`/track/${t.track.slug}`}
                className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors"
              >
                Continue <ArrowRight size={13} />
              </Link>
            </Card>
          )
        )}
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="space-y-1.5">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-3 w-24" />
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-2 w-full" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-1.5 w-full" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
