"use client";

import ThemeToggle from "@/components/ThemeToggle";

interface NavBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  sort: "date" | "alphabetical";
  onSortChange: (value: "date" | "alphabetical") => void;
  onAddClick: () => void;
}

export default function NavBar({ search, onSearchChange, sort, onSortChange, onAddClick }: NavBarProps) {
  return (
    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 dark:border-gray-800">
      <button
        onClick={onAddClick}
        aria-label="Add bookmark"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:opacity-90 transition-opacity shrink-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 4.5a.75.75 0 01.75.75v6h6a.75.75 0 010 1.5h-6v6a.75.75 0 01-1.5 0v-6h-6a.75.75 0 010-1.5h6v-6A.75.75 0 0112 4.5z" />
        </svg>
      </button>

      <input
        type="text"
        placeholder="Search your bookmarks by name/link"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
      />

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as "date" | "alphabetical")}
        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
      >
        <option value="date">Date added</option>
        <option value="alphabetical">Alphabetical</option>
      </select>

      <ThemeToggle />
    </div>
  );
}
