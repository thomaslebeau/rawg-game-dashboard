"use client";

import { Search } from "lucide-react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export function HeroSearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/games?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search games..."
          className="w-full pl-14 pr-6 py-5 bg-white/10 backdrop-blur-md text-white text-lg rounded-2xl border border-white/20 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/30 transition-all placeholder:text-gray-400"
        />
      </div>
    </form>
  );
}
