"use client";

import { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { sectionApi } from "@/lib/api";
import { PageSpinner } from "@/components/ui/Spinner";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LogModal } from "@/components/log/LogModal";
import { LogList } from "@/components/log/LogList";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Plus,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";
import { useState as useExpandState } from "react";
import { cn } from "@/lib/utils";

const resourceTypeColor: Record<string, string> = {
  article: "text-blue-400",
  video: "text-red-400",
  documentation: "text-amber-400",
  course: "text-green-400",
  practice: "text-violet-400",
};

export default function SectionPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = use(params);

  const { data: section, isLoading } = useQuery({
    queryKey: ["section", id],
    queryFn: () => sectionApi.get(id),
  });

  const [logModal, setLogModal] = useState<{
    subtopicId: string;
    subtopicTitle: string;
  } | null>(null);

  if (isLoading) return <PageSpinner />;

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
          <Link href={`/track/${slug}`} className="hover:text-zinc-300 transition-colors">
            {slug.toUpperCase()}
          </Link>
          <ChevronRight size={12} />
          <span>Section {section?.order}</span>
        </div>
        <h2 className="text-xl font-semibold text-zinc-100">{section?.title}</h2>
        <p className="text-sm text-zinc-500 mt-1">{section?.description}</p>
      </div>

      {/* Take test CTA */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-100">Section Test</p>
          <p className="text-xs text-zinc-500 mt-0.5">Pass with &gt;50% to unlock the next section</p>
        </div>
        <Link href={`/track/${slug}/section/${id}/test`}>
          <Button size="sm">Take test</Button>
        </Link>
      </div>

      {/* Topics */}
      <div className="space-y-3">
        {section?.topics?.map(
          (topic: {
            _id: string;
            title: string;
            description: string;
            subtopics: Array<{
              _id: string;
              title: string;
              description: string;
              resources: Array<{ title: string; url: string; type: string }>;
            }>;
          }) => (
            <TopicAccordion
              key={topic._id}
              topic={topic}
              sectionId={id}
              onLog={(subtopicId, subtopicTitle) =>
                setLogModal({ subtopicId, subtopicTitle })
              }
            />
          )
        )}
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

function TopicAccordion({
  topic,
  sectionId,
  onLog,
}: {
  topic: {
    _id: string;
    title: string;
    description: string;
    subtopics: Array<{
      _id: string;
      title: string;
      description: string;
      resources: Array<{ title: string; url: string; type: string }>;
    }>;
  };
  sectionId: string;
  onLog: (subtopicId: string, subtopicTitle: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-zinc-800/50 transition-colors"
      >
        <span className="text-sm font-medium text-zinc-100">{topic.title}</span>
        {open ? (
          <ChevronDown size={16} className="text-zinc-500" />
        ) : (
          <ChevronRight size={16} className="text-zinc-500" />
        )}
      </button>

      {open && (
        <div className="border-t border-zinc-800 divide-y divide-zinc-800/50">
          {topic.subtopics.map((subtopic) => (
            <SubtopicRow
              key={subtopic._id}
              subtopic={subtopic}
              sectionId={sectionId}
              onLog={onLog}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SubtopicRow({
  subtopic,
  sectionId,
  onLog,
}: {
  subtopic: {
    _id: string;
    title: string;
    description: string;
    resources: Array<{ title: string; url: string; type: string }>;
  };
  sectionId: string;
  onLog: (subtopicId: string, subtopicTitle: string) => void;
}) {
  const [expanded, setExpanded] = useExpandState(false);

  return (
    <div className="px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <button
            onClick={() => setExpanded((p) => !p)}
            className="text-sm text-zinc-300 hover:text-zinc-100 text-left transition-colors"
          >
            {subtopic.title}
          </button>
        </div>
        <button
          onClick={() => onLog(subtopic._id, subtopic.title)}
          className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors shrink-0"
        >
          <Plus size={13} />
          Log
        </button>
      </div>

      {expanded && (
        <div className="mt-3 space-y-3">
          {/* Resources */}
          {subtopic.resources.length > 0 && (
            <div>
              <p className="text-xs font-medium text-zinc-500 mb-2">Resources</p>
              <div className="space-y-1.5">
                {subtopic.resources.map((r, i) => (
                  <a
                    key={i}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    <ExternalLink size={11} className={resourceTypeColor[r.type] ?? "text-zinc-500"} />
                    {r.title}
                    <Badge className="ml-auto">{r.type}</Badge>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Logs */}
          <div>
            <p className="text-xs font-medium text-zinc-500 mb-2 flex items-center gap-1.5">
              <ClipboardList size={12} />
              Learning logs
            </p>
            <LogList subtopicId={subtopic._id} />
          </div>
        </div>
      )}
    </div>
  );
}
