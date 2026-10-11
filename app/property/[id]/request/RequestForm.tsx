"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/PropertyCard";
import { dayParts, longDate, toISODate, tsh } from "@/lib/format";
import { useStore } from "@/lib/store";
import type { Property, ViewingRequest } from "@/lib/types";

const TIMES = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];

function nextDays(n: number): string[] {
  const out: string[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (out.length < n) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) out.push(toISODate(d)); // no Sunday viewings
  }
  return out;
}

export function RequestForm({ property: p, dalaliName }: { property: Property; dalaliName: string }) {
  const router = useRouter();
  const { user, ready, requestViewing } = useStore();
  // Dates come from the visitor's clock, so compute them after mount (server time zone may differ).
  const [days, setDays] = useState<string[]>([]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only dates
    setDays(nextDays(5));
  }, []);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [note, setNote] = useState("");
  const [done, setDone] = useState<ViewingRequest | null>(null);
  const first = dalaliName.split(" ")[0];

  if (done) {
    return (
      <div className="container page" style={{ maxWidth: 560 }}>
        <div className="card card-pad stack" style={{ textAlign: "center", gap: 14, padding: 36 }}>
          <div className="success-ring"><Icon name="check" size={40} stroke={2.4} /></div>
          <h1>Viewing requested!</h1>
          <p className="muted" style={{ margin: 0 }}>
            {dalaliName} will review and confirm your request. We&apos;ll notify you as soon as it&apos;s approved.
          </p>
          <div className="card" style={{ textAlign: "left", padding: 16, background: "var(--surface-2)" }}>
            <div className="row" style={{ marginBottom: 10 }}>
              <Icon name="calendar" size={18} /> <strong style={{ color: "var(--heading)" }}>{longDate(done.date)}</strong>
            </div>
            <div className="row" style={{ marginBottom: 10 }}>
              <Icon name="clock" size={18} /> {done.time}
            </div>
            <div className="row" style={{ marginBottom: 10 }}>
              <Icon name="home" size={18} /> {p.title}, {p.area}
            </div>
            <div className="row">
              <Icon name="user" size={18} /> Dalali: {dalaliName}
            </div>
          </div>
          <Link href="/profile#viewings" className="btn btn-primary btn-block btn-lg">View my requests</Link>
          <Link href="/search" className="btn btn-ghost btn-block">Back to listings</Link>
        </div>
      </div>
    );
  }

  const canSubmit = date && time;

  return (
    <div className="container page" style={{ maxWidth: 720 }}>
      <Link href={`/property/${p.id}`} className="btn btn-ghost" style={{ marginLeft: -12, marginBottom: 8 }}>
        <Icon name="back" size={18} /> Back to property
      </Link>
      <h1 style={{ marginBottom: 20 }}>Request a viewing</h1>

      <div className="card row" style={{ padding: 12, marginBottom: 28 }}>
        <div className="thumb" style={{ width: 84, height: 64 }}><Photo tone={p.tone} /></div>
        <div style={{ minWidth: 0 }}>
          <strong style={{ color: "var(--heading)" }}>{p.title}</strong>
          <div className="small">{tsh(p.price)} / month · {p.area}</div>
        </div>
      </div>

      <form
        className="stack"
        style={{ gap: 28 }}
        onSubmit={(e) => {
          e.preventDefault();
          if (!canSubmit) return;
          if (!user) {
            router.push(`/signin?next=${encodeURIComponent(`/property/${p.id}/request`)}`);
            return;
          }
          setDone(requestViewing({ propertyId: p.id, date, time, note: note.trim() || undefined }));
          window.scrollTo({ top: 0 });
        }}
      >
        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="h2" style={{ marginBottom: 12 }}>Select a date</legend>
          <div className="days">
            {days.map((d) => {
              const { dow, day } = dayParts(d);
              return (
                <button type="button" key={d} className="day" aria-pressed={date === d} aria-label={longDate(d)} onClick={() => setDate(d)}>
                  <span>{dow}</span>
                  <strong>{day}</strong>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="h2" style={{ marginBottom: 12 }}>Select a time</legend>
          <div className="times">
            {TIMES.map((t) => (
              <button type="button" key={t} className="chip" aria-pressed={time === t} onClick={() => setTime(t)}>
                {t}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="field">
          <span>Add a note (optional)</span>
          <textarea className="textarea" placeholder="e.g. I'd prefer to view after 5pm on a weekday." value={note} onChange={(e) => setNote(e.target.value)} maxLength={300} />
        </label>

        {ready && !user && <p className="notice" style={{ margin: 0 }}>You&apos;ll be asked to sign in before we send your request to {first}.</p>}

        <button className="btn btn-primary btn-lg btn-block" type="submit" disabled={!canSubmit}>
          Confirm request
        </button>
      </form>
    </div>
  );
}
