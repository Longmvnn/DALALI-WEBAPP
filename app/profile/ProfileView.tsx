"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/PropertyCard";
import { RequireAuth } from "@/components/RequireAuth";
import { initials, shortDate, tsh } from "@/lib/format";
import { useStore } from "@/lib/store";
import { useProperties } from "@/lib/useProperties";
import type { User } from "@/lib/types";

export function ProfileView() {
  return <RequireAuth title="Your profile">{(user) => <Profile user={user} />}</RequireAuth>;
}

function Profile({ user }: { user: User }) {
  const { saved, viewings } = useStore();
  const savedProps = useProperties(saved);
  const viewingProps = useProperties(viewings.map((v) => v.propertyId));
  const byId = new Map((viewingProps ?? []).map((p) => [p.id, p]));
  const isDalali = user.role === "dalali";

  return (
    <div className="container page stack" style={{ gap: 24 }}>
      <div className="card card-pad profile-head">
        <span className="avatar avatar-lg">{initials(user.name)}</span>
        <div style={{ flex: 1, minWidth: 200 }}>
          <h1>{user.name}</h1>
          <p className="muted" style={{ margin: 0 }}>
            {isDalali ? "Dalali" : "Property Seeker"} · Dar es Salaam
          </p>
          <p className="small" style={{ margin: "2px 0 0" }}>{user.email}{user.phone ? ` · ${user.phone}` : ""}</p>
        </div>
        <Link href="/settings" className="btn btn-secondary"><Icon name="edit" size={16} /> Edit profile</Link>
      </div>

      <div className="card stats">
        <div><strong>{saved.length}</strong><span className="small">Saved</span></div>
        <div><strong>{viewings.length}</strong><span className="small">Requests</span></div>
        <div><strong>{viewings.filter((v) => v.status === "confirmed").length}</strong><span className="small">Confirmed</span></div>
      </div>

      {isDalali && (
        <div className="notice row" style={{ alignItems: "flex-start" }}>
          <Icon name="building" size={20} />
          <span>
            Posting and managing listings on the web is coming soon. For now, use the DALALI Android app to post a listing.
          </span>
        </div>
      )}

      <div className="two-col">
        <section className="card card-pad" id="viewings">
          <div className="section-head" style={{ marginBottom: 6 }}>
            <h2>Viewing requests</h2>
          </div>
          {viewings.length === 0 ? (
            <p className="small">
              No viewing requests yet. Find a property and tap <strong>Request a viewing</strong>.
            </p>
          ) : (
            <div>
              {viewings.map((v) => {
                const p = byId.get(v.propertyId);
                return (
                  <Link key={v.id} href={`/property/${v.propertyId}`} className="list-row">
                    <div className="thumb"><Photo tone={p?.tone ?? 0} /></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <strong style={{ color: "var(--heading)", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {p ? `${p.title}, ${p.area}` : "Property"}
                      </strong>
                      <span className="small">{shortDate(v.date)} · {v.time}</span>
                    </div>
                    <span className={`badge ${v.status === "confirmed" ? "badge-confirmed" : "badge-pending"}`}>{v.status}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        <section className="card card-pad">
          <div className="section-head" style={{ marginBottom: 6 }}>
            <h2>Saved properties</h2>
            {saved.length > 0 && <Link href="/saved" className="link small">See all</Link>}
          </div>
          {saved.length === 0 ? (
            <p className="small">Tap the heart on any listing to save it here.</p>
          ) : (
            <div>
              {(savedProps ?? []).slice(0, 4).map((p) => (
                <Link key={p.id} href={`/property/${p.id}`} className="list-row">
                  <div className="thumb"><Photo tone={p.tone} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ color: "var(--heading)", display: "block" }}>{p.title}</strong>
                    <span className="small">{tsh(p.price)} / month · {p.area}</span>
                  </div>
                  <Icon name="chevron" size={18} />
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
