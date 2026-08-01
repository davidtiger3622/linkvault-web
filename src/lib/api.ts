const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = window.localStorage.getItem("refresh_token");
  if (!refreshToken) return null;

  const response = await fetch(`${API_URL}/auth/refresh?refresh_token=${encodeURIComponent(refreshToken)}`, { method: "POST" });
  if (!response.ok) return null;

  const data = await response.json();
  window.localStorage.setItem("access_token", data.access_token);
  window.localStorage.setItem("refresh_token", data.refresh_token);
  return data.access_token;
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? window.localStorage.getItem("access_token") : null;

  const buildHeaders = (authToken: string | null): HeadersInit => ({
    "Content-Type": "application/json",
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...options.headers,
  });

  let response = await fetch(`${API_URL}${path}`, { ...options, headers: buildHeaders(token) });

  if (response.status === 401 && typeof window !== "undefined") {
    const newToken = await refreshAccessToken();
    if (newToken) {
      response = await fetch(`${API_URL}${path}`, { ...options, headers: buildHeaders(newToken) });
    } else {
      window.localStorage.removeItem("access_token");
      window.localStorage.removeItem("refresh_token");
      window.location.href = "/login";
      throw new Error("Session expired");
    }
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(errorBody.detail || "Request failed");
  }

  if (response.status === 204) return null;
  return response.json();
}
