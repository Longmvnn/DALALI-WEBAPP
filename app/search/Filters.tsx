"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { popularAreas } from "@/lib/mock-data";

// Filters write straight to the URL, so results are shareable and the
// back button works. On phones the panel opens as a bottom sheet.

const SheetCtx = createContext<{ open: boolean; setOpen: (v: boolean) => void }>({ open: false, setOpen: () => {} });

function useParamSetter() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  return {
    params,
    set(updates: Record<string, string | null>) {
      const sp = new URLSearchParams(params.toString());
      for (const [k, v] of Object.entries(updates)) {
        if (v == null || v === "") sp.delete(k);
        else sp.set(k, v);
      }
      router.replace(`${pathname}${sp.size ? `?${sp}` : ""}`, { scroll: false });
    },
    reset() {
      router.replace(pathname, { scroll: false });
    },
  };
}

export function Filters() {
  const { params, set, reset } = useParamSetter();
  const { open, setOpen } = useContext(SheetCtx);
  const category = params.get("category") ?? "";
  const beds = params.get("beds") ?? "";
  const furnishing = params.get("furnishing") ?? "";
  const q = params.get("q") ?? "";
  const [min, setMin] = useState(params.get("min") ?? "");
  const [max, setMax] = useState(params.get("max") ?? "");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- keep inputs in sync when URL changes elsewhere
    setMin(params.get("min") ?? "");
    setMax(params.get("max") ?? "");
  }, [params]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  return (
    <>
      {open && <div className="sheet-backdrop sheet-only" onClick={() => setOpen(false)} />}
      <aside className={`card filters${open ? " open" : ""}`} aria-label="Filters">
        <div className="filter-head">
          <h2 style={{ fontSize: 18 }}>Filters</h2>
          <div className="row" style={{ gap: 4 }}>
            <button className="btn btn-ghost" style={{ height: 34, padding: "0 10px", fontSize: 14 }} onClick={reset}>
              Reset
            </button>
            <button className="icon-btn sheet-only" aria-label="Close filters" onClick={() => setOpen(false)}>
              <Icon name="close" size={18} />
            </button>
          </div>
        </div>

        <div>
          <h3>Category</h3>
          <div className="seg-toggle">
            {[
              ["", "All"],
              ["residential", "Residential"],
              ["commercial", "Commercial"],
            ].map(([v, l]) => (
              <button key={v} aria-pressed={category === v} onClick={() => set({ category: v || null, type: null })}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            set({ min: min || null, max: max || null });
          }}
        >
          <h3>Price range (TSh / month)</h3>
          <div className="range-row">
            <input className="input" inputMode="numeric" placeholder="Min" aria-label="Minimum price" value={min} onChange={(e) => setMin(e.target.value.replace(/\D/g, ""))} onBlur={() => set({ min: min || null })} />
            <input className="input" inputMode="numeric" placeholder="Max" aria-label="Maximum price" value={max} onChange={(e) => setMax(e.target.value.replace(/\D/g, ""))} onBlur={() => set({ max: max || null })} />
          </div>
          <div className="chips" style={{ marginTop: 10 }}>
            {[
              ["", "100000", "Under 100k"],
              ["100000", "500000", "100k – 500k"],
              ["500000", "", "500k+"],
            ].map(([lo, hi, l]) => {
              const active = (params.get("min") ?? "") === lo && (params.get("max") ?? "") === hi;
              return (
                <button type="button" key={l} className="chip" style={{ height: 32, fontSize: 13 }} aria-pressed={active} onClick={() => set(active ? { min: null, max: null } : { min: lo || null, max: hi || null })}>
                  {l}
                </button>
              );
            })}
          </div>
        </form>

        <div>
          <h3>Bedrooms</h3>
          <div className="seg-toggle">
            {[
              ["", "Any"],
              ["1", "1"],
              ["2", "2"],
              ["3", "3"],
              ["4", "4+"],
            ].map(([v, l]) => (
              <button key={v} aria-pressed={beds === v} onClick={() => set({ beds: v || null })}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3>Furnishing</h3>
          <div className="seg-toggle">
            {[
              ["", "Any"],
              ["furnished", "Furnished"],
              ["unfurnished", "Unfurnished"],
            ].map(([v, l]) => (
              <button key={v} aria-pressed={furnishing === v} onClick={() => set({ furnishing: v || null })}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3>Popular areas</h3>
          <div className="chips">
            {popularAreas.map((a) => {
              const active = q.toLowerCase() === a.toLowerCase();
              return (
                <button key={a} className="chip" style={{ height: 32, fontSize: 13 }} aria-pressed={active} onClick={() => set({ q: active ? null : a })}>
                  {a}
                </button>
              );
            })}
          </div>
        </div>

        <button className="btn btn-primary btn-block sheet-only" onClick={() => setOpen(false)}>
          Show results
        </button>
      </aside>
    </>
  );
}

export function FiltersToggle() {
  const { setOpen } = useContext(SheetCtx);
  return (
    <button className="btn btn-secondary filters-toggle" style={{ height: 40 }} onClick={() => setOpen(true)}>
      <Icon name="filter" size={18} /> Filters
    </button>
  );
}

export function SortSelect() {
  const { params, set } = useParamSetter();
  return (
    <label className="row small" style={{ gap: 8 }}>
      <span className="desktop-only">Sort</span>
      <select className="select" value={params.get("sort") ?? "recent"} onChange={(e) => set({ sort: e.target.value === "recent" ? null : e.target.value })} aria-label="Sort results">
        <option value="recent">Newest first</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
      </select>
    </label>
  );
}

export function FiltersSheetProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <SheetCtx.Provider value={{ open, setOpen }}>{children}</SheetCtx.Provider>;
}
