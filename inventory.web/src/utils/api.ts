export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}