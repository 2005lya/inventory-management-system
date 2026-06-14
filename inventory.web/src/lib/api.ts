const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/api/Auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  return response.json() as Promise<{
    token: string;
  }>;
}