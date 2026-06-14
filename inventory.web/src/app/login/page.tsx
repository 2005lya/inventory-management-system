"use client";

import { useState } from "react";
import { login } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    try {
      const result = await login(email, password);

      localStorage.setItem("token", result.token);

      window.location.href = "/dashboard";
    } catch {
      setError("Invalid email or password");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded bg-white p-6 shadow"
      >
        <h1 className="mb-6 text-2xl font-bold">Inventory Login</h1>

        {error && (
          <p className="mb-4 rounded bg-red-100 p-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <label className="mb-2 block text-sm font-medium">Email</label>
        <input
          className="mb-4 w-full rounded border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="mb-2 block text-sm font-medium">Password</label>
        <input
          className="mb-6 w-full rounded border p-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full rounded bg-black px-4 py-2 text-white">
          Login
        </button>
      </form>
    </main>
  );
}