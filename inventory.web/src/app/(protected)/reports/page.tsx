"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL, getAuthHeaders } from "@/utils/api";

type LowStockProduct = {
  id: number;
  sku: string;
  name: string;
  quantity: number;
  lowStockThreshold: number;
  categoryName?: string;
  supplierName?: string;
};
type StockMovement = {
  id: number;
  productName: string;
  quantity: number;
  movementType: string;
  createdAt: string;
};

export default function ReportsPage() {
  const [products, setProducts] = useState<LowStockProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [movements, setMovements] = useState<StockMovement[]>([]);

  useEffect(() => {
    async function loadLowStockProducts() {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch(`${API_BASE_URL}/api/Reports/low-stock`, {
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error("Failed to load low stock products");
        }

        const data = await response.json();
        setProducts(data);

        const movementsResponse = await fetch(
  `${API_BASE_URL}/api/Reports/stock-movements`,
  {
    headers: getAuthHeaders(),
  }
);

if (!movementsResponse.ok) {
  throw new Error("Failed to load stock movements");
}

const movementsData = await movementsResponse.json();
setMovements(movementsData);
      } catch {
        setError("Failed to load low stock products");
      } finally {
        setLoading(false);
      }
    }

    loadLowStockProducts();
  }, []);

  if (loading) return <p>Loading reports...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <main className="p-8">
      <h1 className="mb-6 text-2xl font-bold">Reports</h1>

      <section className="mt-10">
  <h2 className="mb-4 text-xl font-semibold">Stock Movement History</h2>

  {movements.length === 0 ? (
    <p>No stock movements.</p>
  ) : (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2 text-left">Product</th>
          <th className="border p-2 text-left">Type</th>
          <th className="border p-2 text-left">Quantity</th>
          <th className="border p-2 text-left">Created At</th>
        </tr>
      </thead>

      <tbody>
        {movements.map((movement) => (
          <tr key={movement.id}>
            <td className="border p-2">{movement.productName}</td>
            <td className="border p-2">{movement.movementType}</td>
            <td className="border p-2">{movement.quantity}</td>
            <td className="border p-2">
              {new Date(movement.createdAt).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</section>
    </main>
  );
}