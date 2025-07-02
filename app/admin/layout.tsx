// app/admin/layout.tsx
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import AdminLayoutClient from "@/components/AdminLayoutClient";

interface Props {
  children: ReactNode;
}

export default async function AdminLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/admin-login");
  }

  return (
    <div className="flex min-h-screen">
      {/* 🟡 AdminSidebar akan dirender di layout client terpisah */}
      <Suspense fallback={<div>Loading Sidebar...</div>}>
        <AdminLayoutClient>{children}</AdminLayoutClient>
      </Suspense>
    </div>
  );
}
