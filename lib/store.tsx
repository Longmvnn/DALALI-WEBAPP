"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import type { Role, User, ViewingRequest } from "./types";

// Client-side session + saved items + viewing requests.
// For now this lives in localStorage so the web app works on its own.
// When the backend is ready, swap these calls for real auth and API requests.

const KEY = "dalali:v1";

interface Persisted {
  user: User | null;
  saved: string[];
  viewings: ViewingRequest[];
}

interface Store extends Persisted {
  ready: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (input: { name: string; email: string; phone: string; role: Role; password: string }) => Promise<User>;
  signOut: () => void;
  updateUser: (patch: Partial<Pick<User, "name" | "phone">>) => void;
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
  requestViewing: (v: Omit<ViewingRequest, "id" | "status" | "createdAt">) => ViewingRequest;
}

const Ctx = createContext<Store | null>(null);

const empty: Persisted = { user: null, saved: [], viewings: [] };

function load(): Persisted {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    const v = JSON.parse(raw) as Partial<Persisted>;
    return { user: v.user ?? null, saved: v.saved ?? [], viewings: v.viewings ?? [] };
  } catch {
    return empty;
  }
}

function nameFromEmail(email: string): string {
  const base = email.split("@")[0] ?? "Guest";
  return base
    .split(/[._-]+/)
    .filter(Boolean)
    .map((s) => s[0]!.toUpperCase() + s.slice(1))
    .join(" ");
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<Persisted>(empty);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from localStorage after mount
    setState(load());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable (private mode) — keep state in memory */
    }
  }, [state, ready]);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!email.includes("@") || password.length < 6) throw new Error("Check your email and password and try again.");
    const user: User = { id: `u_${Date.now()}`, name: nameFromEmail(email), email, role: "seeker" };
    setState((s) => ({ ...s, user: s.user?.email === email ? s.user : user }));
    return user;
  }, []);

  const signUp = useCallback<Store["signUp"]>(async ({ name, email, phone, role }) => {
    const user: User = { id: `u_${Date.now()}`, name, email, phone, role };
    setState((s) => ({ ...s, user }));
    return user;
  }, []);

  const signOut = useCallback(() => setState((s) => ({ ...s, user: null })), []);

  const updateUser = useCallback<Store["updateUser"]>((patch) => {
    setState((s) => (s.user ? { ...s, user: { ...s.user, ...patch } } : s));
  }, []);

  const toggleSaved = useCallback((id: string) => {
    setState((s) => ({ ...s, saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [id, ...s.saved] }));
  }, []);

  const requestViewing = useCallback<Store["requestViewing"]>((v) => {
    const req: ViewingRequest = { ...v, id: `v_${Date.now()}`, status: "pending", createdAt: new Date().toISOString() };
    setState((s) => ({ ...s, viewings: [req, ...s.viewings] }));
    return req;
  }, []);

  const value = useMemo<Store>(
    () => ({
      ...state,
      ready,
      signIn,
      signUp,
      signOut,
      updateUser,
      toggleSaved,
      isSaved: (id) => state.saved.includes(id),
      requestViewing,
    }),
    [state, ready, signIn, signUp, signOut, updateUser, toggleSaved, requestViewing],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

const noopSubscribe = () => () => {};

export function useStore(): Store {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore must be used inside <StoreProvider>");
  // Components inside <Suspense> hydrate after the provider has loaded localStorage.
  // Until each one hydrates, show the same signed-out state the server rendered.
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  if (!hydrated) return { ...v, ...empty, ready: false, isSaved: () => false };
  return v;
}
