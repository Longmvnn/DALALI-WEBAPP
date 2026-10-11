import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthShell } from "../AuthShell";
import { SignUpForm } from "./SignUpForm";

export const metadata: Metadata = { title: "Create account" };

export default function Page() {
  return (
    <AuthShell>
      <Suspense fallback={null}>
        <SignUpForm />
      </Suspense>
    </AuthShell>
  );
}
