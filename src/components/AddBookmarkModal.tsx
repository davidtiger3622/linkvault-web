"use client";

import { useState } from "react";

interface AddBookmarkModalProps {
  onClose: () => void;
  onSave: (name: string, url: string) => Promise<void>;
}

export default function AddBookmarkModal({ onClose, onSave }: AddBookmarkModalProps) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await onSave(name, url);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save bookmark");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Add Bookmark</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Bookmark name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
          />
          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-2 justify-end mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-medium disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
