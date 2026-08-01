import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 py-4">
        <span className="text-xl font-semibold">LinkVault</span>
        <ThemeToggle />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Your bookmarks, everywhere.</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          Save, search, organize your links in one place and access them from any device.
        </p>
        <div className="flex gap-4">
          <Link
            href="/register"
            className="px-6 py-3 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-medium hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            Log In
          </Link>
        </div>
      </main>
    </div>
  );
}
