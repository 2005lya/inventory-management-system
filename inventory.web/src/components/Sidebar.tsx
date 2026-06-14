"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    router.replace("/login");
  }

  return (
    <aside className="w-64 min-h-screen border-r bg-white">
      <div className="border-b p-4">
        <h1 className="text-xl font-bold">Inventory System</h1>
      </div>

      <nav className="p-4">
        <ul className="space-y-3">
          <li><Link href="/dashboard" className="block rounded p-2 hover:bg-gray-100">Dashboard</Link></li>
          <li><Link href="/products" className="block rounded p-2 hover:bg-gray-100">Products</Link></li>
          <li><Link href="/categories" className="block rounded p-2 hover:bg-gray-100">Categories</Link></li>
          <li><Link href="/suppliers" className="block rounded p-2 hover:bg-gray-100">Suppliers</Link></li>
          <li><Link href="/reports" className="block rounded p-2 hover:bg-gray-100">Reports</Link></li>

          <li>
            <button
              onClick={handleLogout}
              className="block w-full rounded p-2 text-left text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}