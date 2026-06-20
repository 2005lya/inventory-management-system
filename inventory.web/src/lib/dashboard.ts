import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { Supplier } from "@/types/supplier";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function getToken() {
  return localStorage.getItem("token");
}

export async function getDashboardData() {
  const token = getToken();

  const [productsRes, categoriesRes, suppliersRes, lowStockRes] =
    await Promise.all([
      fetch(`${API_BASE_URL}/api/Products?page=1&pageSize=1000`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`${API_BASE_URL}/api/Categories`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`${API_BASE_URL}/api/Suppliers`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`${API_BASE_URL}/api/Reports/low-stock`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

  if (
    !productsRes.ok ||
    !categoriesRes.ok ||
    !suppliersRes.ok ||
    !lowStockRes.ok
  ) {
    console.error({
      productsStatus: productsRes.status,
      categoriesStatus: categoriesRes.status,
      suppliersStatus: suppliersRes.status,
      lowStockStatus: lowStockRes.status,
    });

    throw new Error("Failed to fetch dashboard data");
  }

  const productsData = await productsRes.json();
  const categories = (await categoriesRes.json()) as Category[];
  const suppliers = (await suppliersRes.json()) as Supplier[];
  const lowStockProducts = (await lowStockRes.json()) as Product[];

  const products = Array.isArray(productsData)
    ? productsData
    : productsData.items ?? productsData.data ?? [];

  return {
    totalProducts: productsData.totalCount ?? products.length,
    totalCategories: categories.length,
    totalSuppliers: suppliers.length,
    lowStockCount: lowStockProducts.length,
  };
}