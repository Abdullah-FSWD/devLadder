"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { userApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const levels = [
  {
    id: "beginner",
    label: "Beginner",
    range: "0–1 years",
    desc: "Just starting out or still learning the basics.",
  },
  {
    id: "intermediate",
    label: "Intermediate",
    range: "2–3 years",
    desc: "Built some projects, familiar with the stack.",
  },
  {
    id: "advanced",
    label: "Advanced",
    range: "4+ years",
    desc: "Production experience, want to sharpen and systematize.",
  },
];

export default function OnboardingPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading, setUser } = useAuth();
  const router = useRouter();

  // Guard: no token → login; already onboarded → dashboard
  if (!authLoading && !user) {
    router.replace("/login");
    return null;
  }
  if (!authLoading && user?.onboardingComplete) {
    router.replace("/dashboard");
    return null;
  }

  async function handleContinue() {
    if (!selected) return;
    setLoading(true);
    try {
      const updated = await userApi.setLevel(selected);
      setUser(updated);
      router.replace("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-zinc-100">What&apos;s your experience level?</h1>
          <p className="text-sm text-zinc-500 mt-1">This determines your starting roadmap.</p>
        </div>

        <div className="space-y-3 mb-6">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelected(level.id)}
              className={cn(
                "w-full text-left p-4 rounded-xl border transition-colors",
                selected === level.id
                  ? "border-violet-600 bg-violet-600/10"
                  : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-zinc-100">{level.label}</span>
                <span className="text-xs text-zinc-500">{level.range}</span>
              </div>
              <p className="text-xs text-zinc-500">{level.desc}</p>
            </button>
          ))}
        </div>

        <Button
          className="w-full"
          disabled={!selected}
          loading={loading}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
