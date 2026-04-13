"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { courseApi, progressApi } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Lock, GraduationCap, ArrowRight } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Skeleton } from "@/components/ui/Spinner";
import { cn } from "@/lib/utils";

interface Course {
  _id: string;
  name: string;
  slug: string;
  description: string;
  isUnlocked: boolean;
  icon?: string;
}

interface TrackProgress {
  track: { _id: string; slug: string };
  percent: number;
  completedSections: number;
  totalSections: number;
}

export default function CoursesPage() {
  const { data: courses, isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: courseApi.list,
  });

  const { data: progressData, isLoading: progressLoading } = useQuery<{
    tracks: TrackProgress[];
  }>({
    queryKey: ["progress-dashboard"],
    queryFn: progressApi.dashboard,
  });

  const isLoading = coursesLoading || progressLoading;

  // Build a map of trackId → progress
  const progressMap = new Map<string, TrackProgress>();
  progressData?.tracks?.forEach((t) => progressMap.set(t.track._id, t));

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-zinc-100">Courses</h2>
        <p className="text-sm text-zinc-500 mt-0.5">
          Click a course to unlock it and start learning.
        </p>
      </div>

      {isLoading ? (
        <CoursesSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {courses?.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              progress={progressMap.get(course._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CourseCard({
  course,
  progress,
}: {
  course: Course;
  progress?: TrackProgress;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const unlock = useMutation({
    mutationFn: () => courseApi.unlock(course._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      router.push(`/track/${course.slug}`);
    },
  });

  function handleClick() {
    if (course.isUnlocked) {
      router.push(`/track/${course.slug}`);
    } else {
      unlock.mutate();
    }
  }

  const percent = progress?.percent ?? 0;
  const completed = progress?.completedSections ?? 0;
  const total = progress?.totalSections ?? 0;
  const locked = !course.isUnlocked;

  return (
    <button
      onClick={handleClick}
      disabled={unlock.isPending}
      className={cn(
        "group text-left w-full bg-zinc-900 border rounded-xl p-5 transition-all duration-200",
        locked
          ? "border-zinc-800 opacity-60 hover:opacity-80"
          : "border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/60"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-violet-900/50 flex items-center justify-center shrink-0">
            <GraduationCap size={16} className="text-violet-400" />
          </div>
          <span className="text-sm font-semibold text-zinc-100 leading-snug">
            {course.name}
          </span>
        </div>
        {locked ? (
          <Lock size={14} className="text-zinc-600 shrink-0 mt-0.5" />
        ) : (
          <ArrowRight
            size={14}
            className="text-zinc-600 group-hover:text-violet-400 transition-colors shrink-0 mt-0.5"
          />
        )}
      </div>

      {/* Description */}
      {course.description && (
        <p className="text-xs text-zinc-500 mb-4 line-clamp-2 leading-relaxed">
          {course.description}
        </p>
      )}

      {/* Progress */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-600">
            {locked ? "Locked" : `${completed} / ${total} sections`}
          </span>
          {!locked && (
            <span className="text-xs font-medium text-violet-400">{percent}%</span>
          )}
        </div>
        <ProgressBar
          value={locked ? 0 : percent}
          size="sm"
          className={cn(locked && "opacity-30")}
        />
      </div>

      {unlock.isPending && (
        <p className="text-xs text-violet-400 mt-2 animate-pulse">Unlocking…</p>
      )}
    </button>
  );
}

function CoursesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <Skeleton className="w-8 h-8 shrink-0" />
            <Skeleton className="h-4 flex-1" />
          </div>
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-1.5 w-full mt-2" />
        </div>
      ))}
    </div>
  );
}
