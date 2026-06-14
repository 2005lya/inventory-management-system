"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/products";
import { Product } from "@/types/product";
import { deleteProduct } from "@/lib/products";
import ProtectedRoute from "@/components/ProtectedRoute";
import { isAdmin } from "@/utils/auth";


export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const admin = isAdmin();
   

    async function handleDelete(id: number) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteProduct(id);

            setProducts((current) =>
                current.filter((p) => p.id !== id)
            );
        } catch {
            alert("Failed to delete product");
        }
    }

    async function loadProducts(searchText = "") {
        try {
            const result = await getProducts(searchText);
            setProducts(result.items);
        } catch {
            setError("Failed to load products");
        }
    }

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <ProtectedRoute>
            <main className="p-8">
                <h1 className="mb-6 text-2xl font-bold">Products</h1>
                {admin && (
                    <a
                        href="/products/new"
                        className="mb-4 inline-block rounded bg-black px-4 py-2 text-white"
                    >
                        New Product
                    </a>
                )}

                {error && <p className="mb-4 text-red-600">{error}</p>}

                <div className="mb-4 flex gap-2">
                    <input
                        className="rounded border p-2"
                        placeholder="Search product..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <button
                        className="rounded bg-black px-4 py-2 text-white"
                        onClick={() => loadProducts(search)}
                    >
                        Search
                    </button>
                </div>

                <table className="w-full border-collapse bg-white">
                    <thead>
                        <tr className="border-b text-left">
                            <th className="p-3">SKU</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Supplier</th>
                            <th className="p-3">Quantity</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-b">
                                <td className="p-3">{product.sku}</td>
                                <td className="p-3">{product.name}</td>
                                <td className="p-3">{product.categoryName}</td>
                                <td className="p-3">{product.supplierName}</td>
                                <td className="p-3">{product.quantity}</td>
                                <td className="p-3">
                                    {admin && (
                                        <a
                                            href={`/products/${product.id}/edit`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                    </a>
                                    )}
                                    <br />
                                    {admin && (
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>

        </ProtectedRoute>
    );

}
