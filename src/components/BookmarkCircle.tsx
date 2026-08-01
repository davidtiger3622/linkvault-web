"use client";

import { useState } from "react";
import { Bookmark } from "@/lib/bookmarks";

interface BookmarkCircleProps {
  bookmark: Bookmark;
  onToggleFavorite: (bookmark: Bookmark) => void;
  onDelete: (id: number) => void;
}

export default function BookmarkCircle({ bookmark, onToggleFavorite, onDelete }: BookmarkCircleProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="flex flex-col items-center gap-1 w-20" onMouseEnter={() => setShowActions(true)} onMouseLeave={() => setShowActions(false)}>
      <div className="relative">
        <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center overflow-hidden bg-white hover:opacity-80 transition-opacity">
          {bookmark.favicon_url ? (
            <img src={bookmark.favicon_url} alt="" className="w-8 h-8" />
          ) : (
            <span className="text-lg font-semibold text-gray-500">{bookmark.name[0]?.toUpperCase()}</span>
          )}
        </a>

        {showActions && (
          <div className="absolute -top-1 -right-1 flex gap-1">
            <button onClick={() => onToggleFavorite(bookmark)} aria-label={bookmark.is_favorite ? "Unfavorite" : "Favorite"} className="w-5 h-5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-xs">
              {bookmark.is_favorite ? "❤️" : "🤍"}
            </button>
            <button onClick={() => onDelete(bookmark.id)} aria-label="Delete bookmark" className="w-5 h-5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-xs">
              ✕
            </button>
          </div>
        )}
      </div>
      <span className="text-xs text-center truncate w-full">{bookmark.name}</span>
    </div>
  );
}
