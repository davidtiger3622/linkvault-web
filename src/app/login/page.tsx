"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Log in to LinkVault</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? "Logging in..." : "Log In"}
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
