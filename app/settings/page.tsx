"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { RequireAuth } from "@/components/RequireAuth";
import { useStore } from "@/lib/store";
import type { User } from "@/lib/types";

type Theme = "system" | "light" | "dark";

function readPref(key: string, fallback: string): string {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}
function setDocumentTheme(t: "light" | "dark" | null) {
  if (t) document.documentElement.setAttribute("data-theme", t);
  else document.documentElement.removeAttribute("data-theme");
}
function writePref(key: string, value: string | null) {
  try {
    if (value == null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

export default function SettingsPage() {
  return <RequireAuth title="Settings">{(user) => <Settings user={user} />}</RequireAuth>;
}

function Settings({ user }: { user: User }) {
  const { updateUser, signOut } = useStore();
  const router = useRouter();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone ?? "");
  const [savedMsg, setSavedMsg] = useState(false);
  const [theme, setTheme] = useState<Theme>("system");
  const [push, setPush] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read stored preferences after mount
    setTheme(readPref("dalali:theme", "system") as Theme);
    setPush(readPref("dalali:push", "on") === "on");
  }, []);

  function applyTheme(t: Theme) {
    setTheme(t);
    if (t === "system") {
      writePref("dalali:theme", null);
      setDocumentTheme(null);
    } else {
      writePref("dalali:theme", t);
      setDocumentTheme(t);
    }
  }

  return (
    <div className="container page stack" style={{ maxWidth: 720, gap: 24 }}>
      <h1>Settings</h1>

      <section className="card card-pad">
        <h2 style={{ marginBottom: 16 }}>Profile</h2>
        <form
          className="stack"
          onSubmit={(e) => {
            e.preventDefault();
            if (name.trim().length < 2) return;
            updateUser({ name: name.trim(), phone: phone.trim() });
            setSavedMsg(true);
            setTimeout(() => setSavedMsg(false), 2500);
          }}
        >
          <label className="field">
            <span>Full name</span>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </label>
          <label className="field">
            <span>Phone number</span>
            <input className="input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
          </label>
          <label className="field">
            <span>Email</span>
            <input className="input" value={user.email} disabled />
          </label>
          <div className="row">
            <button className="btn btn-primary" type="submit">Save changes</button>
            {savedMsg && <span className="small" role="status" style={{ color: "var(--teal)" }}>Saved</span>}
          </div>
        </form>
      </section>

      <section className="card card-pad">
        <h2 style={{ marginBottom: 4 }}>Preferences</h2>
        <div className="setting">
          <Icon name="bell" />
          <div className="txt">
            <strong>Push notifications</strong>
            <span className="small">Updates when a dalali confirms your viewing</span>
          </div>
          <button
            className="switch"
            role="switch"
            aria-checked={push}
            aria-label="Push notifications"
            onClick={() => {
              setPush(!push);
              writePref("dalali:push", push ? "off" : "on");
            }}
          />
        </div>
        <div className="setting" style={{ flexWrap: "wrap" }}>
          <Icon name="moon" />
          <div className="txt">
            <strong>Appearance</strong>
            <span className="small">Light, dark, or match your device</span>
          </div>
          <div className="seg-toggle" style={{ minWidth: 240 }}>
            {(["system", "light", "dark"] as const).map((t) => (
              <button key={t} aria-pressed={theme === t} onClick={() => applyTheme(t)} style={{ textTransform: "capitalize" }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="card card-pad">
        <h2 style={{ marginBottom: 4 }}>Support</h2>
        {[
          { href: "/help", icon: "help" as const, t: "Help & Support", d: "FAQs and contact" },
          { href: "/help#terms", icon: "doc" as const, t: "Terms & Conditions", d: "Understand our service agreements" },
          { href: "/help#privacy", icon: "lock" as const, t: "Privacy Policy", d: "How we handle your data" },
        ].map((r) => (
          <Link key={r.t} href={r.href} className="setting">
            <Icon name={r.icon} />
            <div className="txt">
              <strong>{r.t}</strong>
              <span className="small">{r.d}</span>
            </div>
            <Icon name="chevron" size={18} />
          </Link>
        ))}
        <div className="setting">
          <Icon name="building" />
          <div className="txt">
            <strong>About</strong>
            <span className="small">DALALI web app · version 0.1.0</span>
          </div>
        </div>
      </section>

      <button
        className="btn btn-secondary btn-block btn-lg"
        onClick={() => {
          signOut();
          router.push("/");
        }}
      >
        <Icon name="logout" size={18} /> Sign out
      </button>
    </div>
  );
}
