"use client";

import { use, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { testApi } from "@/lib/api";
import { PageSpinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, ChevronRight, ChevronLeft, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Question = { _id: string; question: string; options: string[] };
type TestData = { _id: string; title: string; questions: Question[] };
type SubmitResult = { passed: boolean; score: number; correctCount: number; totalQuestions: number };

export default function TestPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = use(params);
  const queryClient = useQueryClient();

  const { data: test, isLoading } = useQuery<TestData>({
    queryKey: ["test", id],
    queryFn: () => testApi.forSection(id),
  });

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState<SubmitResult | null>(null);

  const submit = useMutation({
    mutationFn: () =>
      testApi.submit(
        test!._id,
        Object.entries(answers).map(([questionId, selectedAnswer]) => ({
          questionId,
          selectedAnswer,
        }))
      ),
    onSuccess: (data) => {
      setResult(data);
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      queryClient.invalidateQueries({ queryKey: ["progress-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["attempts", test?._id] });
    },
  });

  if (isLoading) return <PageSpinner />;
  if (!test) return null;

  const questions = test.questions;
  const totalQ = questions.length;
  const answered = Object.keys(answers).length;
  const allAnswered = answered === totalQ;
  const q = questions[current];

  // ── Result screen ───────────────────────────────────────────
  if (result) {
    return (
      <div className="max-w-md mx-auto mt-8 sm:mt-12 text-center space-y-6 px-4">
        {result.passed ? (
          <CheckCircle2 size={48} className="mx-auto text-green-400" />
        ) : (
          <XCircle size={48} className="mx-auto text-zinc-500" />
        )}

        <div>
          <h2 className="text-xl font-semibold text-zinc-100">
            {result.passed ? "Section complete!" : "Not quite"}
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            {result.passed
              ? "The next section is now unlocked."
              : "You can retry tomorrow."}
          </p>
        </div>

        {/* Score ring */}
        <div
          className={cn(
            "inline-flex items-center justify-center w-28 h-28 rounded-full border-4",
            result.passed ? "border-green-800" : "border-zinc-800"
          )}
        >
          <span
            className={cn(
              "text-2xl font-bold",
              result.passed ? "text-green-400" : "text-zinc-400"
            )}
          >
            {result.score}%
          </span>
        </div>

        <p className="text-sm text-zinc-500">
          {result.correctCount} / {result.totalQuestions} correct
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <Link href={`/track/${slug}/section/${id}`}>
            <Button variant="secondary" size="sm">Back to section</Button>
          </Link>
          {result.passed && (
            <Link href={`/track/${slug}`}>
              <Button size="sm">View roadmap</Button>
            </Link>
          )}
        </div>
      </div>
    );
  }

  // ── Test screen ─────────────────────────────────────────────
  return (
    <div className="max-w-xl space-y-6">
      {/* Back link */}
      <Link
        href={`/track/${slug}/section/${id}`}
        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        <ArrowLeft size={13} />
        Back to section
      </Link>

      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-zinc-100">{test.title}</h2>
        <p className="text-xs text-zinc-500 mt-1">
          Question {current + 1} of {totalQ} · {answered} answered
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 flex-wrap">
        {questions.map((q, i) => (
          <button
            key={q._id}
            onClick={() => setCurrent(i)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-colors",
              i === current
                ? "bg-violet-500"
                : answers[q._id] !== undefined
                ? "bg-violet-900"
                : "bg-zinc-700"
            )}
          />
        ))}
      </div>

      {/* Question card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <p className="text-sm font-medium text-zinc-100 leading-relaxed">{q.question}</p>

        <div className="space-y-2">
          {q.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => setAnswers((prev) => ({ ...prev, [q._id]: idx }))}
              className={cn(
                "w-full text-left text-sm px-4 py-3 rounded-lg border transition-colors",
                answers[q._id] === idx
                  ? "border-violet-600 bg-violet-900 text-violet-300"
                  : "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
              )}
            >
              <span className="font-medium mr-2">{["A", "B", "C", "D"][idx]}.</span>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <Button
          variant="ghost"
          size="sm"
          disabled={current === 0}
          onClick={() => setCurrent((p) => p - 1)}
        >
          <ChevronLeft size={16} />
          Prev
        </Button>

        {current < totalQ - 1 ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrent((p) => p + 1)}
          >
            Next
            <ChevronRight size={16} />
          </Button>
        ) : (
          <Button
            size="sm"
            disabled={!allAnswered}
            loading={submit.isPending}
            onClick={() => submit.mutate()}
          >
            Submit ({answered}/{totalQ})
          </Button>
        )}
      </div>

      {submit.isError && (
        <p className="text-xs text-red-400 text-center bg-red-950/30 border border-red-900/50 rounded-lg px-3 py-2">
          {(submit.error as { response?: { data?: { message?: string } } })?.response?.data
            ?.message ?? "Submission failed. Try again."}
        </p>
      )}
    </div>
  );
}
