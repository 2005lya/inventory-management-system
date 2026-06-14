"use client";

import { useEffect, useState } from "react";
import {
  createSupplier,
  deleteSupplier,
  getSuppliers,
  updateSupplier,
} from "@/lib/suppliers";
import { Supplier } from "@/types/supplier";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [name, setName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingSupplier, setEditingSupplier] = useState({
    name: "",
    contactPerson: "",
    email: "",
  });
  const [error, setError] = useState("");

  async function loadSuppliers() {
    const data = await getSuppliers();
    setSuppliers(data);
  }

  useEffect(() => {
    loadSuppliers();
  }, []);

  async function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Supplier name is required");
      return;
    }

    try {
      await createSupplier({
        name: name.trim(),
        contactPerson: contactPerson.trim(),
        email: email.trim(),
      });

      setName("");
      setContactPerson("");
      setEmail("");
      await loadSuppliers();
    } catch {
      setError("Failed to create supplier");
    }
  }

  function startEdit(supplier: Supplier) {
    setEditingId(supplier.id);
    setEditingSupplier({
      name: supplier.name,
      contactPerson: supplier.contactPerson,
      email: supplier.email,
    });
    setError("");
  }

  async function handleUpdate(id: number) {
    setError("");

    if (!editingSupplier.name.trim()) {
      setError("Supplier name is required");
      return;
    }

    try {
      await updateSupplier(id, {
        name: editingSupplier.name.trim(),
        contactPerson: editingSupplier.contactPerson.trim(),
        email: editingSupplier.email.trim(),
      });

      setEditingId(null);
      await loadSuppliers();
    } catch {
      setError("Failed to update supplier");
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this supplier?"
    );

    if (!confirmed) return;

    try {
      await deleteSupplier(id);
      await loadSuppliers();
    } catch {
      setError("Failed to delete supplier. It may be used by products.");
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Suppliers</h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleCreate} className="mb-6 grid gap-2 md:grid-cols-4">
        <input
          className="rounded border p-2"
          placeholder="Supplier name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="rounded border p-2"
          placeholder="Contact person"
          value={contactPerson}
          onChange={(e) => setContactPerson(e.target.value)}
        />

        <input
          className="rounded border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="rounded bg-black px-4 py-2 text-white">
          Add Supplier
        </button>
      </form>

      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="border-b text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Contact</th>
            <th className="p-3">Email</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id} className="border-b">
              <td className="p-3">{supplier.id}</td>

              <td className="p-3">
                {editingId === supplier.id ? (
                  <input
                    className="rounded border p-2"
                    value={editingSupplier.name}
                    onChange={(e) =>
                      setEditingSupplier({
                        ...editingSupplier,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  supplier.name
                )}
              </td>

              <td className="p-3">
                {editingId === supplier.id ? (
                  <input
                    className="rounded border p-2"
                    value={editingSupplier.contactPerson}
                    onChange={(e) =>
                      setEditingSupplier({
                        ...editingSupplier,
                        contactPerson: e.target.value,
                      })
                    }
                  />
                ) : (
                  supplier.contactPerson
                )}
              </td>

              <td className="p-3">
                {editingId === supplier.id ? (
                  <input
                    className="rounded border p-2"
                    value={editingSupplier.email}
                    onChange={(e) =>
                      setEditingSupplier({
                        ...editingSupplier,
                        email: e.target.value,
                      })
                    }
                  />
                ) : (
                  supplier.email
                )}
              </td>

              <td className="space-x-3 p-3">
                {editingId === supplier.id ? (
                  <>
                    <button
                      onClick={() => handleUpdate(supplier.id)}
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
                      onClick={() => startEdit(supplier)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(supplier.id)}
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