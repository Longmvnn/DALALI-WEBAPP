"use client";

import { useStore } from "@/lib/store";
import { Icon } from "./Icon";

export function SaveButton({ id, withLabel = false }: { id: string; withLabel?: boolean }) {
  const { isSaved, toggleSaved, ready } = useStore();
  const saved = ready && isSaved(id);

  if (withLabel) {
    return (
      <button className="btn btn-secondary" aria-pressed={saved} onClick={() => toggleSaved(id)}>
        <Icon name="heart" filled={saved} size={18} />
        {saved ? "Saved" : "Save"}
      </button>
    );
  }
  return (
    <button
      className="icon-btn"
      aria-label={saved ? "Remove from saved" : "Save property"}
      aria-pressed={saved}
      onClick={() => toggleSaved(id)}
      style={{ color: saved ? "var(--amber)" : "var(--navy)", background: "rgba(255,255,255,.92)", borderColor: "transparent" }}
    >
      <Icon name="heart" filled={saved} size={18} />
    </button>
  );
}
