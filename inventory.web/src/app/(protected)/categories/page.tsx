"use client";

import { useEffect, useState } from "react";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/lib/categories";
import { Category } from "@/types/category";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [error, setError] = useState("");

  async function loadCategories() {
    const data = await getCategories();
    setCategories(data);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      await createCategory({ name: name.trim() });
      setName("");
      await loadCategories();
    } catch {
      setError("Failed to create category");
    }
  }

  function startEdit(category: Category) {
    setEditingId(category.id);
    setEditingName(category.name);
    setError("");
  }

  async function handleUpdate(id: number) {
    setError("");

    if (!editingName.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      await updateCategory(id, { name: editingName.trim() });
      setEditingId(null);
      setEditingName("");
      await loadCategories();
    } catch {
      setError("Failed to update category");
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteCategory(id);
      await loadCategories();
    } catch {
      setError("Failed to delete category. It may be used by products.");
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Categories</h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleCreate} className="mb-6 flex gap-2">
        <input
          className="rounded border p-2"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="rounded bg-black px-4 py-2 text-white">
          Add Category
        </button>
      </form>

      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="border-b text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-b">
              <td className="p-3">{category.id}</td>

              <td className="p-3">
                {editingId === category.id ? (
                  <input
                    className="rounded border p-2"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                  />
                ) : (
                  category.name
                )}
              </td>

              <td className="space-x-3 p-3">
                {editingId === category.id ? (
                  <>
                    <button
                      onClick={() => handleUpdate(category.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditingId(null)}
                      className="text-gray-600 hover:underline"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(category)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}