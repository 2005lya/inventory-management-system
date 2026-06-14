"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProduct, updateProduct } from "@/lib/products";
import { getCategories } from "@/lib/categories";
import { getSuppliers } from "@/lib/suppliers";
import { Category } from "@/types/category";
import { Supplier } from "@/types/supplier";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function EditProductPage() {
  const params = useParams();
  const productId = Number(params.id);

  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [lowStockThreshold, setLowStockThreshold] = useState(5);
  const [categoryId, setCategoryId] = useState(0);
  const [supplierId, setSupplierId] = useState(0);

  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [product, categoriesResult, suppliersResult] = await Promise.all([
          getProduct(productId),
          getCategories(),
          getSuppliers(),
        ]);

        setSku(product.sku);
        setName(product.name);
        setQuantity(product.quantity);
        setLowStockThreshold(product.lowStockThreshold);
        setCategoryId(product.categoryId);
        setSupplierId(product.supplierId);

        setCategories(categoriesResult);
        setSuppliers(suppliersResult);
      } catch {
        setError("Failed to load product");
      }
    }

    loadData();
  }, [productId]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    try {
      await updateProduct(productId, {
        sku,
        name,
        quantity,
        lowStockThreshold,
        categoryId,
        supplierId,
      });

      window.location.href = "/products";
    } catch {
      setError("Failed to update product");
    }
  }

  return (
    <ProtectedRoute>
      <main className="p-8">
        <h1 className="mb-6 text-2xl font-bold">Edit Product</h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="mb-1 block font-medium">SKU</label>
          <input
            className="w-full rounded border p-2"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Product Name</label>
          <input
            className="w-full rounded border p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Quantity</label>
          <input
            className="w-full rounded border p-2"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Low Stock Threshold</label>
          <input
            className="w-full rounded border p-2"
            type="number"
            value={lowStockThreshold}
            onChange={(e) => setLowStockThreshold(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Category</label>
          <select
            className="w-full rounded border p-2"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block font-medium">Supplier</label>
          <select
            className="w-full rounded border p-2"
            value={supplierId}
            onChange={(e) => setSupplierId(Number(e.target.value))}
          >
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        <button className="rounded bg-black px-4 py-2 text-white">
          Save Changes
        </button>
      </form>
    </main>
    </ProtectedRoute>
  );
}