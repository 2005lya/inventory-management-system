import { PagedResult, Product } from "@/types/product";
import { apiFetch } from "./api";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getProducts(search = ""): Promise<PagedResult<Product>> {
  const token = localStorage.getItem("accessToken");

  const response = await apiFetch(
    `${API_BASE_URL}/api/Products?page=1&pageSize=20&search=${encodeURIComponent(search)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function createProduct(data: {
  sku: string;
  name: string;
  quantity: number;
  lowStockThreshold: number;
  categoryId: number;
  supplierId: number;
}) {
  const response = await apiFetch(`${API_BASE_URL}/api/Products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  return response.json();
}

export async function getProduct(
  id: number
): Promise<Product> {
  const response = await apiFetch(
    `${API_BASE_URL}/api/Products/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

export async function updateProduct(
  id: number,
  data: {
    sku: string;
    name: string;
    quantity: number;
    lowStockThreshold: number;
    categoryId: number;
    supplierId: number;
  }
) {
  const response = await apiFetch(
    `${API_BASE_URL}/api/Products/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update product");
  }
}

export async function deleteProduct(id: number) {
  const response = await apiFetch(
    `${API_BASE_URL}/api/Products/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
}