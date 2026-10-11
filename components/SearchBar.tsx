"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { popularAreas } from "@/lib/mock-data";

const BUDGETS = [
  { v: "", label: "Any budget" },
  { v: "100000", label: "Up to TSh 100k" },
  { v: "300000", label: "Up to TSh 300k" },
  { v: "600000", label: "Up to TSh 600k" },
  { v: "1500000", label: "Up to TSh 1.5M" },
  { v: "3000000", label: "Up to TSh 3M" },
];

export function SearchBar({ initial }: { initial?: { q?: string; max?: string; beds?: string } }) {
  const router = useRouter();
  const [q, setQ] = useState(initial?.q ?? "");
  const [max, setMax] = useState(initial?.max ?? "");
  const [beds, setBeds] = useState(initial?.beds ?? "");

  return (
    <form
      className="card searchbar"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const sp = new URLSearchParams();
        if (q.trim()) sp.set("q", q.trim());
        if (max) sp.set("max", max);
        if (beds) sp.set("beds", beds);
        router.push(`/search${sp.size ? `?${sp}` : ""}`);
      }}
    >
      <div className="seg">
        <label htmlFor="sb-area">Area</label>
        <input id="sb-area" list="sb-areas" placeholder="Search for properties, locations…" value={q} onChange={(e) => setQ(e.target.value)} />
        <datalist id="sb-areas">
          {popularAreas.map((a) => (
            <option key={a} value={a} />
          ))}
        </datalist>
      </div>
      <div className="seg">
        <label htmlFor="sb-budget">Budget</label>
        <select id="sb-budget" value={max} onChange={(e) => setMax(e.target.value)}>
          {BUDGETS.map((b) => (
            <option key={b.v} value={b.v}>{b.label}</option>
          ))}
        </select>
      </div>
      <div className="seg">
        <label htmlFor="sb-beds">Bedrooms</label>
        <select id="sb-beds" value={beds} onChange={(e) => setBeds(e.target.value)}>
          <option value="">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>
      <button className="btn btn-primary" type="submit">Search</button>
    </form>
  );
}
