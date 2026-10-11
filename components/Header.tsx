"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useStore } from "@/lib/store";
import { initials } from "@/lib/format";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

const NAV = [
  { href: "/search", label: "All homes", match: (p: string, c: string | null) => p === "/search" && !c },
  { href: "/search?category=residential", label: "Residential", match: (p: string, c: string | null) => p === "/search" && c === "residential" },
  { href: "/search?category=commercial", label: "Commercial", match: (p: string, c: string | null) => p === "/search" && c === "commercial" },
  { href: "/help", label: "Help", match: (p: string) => p === "/help" },
];

export function Header() {
  const pathname = usePathname();
  const params = useSearchParams();
  const category = params.get("category");
  const { user, ready, signOut } = useStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" aria-label="DALALI home">
          <Logo size={28} />
        </Link>
        <nav className="nav" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={n.match(pathname, category) ? "active" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link href="/search" className="icon-btn mobile-only" aria-label="Search">
            <Icon name="search" />
          </Link>
          {!ready ? null : user ? (
            <div className="menu" ref={menuRef}>
              <button
                className="btn btn-ghost"
                style={{ padding: "0 6px 0 4px", height: 46 }}
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
              >
                <span className="avatar">{initials(user.name)}</span>
                <span className="desktop-only" style={{ fontWeight: 600 }}>{user.name.split(" ")[0]}</span>
                <Icon name="down" size={16} />
              </button>
              {open && (
                <div className="menu-pop" role="menu" onClick={() => setOpen(false)}>
                  <Link href="/profile" role="menuitem">Profile</Link>
                  <Link href="/saved" role="menuitem">Saved properties</Link>
                  <Link href="/profile#viewings" role="menuitem">Viewing requests</Link>
                  <Link href="/settings" role="menuitem">Settings</Link>
                  <hr className="divider" style={{ margin: "6px 0" }} />
                  <button
                    role="menuitem"
                    onClick={() => {
                      signOut();
                      router.push("/");
                    }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href={`/signin?next=${encodeURIComponent(pathname)}`} className="btn btn-ghost desktop-only">
                Sign in
              </Link>
              <Link href="/signup" className="btn btn-secondary" style={{ height: 40 }}>
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function TabBar() {
  const pathname = usePathname();
  const tabs = [
    { href: "/", label: "Home", icon: "home" as const, active: pathname === "/" || pathname.startsWith("/search") || pathname.startsWith("/property") },
    { href: "/saved", label: "Saved", icon: "heart" as const, active: pathname === "/saved" },
    { href: "/help", label: "Help", icon: "help" as const, active: pathname === "/help" },
    { href: "/profile", label: "Profile", icon: "user" as const, active: pathname === "/profile" || pathname === "/settings" },
  ];
  return (
    <div className="tabbar">
      <nav aria-label="Tabs">
        {tabs.map((t) => (
          <Link key={t.href} href={t.href} className={t.active ? "active" : undefined}>
            <Icon name={t.icon} size={22} />
            {t.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
