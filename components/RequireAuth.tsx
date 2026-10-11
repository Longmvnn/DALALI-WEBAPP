"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import type { User } from "@/lib/types";
import { Icon } from "./Icon";

/** Renders children only for signed-in users; otherwise a sign-in prompt. */
export function RequireAuth({ children, title }: { children: (user: User) => React.ReactNode; title: string }) {
  const { user, ready } = useStore();
  const pathname = usePathname();
  if (!ready) return <div className="container page" style={{ minHeight: "50vh" }} />;
  if (!user) {
    return (
      <div className="container page" style={{ maxWidth: 520 }}>
        <div className="card empty">
          <div className="ring"><Icon name="lock" size={28} /></div>
          <h1 className="h2">{title}</h1>
          <p className="small" style={{ margin: "0 0 8px" }}>Sign in to see this page.</p>
          <div className="row">
            <Link href={`/signin?next=${encodeURIComponent(pathname)}`} className="btn btn-primary">Sign in</Link>
            <Link href={`/signup?next=${encodeURIComponent(pathname)}`} className="btn btn-secondary">Create account</Link>
          </div>
        </div>
      </div>
    );
  }
  return <>{children(user)}</>;
}
