"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, MailOpen, XCircle } from "lucide-react";
import Link from "next/link";

type Status = "idle" | "verifying" | "success" | "error" | "resending" | "resent";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-zinc-100">
            Dev<span className="text-violet-500">Ladder</span>
          </h1>
        </div>
        <Suspense fallback={<div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex justify-center"><Spinner /></div>}>
          <VerifyEmailContent />
        </Suspense>
      </div>
    </div>
  );
}

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, setUser } = useAuth();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<Status>(token ? "verifying" : "idle");
  const [errorMsg, setErrorMsg] = useState("");
  const hasRun = useRef(false);

  // Auto-verify when token is in URL
  useEffect(() => {
    if (!token || hasRun.current) return;
    hasRun.current = true;

    authApi
      .verifyEmail(token)
      .then((updatedUser) => {
        if (user) setUser({ ...user, isEmailVerified: true });
        setStatus("success");
        setTimeout(() => router.replace(updatedUser.onboardingComplete ? "/dashboard" : "/onboarding"), 2000);
      })
      .catch((err) => {
        setErrorMsg(
          err?.response?.data?.message ?? "Verification failed. The link may have expired."
        );
        setStatus("error");
      });
  }, [token]);

  async function handleResend() {
    setStatus("resending");
    try {
      await authApi.resendVerification();
      setStatus("resent");
    } catch (err: unknown) {
      setErrorMsg(
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
          "Failed to resend. Try again."
      );
      setStatus("error");
    }
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
          {/* Verifying */}
          {status === "verifying" && (
            <>
              <Spinner className="mx-auto mb-4" />
              <p className="text-sm font-medium text-zinc-200">Verifying your email…</p>
            </>
          )}

          {/* Success */}
          {status === "success" && (
            <>
              <CheckCircle2 size={40} className="mx-auto mb-4 text-green-400" />
              <p className="text-base font-semibold text-zinc-100 mb-1">Email verified!</p>
              <p className="text-sm text-zinc-500">Redirecting you now…</p>
            </>
          )}

          {/* Error */}
          {status === "error" && (
            <>
              <XCircle size={40} className="mx-auto mb-4 text-red-400" />
              <p className="text-base font-semibold text-zinc-100 mb-1">Verification failed</p>
              <p className="text-sm text-zinc-500 mb-6">{errorMsg}</p>
              {user && !user.isEmailVerified && (
                <Button onClick={handleResend} size="sm" className="w-full">
                  Resend verification email
                </Button>
              )}
              <Link
                href="/login"
                className="block mt-3 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Back to login
              </Link>
            </>
          )}

          {/* Idle — no token, just info */}
          {status === "idle" && (
            <>
              <MailOpen size={40} className="mx-auto mb-4 text-violet-400" />
              <p className="text-base font-semibold text-zinc-100 mb-1">Check your inbox</p>
              <p className="text-sm text-zinc-500 mb-6">
                We sent a verification link to{" "}
                <span className="text-zinc-300">{user?.email ?? "your email"}</span>.
                Click it to activate your account.
              </p>
              {user && !user.isEmailVerified && (
                <Button
                  onClick={handleResend}
                  variant="secondary"
                  size="sm"
                  className="w-full"
                >
                  Resend email
                </Button>
              )}
            </>
          )}

          {/* Resending */}
          {status === "resending" && (
            <>
              <Spinner className="mx-auto mb-4" />
              <p className="text-sm font-medium text-zinc-200">Sending…</p>
            </>
          )}

          {/* Resent */}
          {status === "resent" && (
            <>
              <MailOpen size={40} className="mx-auto mb-4 text-violet-400" />
              <p className="text-base font-semibold text-zinc-100 mb-1">Email sent!</p>
              <p className="text-sm text-zinc-500">Check your inbox and click the link.</p>
            </>
          )}
    </div>
  );
}
