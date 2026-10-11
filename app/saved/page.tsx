"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PropertyCard } from "@/components/PropertyCard";
import { useStore } from "@/lib/store";
import { useProperties } from "@/lib/useProperties";

export default function SavedPage() {
  const { saved, ready } = useStore();
  const list = useProperties(ready ? saved : []);

  return (
    <div className="container page">
      <div className="section-head">
        <h1>Saved properties</h1>
        {ready && saved.length > 0 && <span className="small">{saved.length} saved</span>}
      </div>
      {!ready || list === null ? null : saved.length === 0 ? (
        <div className="card empty">
          <div className="ring"><Icon name="heart" size={28} /></div>
          <h2>Nothing saved yet</h2>
          <p className="small" style={{ margin: "0 0 8px", maxWidth: 340 }}>
            Tap the heart on any listing to keep it here so you can compare later.
          </p>
          <Link href="/search" className="btn btn-primary">Browse properties</Link>
        </div>
      ) : (
        <div className="grid">
          {list.map((p) => (
            <PropertyCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
