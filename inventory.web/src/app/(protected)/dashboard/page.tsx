"use client";

import { useEffect, useState } from "react";
import { getDashboardData } from "@/lib/dashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";

type DashboardData = {
  totalProducts: number;
  totalCategories: number;
  totalSuppliers: number;
  lowStockCount: number;
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {

    const token = localStorage.getItem("accessToken");

  if (!token) {
    router.replace("/login");
    return;
  }
    async function loadDashboard() {
      try {
        const result = await getDashboardData();
        setData(result);
      } catch {
        setError("Failed to load dashboard");
      }
    }

    loadDashboard();
  }, []);

  if (error) {
    return <main className="p-8 text-red-600">{error}</main>;
  }

  if (!data) {
    return <main className="p-8">Loading...</main>;
  }

  return (
    <ProtectedRoute>
      <main className="p-8">
        <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-4">
        <DashboardCard title="Total Products" value={data.totalProducts} />
        <DashboardCard title="Total Categories" value={data.totalCategories} />
        <DashboardCard title="Total Suppliers" value={data.totalSuppliers} />
        <DashboardCard title="Low Stock" value={data.lowStockCount} />
      </div>
    </main>
    </ProtectedRoute>
  );
}

function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded border bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}