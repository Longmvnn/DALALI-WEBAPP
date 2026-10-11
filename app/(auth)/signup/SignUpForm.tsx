"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { safeNext } from "../AuthShell";
import type { Role } from "@/lib/types";
import { PasswordInput } from "../PasswordInput";

const ROLES: { v: Role; t: string; d: string }[] = [
  { v: "seeker", t: "Property seeker", d: "I'm looking for a place to rent" },
  { v: "dalali", t: "Dalali", d: "I list properties for clients" },
];

export function SignUpForm() {
  const router = useRouter();
  const next = safeNext(useSearchParams().get("next") ?? undefined);
  const { signUp } = useStore();
  const [role, setRole] = useState<Role>("seeker");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <form
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const name = String(fd.get("name")).trim();
        const email = String(fd.get("email")).trim();
        const phone = String(fd.get("phone")).trim();
        const password = String(fd.get("password"));
        const confirm = String(fd.get("confirm"));
        if (name.length < 2) return setError("Please enter your full name.");
        if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Please enter a valid email address.");
        if (phone.replace(/\D/g, "").length < 9) return setError("Please enter a valid phone number.");
        if (password.length < 6) return setError("Password must be at least 6 characters.");
        if (password !== confirm) return setError("Passwords don't match.");
        if (!fd.get("terms")) return setError("Please accept the Terms & Conditions.");
        setError("");
        setBusy(true);
        await signUp({ name, email, phone, role, password });
        router.push(next !== "/" ? next : "/profile");
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <h1>Create account</h1>
        <p className="muted" style={{ margin: "6px 0 0" }}>Join DALALI and rent smarter.</p>
      </div>

      <div className="role-pick" role="group" aria-label="I am a">
        {ROLES.map((r) => (
          <button type="button" key={r.v} aria-pressed={role === r.v} onClick={() => setRole(r.v)}>
            <strong>{r.t}</strong>
            <span>{r.d}</span>
          </button>
        ))}
      </div>

      <label className="field">
        <span>Full name</span>
        <input className="input" name="name" autoComplete="name" required placeholder="e.g. Amina Juma" />
      </label>
      <label className="field">
        <span>Email</span>
        <input className="input" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
      </label>
      <label className="field">
        <span>Phone number</span>
        <input className="input" name="phone" type="tel" autoComplete="tel" required placeholder="+255 7XX XXX XXX" />
      </label>
      <label className="field">
        <span>Password</span>
        <PasswordInput name="password" autoComplete="new-password" required minLength={6} placeholder="At least 6 characters" />
      </label>
      <label className="field">
        <span>Confirm password</span>
        <PasswordInput name="confirm" autoComplete="new-password" required placeholder="Repeat your password" />
      </label>
      <label className="row small" style={{ gap: 10, alignItems: "flex-start" }}>
        <input type="checkbox" name="terms" style={{ marginTop: 3, accentColor: "var(--navy)" }} />
        <span>
          I agree to the <Link href="/help#terms" className="link">Terms &amp; Conditions</Link> and{" "}
          <Link href="/help#privacy" className="link">Privacy Policy</Link>.
        </span>
      </label>
      {error && <p className="error" role="alert" style={{ margin: 0 }}>{error}</p>}
      <button className="btn btn-primary btn-lg btn-block" type="submit" disabled={busy}>
        {busy ? "Creating account…" : "Create account"}
      </button>
      <p className="small" style={{ textAlign: "center", margin: 0 }}>
        Already have an account?{" "}
        <Link href={`/signin${next !== "/" ? `?next=${encodeURIComponent(next)}` : ""}`} className="link">Sign in</Link>
      </p>
    </form>
  );
}
