"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logApi } from "@/lib/api";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface Props {
  open: boolean;
  onClose: () => void;
  subtopicId: string;
  subtopicTitle: string;
  sectionId: string;
}

export function LogModal({ open, onClose, subtopicId, subtopicTitle, sectionId }: Props) {
  const [report, setReport] = useState("");
  const [minutes, setMinutes] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      logApi.create({
        subtopicId,
        report,
        timeSpentMinutes: parseInt(minutes, 10),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logs", subtopicId] });
      queryClient.invalidateQueries({ queryKey: ["progress-dashboard"] });
      setReport("");
      setMinutes("");
      onClose();
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate();
  }

  return (
    <Modal open={open} onClose={onClose} title="Add Learning Log">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs text-zinc-500 mb-1">Topic</label>
          <p className="text-sm text-zinc-300">{subtopicTitle}</p>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5">
            What did you learn?
          </label>
          <textarea
            value={report}
            onChange={(e) => setReport(e.target.value)}
            required
            rows={4}
            maxLength={2000}
            className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-violet-600 transition-colors placeholder:text-zinc-600 resize-none"
            placeholder="Summarize what you studied, understood, and practiced..."
          />
          <p className="text-xs text-zinc-600 mt-1 text-right">{report.length}/2000</p>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5">
            Time spent (minutes)
          </label>
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            required
            min={1}
            max={1440}
            className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-violet-600 transition-colors placeholder:text-zinc-600"
            placeholder="e.g. 45"
          />
        </div>

        {mutation.isError && (
          <p className="text-xs text-red-400">Failed to save log. Try again.</p>
        )}

        <div className="flex gap-2 pt-1">
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1" loading={mutation.isPending}>
            Save log
          </Button>
        </div>
      </form>
    </Modal>
  );
}
