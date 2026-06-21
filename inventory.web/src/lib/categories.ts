import { Category } from "@/types/category";
import {apiFetch} from "./api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getCategories(): Promise<Category[]> {
  const token = localStorage.getItem("accessToken");

  const response = await apiFetch(`${API_BASE_URL}/api/Categories`, {
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

export async function createCategory(data: { name: string }) {

  const response = await apiFetch(`${API_BASE_URL}/api/Categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create category");
  }

  return response.json();
}

export async function updateCategory(id: number, data: { name: string }) {

  const response = await apiFetch(`${API_BASE_URL}/api/Categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update category");
  }
}

export async function deleteCategory(id: number) {

  const response = await apiFetch(`${API_BASE_URL}/api/Categories/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete category");
  }
}