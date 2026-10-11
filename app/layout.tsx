import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Figtree, Unbounded } from "next/font/google";
import { Header, TabBar } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { StoreProvider } from "@/lib/store";
import "./globals.css";

const unbounded = Unbounded({ variable: "--font-unbounded", subsets: ["latin"], weight: ["400", "500"] });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: { default: "DALALI · Rent Smarter", template: "%s · DALALI" },
  description: "Find verified rooms, apartments, houses and commercial space across Dar es Salaam.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F3EC" },
    { media: "(prefers-color-scheme: dark)", color: "#0A1626" },
  ],
};

// Applies the saved theme before first paint so there's no light/dark flash.
const themeScript = `try{var t=localStorage.getItem("dalali:theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${unbounded.variable} ${figtree.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <StoreProvider>
          <Suspense fallback={<div className="site-header" style={{ height: 69 }} />}>
            <Header />
          </Suspense>
          <main>{children}</main>
          <footer className="site-footer">
            <div className="container">
              <Logo size={22} />
              <nav className="small">
                <Link href="/search">Browse</Link>
                <Link href="/help">Help &amp; Support</Link>
                <Link href="/help#terms">Terms &amp; Conditions</Link>
                <Link href="/help#privacy">Privacy Policy</Link>
              </nav>
              <span className="small">© 2026 Dalali Msomi · Dar es Salaam, Tanzania</span>
            </div>
          </footer>
          <Suspense fallback={null}>
            <TabBar />
          </Suspense>
        </StoreProvider>
      </body>
    </html>
  );
}
