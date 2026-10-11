import { LogoMark } from "@/components/Logo";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-wrap">
      <div className="auth-art">
        <LogoMark size={56} mark="var(--sand)" />
        <div className="stack" style={{ gap: 12 }}>
          <h2>Find a home you can trust, with a dalali you can rely on.</h2>
          <p>Verified listings, real prices in TSh, and viewings booked in a few taps, from Mabibo to Masaki.</p>
        </div>
        <div className="kanga" style={{ margin: "0 -56px -56px" }} aria-hidden="true" />
      </div>
      <div className="auth-form">{children}</div>
    </div>
  );
}

export function safeNext(next: string | string[] | undefined): string {
  const v = Array.isArray(next) ? next[0] : next;
  // Only allow same-site relative paths.
  return v && v.startsWith("/") && !v.startsWith("//") ? v : "/";
}
