import { render, screen } from "@testing-library/react";
import BookmarkGrid from "@/components/BookmarkGrid";
import { Bookmark } from "@/lib/bookmarks";

const makeBookmark = (overrides: Partial<Bookmark>): Bookmark => ({
  id: 1,
  name: "Test",
  url: "https://test.com",
  favicon_url: null,
  is_favorite: false,
  created_at: "2026-01-01T00:00:00Z",
  ...overrides,
});

describe("BookmarkGrid", () => {
  it("renders favorites in a separate section from regular bookmarks", () => {
    const bookmarks = [
      makeBookmark({ id: 1, name: "Favorite Site", is_favorite: true }),
      makeBookmark({ id: 2, name: "Regular Site", is_favorite: false }),
    ];

    render(<BookmarkGrid bookmarks={bookmarks} onToggleFavorite={jest.fn()} onDelete={jest.fn()} />);

    expect(screen.getByText("Favorites")).toBeInTheDocument();
    expect(screen.getByText("All Bookmarks")).toBeInTheDocument();
    expect(screen.getByText("Favorite Site")).toBeInTheDocument();
    expect(screen.getByText("Regular Site")).toBeInTheDocument();
  });

  it("does not render a favorites section when nothing is favorited", () => {
    const bookmarks = [makeBookmark({ id: 1, name: "Regular Only", is_favorite: false })];

    render(<BookmarkGrid bookmarks={bookmarks} onToggleFavorite={jest.fn()} onDelete={jest.fn()} />);

    expect(screen.queryByText("Favorites")).not.toBeInTheDocument();
    expect(screen.getByText("Regular Only")).toBeInTheDocument();
  });
});
