import { PagedResult, Product } from "@/types/product";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getProducts(search = ""): Promise<PagedResult<Product>> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/api/Products?page=1&pageSize=20&search=${encodeURIComponent(search)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/api/Products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}/api/Products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
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
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/api/Products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }
}

export async function deleteProduct(id: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}/api/Products/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
}