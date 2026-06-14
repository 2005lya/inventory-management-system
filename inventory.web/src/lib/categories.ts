import { Category } from "@/types/category";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getCategories(): Promise<Category[]> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/api/Categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

export async function createCategory(data: { name: string }) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/api/Categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create category");
  }

  return response.json();
}

export async function updateCategory(id: number, data: { name: string }) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/api/Categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update category");
  }
}

export async function deleteCategory(id: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/api/Categories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete category");
  }
}