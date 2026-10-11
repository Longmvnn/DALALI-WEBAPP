"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="btn btn-ghost"
      onClick={async () => {
        const url = window.location.href;
        try {
          if (navigator.share) await navigator.share({ title, url });
          else {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }
        } catch {
          /* share sheet dismissed */
        }
      }}
    >
      <Icon name="share" size={18} /> {copied ? "Link copied" : "Share"}
    </button>
  );
}
