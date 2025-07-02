// app/admin/page.tsx
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import AdminOverview from '@/components/dashboard/AdminOverview'

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'admin') {
    redirect("/admin-login")
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-green-700">Dashboard Admin</h1>
      <AdminOverview />
    </div>
  )
}
