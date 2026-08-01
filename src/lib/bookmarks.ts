import { apiFetch } from "@/lib/api";

export interface Bookmark {
  id: number;
  name: string;
  url: string;
  favicon_url: string | null;
  is_favorite: boolean;
  created_at: string;
}

export function listBookmarks(search?: string, sort: "date" | "alphabetical" = "date") {
  const params = new URLSearchParams({ sort });
  if (search) params.set("search", search);
  return apiFetch(`/bookmarks?${params.toString()}`) as Promise<Bookmark[]>;
}

export function createBookmark(name: string, url: string) {
  return apiFetch("/bookmarks", {
    method: "POST",
    body: JSON.stringify({ name, url }),
  }) as Promise<Bookmark>;
}

export function updateBookmark(id: number, data: { name?: string; is_favorite?: boolean }) {
  return apiFetch(`/bookmarks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  }) as Promise<Bookmark>;
}

export function deleteBookmark(id: number) {
  return apiFetch(`/bookmarks/${id}`, { method: "DELETE" });
}
