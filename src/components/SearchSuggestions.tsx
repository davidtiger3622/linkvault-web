"use client";

import { Bookmark } from "@/lib/bookmarks";

interface SearchSuggestionsProps {
  bookmarks: Bookmark[];
  search: string;
  onSelect: () => void;
}

export default function SearchSuggestions({ bookmarks, search, onSelect }: SearchSuggestionsProps) {
  if (!search) return null;

  const matches = bookmarks
    .filter((b) => b.name.toLowerCase().includes(search.toLowerCase()) || b.url.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  if (matches.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg z-40 px-4 py-3 text-sm text-gray-500">
        No matching bookmarks
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg z-40 max-h-64 overflow-y-auto">
      {matches.map((bookmark) => (
        <a key={bookmark.id} href={bookmark.url} target="_blank" rel="noopener noreferrer" onClick={onSelect} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          {bookmark.favicon_url ? (
            <img src={bookmark.favicon_url} alt="" className="w-5 h-5 shrink-0" />
          ) : (
            <span className="w-5 h-5 shrink-0 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs">{bookmark.name[0]?.toUpperCase()}</span>
          )}
          <span className="text-sm truncate">{bookmark.name}</span>
        </a>
      ))}
    </div>
  );
}
