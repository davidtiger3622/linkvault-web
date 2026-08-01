const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? window.localStorage.getItem("access_token") : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(errorBody.detail || "Request failed");
  }

  if (response.status === 204) return null;
  return response.json();
}
