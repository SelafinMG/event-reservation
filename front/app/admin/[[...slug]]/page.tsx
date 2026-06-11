"use client";

import dynamic from "next/dynamic";

const AppAdmin = dynamic(
  () => import("@/components/admin/AppAdmin").then((m) => m.AppAdmin),
  { ssr: false }
);

export default function AdminPage() {
  return <AppAdmin />;
}
