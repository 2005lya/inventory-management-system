"use client";

import { useEffect, useState } from "react";
import { createProduct } from "@/lib/products";
import { Category } from "@/types/category";
import { Supplier } from "@/types/supplier";
import { getCategories } from "@/lib/categories";
import { getSuppliers } from "@/lib/suppliers";
import ProtectedRoute from "@/components/ProtectedRoute";
import toast from "react-hot-toast";
import AdminRoute from "@/components/AdminRoute";

export default function NewProductPage() {
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
        async function loadOptions() {
            try {
                const [categoriesResult, suppliersResult] = await Promise.all([
                    getCategories(),
                    getSuppliers(),
                ]);

                setCategories(categoriesResult);
                setSuppliers(suppliersResult);

                if (categoriesResult.length > 0) {
                    setCategoryId(categoriesResult[0].id);
                }

                if (suppliersResult.length > 0) {
                    setSupplierId(suppliersResult[0].id);
                }
            } catch {
                setError("Failed to load categories or suppliers");
            }
        }

        loadOptions();
    }, []);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setError("");

        try {
            await createProduct({
                sku,
                name,
                quantity,
                lowStockThreshold,
                categoryId,
                supplierId,
            });

            window.location.href = "/products";
        } catch {
            setError("Failed to create product");
            toast.error("Failed to create product");
        }
    }

    return (
         <AdminRoute>
        <ProtectedRoute>
            <main className="p-8">
                <h1 className="mb-6 text-2xl font-bold">New Product</h1>

            {error && <p className="mb-4 text-red-600">{error}</p>}

            <form onSubmit={handleSubmit} className="max-w-md space-y-4">
                <div>
                    <label className="mb-1 block font-medium">
                        SKU
                    </label>

                    <input
                        className="w-full rounded border p-2"
                        placeholder="Enter SKU"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                    />
                </div>

                <div>
                    <label className="mb-1 block font-medium">
                        Product Name
                    </label>

                    <input
                        className="w-full rounded border p-2"
                        placeholder="Enter product name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="mb-1 block font-medium">
                        Quantity
                    </label>

                    <input
                        className="w-full rounded border p-2"
                        type="number"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                </div>

                <div>
                    <label className="mb-1 block font-medium">
                        Low Stock Threshold
                    </label>

                    <input
                        className="w-full rounded border p-2"
                        type="number"
                        placeholder="Enter low stock threshold"
                        value={lowStockThreshold}
                        onChange={(e) =>
                            setLowStockThreshold(Number(e.target.value))
                        }
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
                    Create Product
                </button>
            </form>
        </main>
            </ProtectedRoute>
            </AdminRoute>
    );
}