"use client";

import { Bookmark } from "@/lib/bookmarks";
import BookmarkCircle from "@/components/BookmarkCircle";

interface BookmarkGridProps {
  bookmarks: Bookmark[];
  onToggleFavorite: (bookmark: Bookmark) => void;
  onDelete: (id: number) => void;
}

export default function BookmarkGrid({ bookmarks, onToggleFavorite, onDelete }: BookmarkGridProps) {
  const favorites = bookmarks.filter((b) => b.is_favorite);
  const rest = bookmarks.filter((b) => !b.is_favorite);

  return (
    <div className="flex flex-col gap-8">
      {favorites.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">Favorites</h2>
          <div className="flex flex-wrap gap-4">
            {favorites.map((bookmark) => (
              <BookmarkCircle
                key={bookmark.id}
                bookmark={bookmark}
                onToggleFavorite={onToggleFavorite}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        {favorites.length > 0 && (
          <h2 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">All Bookmarks</h2>
        )}
        <div className="flex flex-wrap gap-4">
          {rest.map((bookmark) => (
            <BookmarkCircle
              key={bookmark.id}
              bookmark={bookmark}
              onToggleFavorite={onToggleFavorite}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
