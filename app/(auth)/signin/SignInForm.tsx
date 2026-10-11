"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { safeNext } from "../AuthShell";
import { PasswordInput } from "../PasswordInput";

export function SignInForm() {
  const router = useRouter();
  const next = safeNext(useSearchParams().get("next") ?? undefined);
  const { signIn } = useStore();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <form
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        setError("");
        setBusy(true);
        try {
          await signIn(String(fd.get("email")).trim(), String(fd.get("password")));
          router.push(next);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
          setBusy(false);
        }
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <h1>Welcome back!</h1>
        <p className="muted" style={{ margin: "6px 0 0" }}>Sign in to continue your journey.</p>
      </div>
      <label className="field">
        <span>Email</span>
        <input className="input" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
      </label>
      <label className="field">
        <span>Password</span>
        <PasswordInput name="password" autoComplete="current-password" required minLength={6} placeholder="Your password" />
      </label>
      <div style={{ textAlign: "right", marginTop: -6 }}>
        <Link href="/help#account" className="small link">Forgot password?</Link>
      </div>
      {error && <p className="error" role="alert" style={{ margin: 0 }}>{error}</p>}
      <button className="btn btn-primary btn-lg btn-block" type="submit" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
      <p className="small" style={{ textAlign: "center", margin: 0 }}>
        Don&apos;t have an account?{" "}
        <Link href={`/signup${next !== "/" ? `?next=${encodeURIComponent(next)}` : ""}`} className="link">Sign up</Link>
      </p>
    </form>
  );
}
