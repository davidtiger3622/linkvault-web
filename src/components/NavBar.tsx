"use client";

import { useState, useRef, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import SearchSuggestions from "@/components/SearchSuggestions";
import { Bookmark } from "@/lib/bookmarks";

interface NavBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  sort: "date" | "alphabetical";
  onSortChange: (value: "date" | "alphabetical") => void;
  onAddClick: () => void;
  allBookmarks: Bookmark[];
}

export default function NavBar({ search, onSearchChange, sort, onSortChange, onAddClick, allBookmarks }: NavBarProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 dark:border-gray-800">
      <button onClick={onAddClick} aria-label="Add bookmark" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:opacity-90 transition-opacity shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 4.5a.75.75 0 01.75.75v6h6a.75.75 0 010 1.5h-6v6a.75.75 0 01-1.5 0v-6h-6a.75.75 0 010-1.5h6v-6A.75.75 0 0112 4.5z" />
        </svg>
      </button>

      <div ref={containerRef} className="relative flex-1">
        <input type="text" placeholder="Search your bookmarks by name/link" value={search} onChange={(e) => onSearchChange(e.target.value)} onFocus={() => setShowSuggestions(true)} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent" />
        {showSuggestions && <SearchSuggestions bookmarks={allBookmarks} search={search} onSelect={() => setShowSuggestions(false)} />}
      </div>

      <select value={sort} onChange={(e) => onSortChange(e.target.value as "date" | "alphabetical")} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent">
        <option value="date">Date added</option>
        <option value="alphabetical">Alphabetical</option>
      </select>

      <ThemeToggle />
    </div>
  );
}
