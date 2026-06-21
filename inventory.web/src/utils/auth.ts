import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  role?: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
};

export function getUserRole() {
  const token = localStorage.getItem("accessToken");

  if (!token) return null;

  const decoded = jwtDecode<JwtPayload>(token);

  return (
    decoded.role ||
    decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
    null
  );
}

export function isAdmin() {
  return getUserRole() === "Admin";
}