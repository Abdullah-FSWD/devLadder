"use client";

import { use, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sectionApi, testApi, logApi, topicProgressApi } from "@/lib/api";
import { Skeleton } from "@/components/ui/Spinner";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LogModal } from "@/components/log/LogModal";
import { formatDate, formatMinutes } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Plus,
  Clock,
  BookOpen,
  FlaskConical,
  CheckCircle2,
  CalendarClock,
  ClipboardList,
  Check,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const resourceTypeColor: Record<string, string> = {
  article: "text-blue-400",
  video: "text-red-400",
  documentation: "text-amber-400",
  course: "text-green-400",
  practice: "text-violet-400",
};

type Resource = { title: string; url: string; type: string };
type Subtopic = { _id: string; title: string; description: string; resources: Resource[] };
type Topic = { _id: string; title: string; description: string; subtopics: Subtopic[] };
type Attempt = { _id: string; passed: boolean; attemptDate: string; score: number };
type Log = {
  _id: string;
  report: string;
  timeSpentMinutes: number;
  createdAt: string;
  topicTitle: string;
  subtopic: { _id: string; title: string } | string;
};

export default function SectionPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = use(params);
  const queryClient = useQueryClient();

  const { data: section, isLoading } = useQuery({
    queryKey: ["section", id],
    queryFn: () => sectionApi.get(id),
  });

  const { data: testMeta } = useQuery({
    queryKey: ["test", id],
    queryFn: () => testApi.forSection(id),
    enabled: !!id,
  });

  const { data: attempts } = useQuery<Attempt[]>({
    queryKey: ["attempts", testMeta?._id],
    queryFn: () => testApi.attempts(testMeta!._id),
    enabled: !!testMeta?._id,
  });

  const { data: sectionLogs } = useQuery<Log[]>({
    queryKey: ["logs", "section", id],
    queryFn: () => logApi.bySection(id),
    enabled: !!id,
  });

  const { data: topicProgressData } = useQuery<{ topicId: string; completedAt: string }[]>({
    queryKey: ["topic-progress", id],
    queryFn: () => topicProgressApi.forSection(id),
    enabled: !!id,
  });

  const completedTopicIds = new Set(topicProgressData?.map((p) => p.topicId.toString()) ?? []);

  const completeTopic = useMutation({
    mutationFn: (topicId: string) => topicProgressApi.complete(topicId),
    onMutate: async (topicId) => {
      await queryClient.cancelQueries({ queryKey: ["topic-progress", id] });
      const prev = queryClient.getQueryData<{ topicId: string; completedAt: string }[]>(["topic-progress", id]);
      queryClient.setQueryData(["topic-progress", id], (old: typeof prev) => [
        ...(old ?? []),
        { topicId, completedAt: new Date().toISOString() },
      ]);
      return { prev };
    },
    onError: (_err, _topicId, ctx) => {
      if (ctx?.prev !== undefined)
        queryClient.setQueryData(["topic-progress", id], ctx.prev);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["topic-progress", id] }),
  });

  const uncompleteTopic = useMutation({
    mutationFn: (topicId: string) => topicProgressApi.uncomplete(topicId),
    onMutate: async (topicId) => {
      await queryClient.cancelQueries({ queryKey: ["topic-progress", id] });
      const prev = queryClient.getQueryData<{ topicId: string; completedAt: string }[]>(["topic-progress", id]);
      queryClient.setQueryData(["topic-progress", id], (old: typeof prev) =>
        (old ?? []).filter((p) => p.topicId.toString() !== topicId)
      );
      return { prev };
    },
    onError: (_err, _topicId, ctx) => {
      if (ctx?.prev !== undefined)
        queryClient.setQueryData(["topic-progress", id], ctx.prev);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["topic-progress", id] }),
  });

  function toggleTopic(topicId: string) {
    if (completedTopicIds.has(topicId)) {
      uncompleteTopic.mutate(topicId);
    } else {
      completeTopic.mutate(topicId);
    }
  }

  const [logModal, setLogModal] = useState<{
    subtopicId: string;
    subtopicTitle: string;
  } | null>(null);

  if (isLoading) return <SectionSkeleton />;

  const today = new Date().toISOString().slice(0, 10);
  const hasPassed = attempts?.some((a) => a.passed) ?? false;
  const failedToday =
    !hasPassed && (attempts?.some((a) => a.attemptDate === today && !a.passed) ?? false);

  const totalTopics = section?.topics?.length ?? 0;
  const completedTopics = section?.topics?.filter((t: Topic) =>
    completedTopicIds.has(t._id)
  ).length ?? 0;

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2 flex-wrap">
          <Link href={`/track/${slug}`} className="hover:text-zinc-300 transition-colors">
            {slug.toUpperCase()}
          </Link>
          <ChevronRight size={12} />
          <span>Section {section?.order}</span>
        </div>
        <h2 className="text-xl font-semibold text-zinc-100">{section?.title}</h2>
        {section?.description && (
          <p className="text-sm text-zinc-500 mt-1">{section.description}</p>
        )}
      </div>

      {/* Test CTA */}
      <TestCTA
        slug={slug}
        sectionId={id}
        hasPassed={hasPassed}
        failedToday={failedToday}
        lastScore={attempts?.[0]?.score}
      />

      {/* Topics */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen size={13} />
            Topics
          </h3>
          {totalTopics > 0 && (
            <span className="text-xs text-zinc-600">
              {completedTopics}/{totalTopics} done
            </span>
          )}
        </div>
        <div className="space-y-2">
          {section?.topics?.map((topic: Topic) => (
            <TopicAccordion
              key={topic._id}
              topic={topic}
              isCompleted={completedTopicIds.has(topic._id)}
              onToggle={() => toggleTopic(topic._id)}
              onLog={(subtopicId, subtopicTitle) =>
                setLogModal({ subtopicId, subtopicTitle })
              }
            />
          ))}
        </div>
      </div>

      {/* Learning Activity */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
            <ClipboardList size={13} />
            Learning Activity
          </h3>
        </div>
        <SectionActivity
          logs={sectionLogs ?? []}
          onLog={(subtopicId, subtopicTitle) =>
            setLogModal({ subtopicId, subtopicTitle })
          }
        />
      </div>

      {/* Log modal */}
      {logModal && (
        <LogModal
          open={!!logModal}
          onClose={() => setLogModal(null)}
          subtopicId={logModal.subtopicId}
          subtopicTitle={logModal.subtopicTitle}
          sectionId={id}
        />
      )}
    </div>
  );
}

// ── Skeleton ──────────────────────────────────────────────────

function SectionSkeleton() {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-3 w-48" />
      </div>
      <Skeleton className="h-16 w-full" />
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    </div>
  );
}

// ── Test CTA ─────────────────────────────────────────────────

function TestCTA({
  slug,
  sectionId,
  hasPassed,
  failedToday,
  lastScore,
}: {
  slug: string;
  sectionId: string;
  hasPassed: boolean;
  failedToday: boolean;
  lastScore?: number;
}) {
  if (hasPassed) {
    return (
      <div className="bg-green-950 border border-green-800 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckCircle2 size={20} className="text-green-400 shrink-0" />
          <div>
            <p className="text-sm font-medium text-zinc-100">Section Complete</p>
            <p className="text-xs text-zinc-500 mt-0.5">
              You passed this test. Next section unlocked.
            </p>
          </div>
        </div>
        <Link href={`/track/${slug}/section/${sectionId}/test`}>
          <Button size="sm" variant="secondary">
            Review
          </Button>
        </Link>
      </div>
    );
  }

  if (failedToday) {
    return (
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <CalendarClock size={20} className="text-zinc-400 shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-zinc-100">Test attempted today</p>
            <p className="text-xs text-zinc-500 mt-0.5">
              Last score:{" "}
              {lastScore != null ? `${Math.round(lastScore * 100)}%` : "—"} · Retry
              available tomorrow
            </p>
          </div>
        </div>
        <Button size="sm" disabled>
          Try tomorrow
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-zinc-100">Section Test</p>
        <p className="text-xs text-zinc-500 mt-0.5">
          Pass with &gt;50% to unlock the next section
        </p>
      </div>
      <Link href={`/track/${slug}/section/${sectionId}/test`}>
        <Button size="sm">Take test</Button>
      </Link>
    </div>
  );
}

// ── Topic Accordion ───────────────────────────────────────────

function TopicAccordion({
  topic,
  isCompleted,
  onToggle,
  onLog,
}: {
  topic: Topic;
  isCompleted: boolean;
  onToggle: () => void;
  onLog: (subtopicId: string, subtopicTitle: string) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={cn(
        "border rounded-xl overflow-hidden transition-colors",
        isCompleted ? "bg-zinc-900 border-green-900/50" : "bg-zinc-900 border-zinc-800"
      )}
    >
      <div className="flex items-center gap-3 px-4 py-3.5">
        {/* Checkbox */}
        <button
          onClick={onToggle}
          className={cn(
            "w-5 h-5 shrink-0 rounded-md border-2 flex items-center justify-center transition-all",
            isCompleted
              ? "bg-green-600 border-green-600"
              : "border-zinc-600 hover:border-violet-500"
          )}
          title={isCompleted ? "Mark incomplete" : "Mark complete"}
        >
          {isCompleted && <Check size={12} className="text-white" strokeWidth={3} />}
        </button>

        {/* Title — clicking expands/collapses */}
        <button
          onClick={() => setOpen((p) => !p)}
          className="flex-1 flex items-center justify-between text-left"
        >
          <span
            className={cn(
              "text-sm font-medium transition-colors",
              isCompleted ? "text-zinc-400 line-through" : "text-zinc-100"
            )}
          >
            {topic.title}
          </span>
          {open ? (
            <ChevronDown size={15} className="text-zinc-500 shrink-0 ml-2" />
          ) : (
            <ChevronRight size={15} className="text-zinc-500 shrink-0 ml-2" />
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-zinc-800 divide-y divide-zinc-800/60">
          {topic.subtopics.map((subtopic) => (
            <SubtopicRow key={subtopic._id} subtopic={subtopic} onLog={onLog} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Subtopic Row ──────────────────────────────────────────────

function SubtopicRow({
  subtopic,
  onLog,
}: {
  subtopic: Subtopic;
  onLog: (subtopicId: string, subtopicTitle: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <button
          onClick={() => setExpanded((p) => !p)}
          className="flex-1 text-sm text-zinc-300 hover:text-zinc-100 text-left transition-colors"
        >
          <span className="flex items-center gap-2">
            {subtopic.resources.length > 0 && (
              <ChevronRight
                size={13}
                className={cn(
                  "text-zinc-600 transition-transform shrink-0",
                  expanded && "rotate-90"
                )}
              />
            )}
            {subtopic.title}
          </span>
        </button>
        <button
          onClick={() => onLog(subtopic._id, subtopic.title)}
          className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors shrink-0"
        >
          <Plus size={13} />
          Log
        </button>
      </div>

      {expanded && subtopic.resources.length > 0 && (
        <div className="mt-3 pl-4">
          <p className="text-xs font-medium text-zinc-500 mb-2">Resources</p>
          <div className="space-y-1.5">
            {subtopic.resources.map((r, i) => (
              <a
                key={i}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 transition-colors group"
              >
                <ExternalLink
                  size={11}
                  className={cn(
                    resourceTypeColor[r.type] ?? "text-zinc-500",
                    "shrink-0"
                  )}
                />
                <span className="flex-1 truncate group-hover:underline">{r.title}</span>
                <Badge className="shrink-0">{r.type}</Badge>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Section Activity ──────────────────────────────────────────

function SectionActivity({
  logs,
  onLog,
}: {
  logs: Log[];
  onLog: (subtopicId: string, subtopicTitle: string) => void;
}) {
  if (logs.length === 0) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
        <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center mx-auto mb-3">
          <FlaskConical size={20} className="text-zinc-600" />
        </div>
        <p className="text-sm font-medium text-zinc-400">No entries yet</p>
        <p className="text-xs text-zinc-600 mt-1 max-w-xs mx-auto">
          Click <span className="text-violet-400">Log</span> next to any subtopic to record
          your progress.
        </p>
      </div>
    );
  }

  // Group by topicTitle
  const grouped = logs.reduce<Record<string, Log[]>>((acc, log) => {
    const key = log.topicTitle ?? "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(log);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([topicTitle, topicLogs]) => (
        <div key={topicTitle}>
          {/* Topic label */}
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-1">
            {topicTitle}
          </p>
          <div className="space-y-2">
            {topicLogs.map((log) => (
              <LogEntry key={log._id} log={log} onLog={onLog} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function LogEntry({
  log,
  onLog,
}: {
  log: Log;
  onLog: (subtopicId: string, subtopicTitle: string) => void;
}) {
  const subtopicTitle =
    typeof log.subtopic === "object" && log.subtopic !== null
      ? log.subtopic.title
      : null;
  const subtopicId =
    typeof log.subtopic === "object" && log.subtopic !== null
      ? log.subtopic._id
      : typeof log.subtopic === "string"
      ? log.subtopic
      : null;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3.5 group hover:border-zinc-700 transition-colors">
      {/* Subtopic + add button */}
      <div className="flex items-center justify-between mb-2">
        {subtopicTitle ? (
          <span className="text-xs font-medium text-violet-400">{subtopicTitle}</span>
        ) : (
          <span />
        )}
        {subtopicId && subtopicTitle && (
          <button
            onClick={() => onLog(subtopicId, subtopicTitle)}
            className="flex items-center gap-1 text-xs text-zinc-600 hover:text-violet-400 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Plus size={11} />
            Add entry
          </button>
        )}
      </div>

      {/* Report */}
      <p className="text-sm text-zinc-200 leading-relaxed">{log.report}</p>

      {/* Meta */}
      <div className="flex items-center gap-3 mt-2.5 pt-2.5 border-t border-zinc-800">
        <span className="flex items-center gap-1.5 text-xs text-zinc-500">
          <Clock size={11} />
          {formatMinutes(log.timeSpentMinutes)}
        </span>
        <span className="text-xs text-zinc-600">{formatDate(log.createdAt)}</span>
      </div>
    </div>
  );
}
