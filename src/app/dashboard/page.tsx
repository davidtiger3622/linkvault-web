"use client";

import { useEffect, useState, useCallback } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import NavBar from "@/components/NavBar";
import BookmarkGrid from "@/components/BookmarkGrid";
import AddBookmarkModal from "@/components/AddBookmarkModal";
import { listBookmarks, createBookmark, updateBookmark, deleteBookmark, Bookmark } from "@/lib/bookmarks";

export default function DashboardPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [allBookmarks, setAllBookmarks] = useState<Bookmark[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"date" | "alphabetical">("date");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchBookmarks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listBookmarks(search, sort);
      setBookmarks(data);
      if (!search) setAllBookmarks(data);
    } finally {
      setLoading(false);
    }
  }, [search, sort]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  useEffect(() => {
    if (allBookmarks.length === 0) {
      listBookmarks("", sort).then(setAllBookmarks);
    }
  }, [allBookmarks.length, sort]);

  const handleSave = async (name: string, url: string) => {
    await createBookmark(name, url);
    await fetchBookmarks();
    setAllBookmarks([]);
  };

  const handleToggleFavorite = async (bookmark: Bookmark) => {
    await updateBookmark(bookmark.id, { is_favorite: !bookmark.is_favorite });
    await fetchBookmarks();
    setAllBookmarks([]);
  };

  const handleDelete = async (id: number) => {
    await deleteBookmark(id);
    await fetchBookmarks();
    setAllBookmarks([]);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <NavBar search={search} onSearchChange={setSearch} sort={sort} onSortChange={setSort} onAddClick={() => setModalOpen(true)} allBookmarks={allBookmarks} />
        <main className="flex-1 p-6">
          {loading ? (
            <p className="text-gray-500">Loading bookmarks...</p>
          ) : bookmarks.length === 0 ? (
            <p className="text-gray-500">No bookmarks yet — click the + to add one.</p>
          ) : (
            <BookmarkGrid bookmarks={bookmarks} onToggleFavorite={handleToggleFavorite} onDelete={handleDelete} />
          )}
        </main>

        {modalOpen && <AddBookmarkModal onClose={() => setModalOpen(false)} onSave={handleSave} />}
      </div>
    </ProtectedRoute>
  );
}
