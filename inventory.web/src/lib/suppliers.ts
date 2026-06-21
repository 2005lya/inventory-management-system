import { Supplier } from "@/types/supplier";
import { apiFetch } from "./api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getSuppliers(): Promise<Supplier[]> {

  const response = await apiFetch(`${API_BASE_URL}/api/Suppliers`);

  if (!response.ok) {
    throw new Error("Failed to fetch suppliers");
  }

  return response.json();
}

export async function createSupplier(data: {
  name: string;
  contactPerson: string;
  email: string;
}) {


  const response = await apiFetch(`${API_BASE_URL}/api/Suppliers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create supplier");
  }

  return response.json();
}

export async function updateSupplier(
  id: number,
  data: {
    name: string;
    contactPerson: string;
    email: string;
  }
) {

  const response = await apiFetch(`${API_BASE_URL}/api/Suppliers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update supplier");
  }
}


export async function deleteSupplier(id: number) {

  const response = await apiFetch(`${API_BASE_URL}/api/Suppliers/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete supplier");
  }
}