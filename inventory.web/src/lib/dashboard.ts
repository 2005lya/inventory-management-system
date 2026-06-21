import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { Supplier } from "@/types/supplier";
import { apiFetch } from "./api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getDashboardData() {
  

  const [productsRes, categoriesRes, suppliersRes, lowStockRes] =
    await Promise.all([
      apiFetch(`${API_BASE_URL}/api/Products?page=1&pageSize=1000`),
      apiFetch(`${API_BASE_URL}/api/Categories`),
      apiFetch(`${API_BASE_URL}/api/Suppliers`),
      apiFetch(`${API_BASE_URL}/api/Reports/low-stock`),
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