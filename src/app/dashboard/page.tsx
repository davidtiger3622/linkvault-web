"use client";

import { useEffect, useState, useCallback } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import NavBar from "@/components/NavBar";
import { listBookmarks, Bookmark } from "@/lib/bookmarks";

export default function DashboardPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"date" | "alphabetical">("date");
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listBookmarks(search, sort);
      setBookmarks(data);
    } finally {
      setLoading(false);
    }
  }, [search, sort]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <NavBar
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
          onAddClick={() => alert("Add modal coming in the next batch")}
        />
        <main className="flex-1 p-6">
          {loading ? (
            <p className="text-gray-500">Loading bookmarks...</p>
          ) : bookmarks.length === 0 ? (
            <p className="text-gray-500">No bookmarks yet — click the + to add one.</p>
          ) : (
            <p className="text-gray-500">{bookmarks.length} bookmark(s) loaded (grid UI coming next batch)</p>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
