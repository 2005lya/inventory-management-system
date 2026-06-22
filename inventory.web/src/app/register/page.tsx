"use client";

import { useState } from "react";
import { register } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await register(email, password);
      router.replace("/login");
    } catch {
      setError("Registration failed. Email may already exist.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded bg-white p-6 shadow"
      >
        <h1 className="mb-6 text-2xl font-bold">Create Account</h1>

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
          className="mb-4 w-full rounded border p-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="mb-2 block text-sm font-medium">
          Confirm Password
        </label>
        <input
          className="mb-6 w-full rounded border p-2"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="w-full rounded bg-black px-4 py-2 text-white">
          Register
        </button>

        <button
          type="button"
          onClick={() => router.push("/login")}
          className="mt-4 w-full text-sm text-gray-600 underline"
        >
          Already have an account? Login
        </button>
      </form>
    </main>
  );
}