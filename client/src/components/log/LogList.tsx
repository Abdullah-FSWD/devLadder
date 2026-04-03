"use client";

import { useQuery } from "@tanstack/react-query";
import { logApi } from "@/lib/api";
import { formatDate, formatMinutes } from "@/lib/utils";
import { Clock } from "lucide-react";

export function LogList({ subtopicId }: { subtopicId: string }) {
  const { data: logs, isLoading } = useQuery({
    queryKey: ["logs", subtopicId],
    queryFn: () => logApi.bySubtopic(subtopicId),
  });

  if (isLoading) return <p className="text-xs text-zinc-600">Loading logs...</p>;
  if (!logs?.length) return <p className="text-xs text-zinc-600">No logs yet.</p>;

  return (
    <div className="space-y-2">
      {logs.map((log: { _id: string; report: string; timeSpentMinutes: number; createdAt: string }) => (
        <div key={log._id} className="bg-zinc-950 rounded-lg p-3">
          <p className="text-xs text-zinc-300 leading-relaxed">{log.report}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-xs text-zinc-600">
              <Clock size={11} />
              {formatMinutes(log.timeSpentMinutes)}
            </span>
            <span className="text-xs text-zinc-700">{formatDate(log.createdAt)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
