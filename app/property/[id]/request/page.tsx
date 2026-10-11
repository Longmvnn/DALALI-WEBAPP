import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { getDalali, getProperty } from "@/lib/api";
import { RequestForm } from "./RequestForm";

export const metadata: Metadata = { title: "Request a viewing" };

export default function RequestPage({ params }: PageProps<"/property/[id]/request">) {
  return (
    <Suspense fallback={<Loading />}>
      <RequestContent params={params} />
    </Suspense>
  );
}

async function RequestContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await getProperty(id);
  if (!p || p.status !== "available") notFound();
  const dalali = await getDalali(p.dalaliId);
  return <RequestForm property={p} dalaliName={dalali?.name ?? "The dalali"} />;
}
