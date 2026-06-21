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
    accessToken: string;
  refreshToken: string;
  }>;
}

export async function refreshToken() {
  const token = localStorage.getItem("refreshToken");

  if (!token) {
    return null;
  }

  const response = await fetch(
    `${API_BASE_URL}/api/Auth/refresh-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: token,
      }),
    }
  );

  if (!response.ok) {
    return null;
  }

    return response.json() as Promise<{
    accessToken: string;
    refreshToken: string;
  }>;
}

export async function apiFetch(
  url: string,
  options: RequestInit = {}
) {
  let accessToken =
    localStorage.getItem("accessToken");

  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    const refreshResult =
      await refreshToken();

    if (!refreshResult) {
      localStorage.clear();
      window.location.href = "/login";
      throw new Error("Session expired");
    }

    localStorage.setItem(
      "accessToken",
      refreshResult.accessToken
    );

    localStorage.setItem(
      "refreshToken",
      refreshResult.refreshToken
    );

    response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization:
          `Bearer ${refreshResult.accessToken}`,
      },
    });
  }

  return response;
}