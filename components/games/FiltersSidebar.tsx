"use client";

import { Genre, Platform } from "@/lib/types";
import { X } from "lucide-react";

interface FiltersSidebarProps {
  genres: Genre[];
  platforms: Platform[];
  selectedGenre: string;
  selectedPlatform: string;
  selectedYear: string;
  onGenreChange: (genre: string) => void;
  onPlatformChange: (platform: string) => void;
  onYearChange: (year: string) => void;
  onClearFilters: () => void;
}

export function FiltersSidebar({
  genres,
  platforms,
  selectedGenre,
  selectedPlatform,
  selectedYear,
  onGenreChange,
  onPlatformChange,
  onYearChange,
  onClearFilters,
}: FiltersSidebarProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const hasActiveFilters = selectedGenre || selectedPlatform || selectedYear;

  return (
    <aside className="w-full lg:w-64 space-y-6">
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>

        {/* Genre Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Genre
          </label>
          <select
            value={selectedGenre}
            onChange={(e) => onGenreChange(e.target.value)}
            className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id.toString()}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        {/* Platform Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Platform
          </label>
          <select
            value={selectedPlatform}
            onChange={(e) => onPlatformChange(e.target.value)}
            className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="">All Platforms</option>
            {platforms.map((platform) => (
              <option key={platform.id} value={platform.id.toString()}>
                {platform.name}
              </option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Release Year
          </label>
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-2">
            Active Filters
          </h3>
          <div className="space-y-1">
            {selectedGenre && (
              <div className="text-sm text-gray-400">
                Genre: {genres.find((g) => g.id.toString() === selectedGenre)?.name}
              </div>
            )}
            {selectedPlatform && (
              <div className="text-sm text-gray-400">
                Platform: {platforms.find((p) => p.id.toString() === selectedPlatform)?.name}
              </div>
            )}
            {selectedYear && (
              <div className="text-sm text-gray-400">Year: {selectedYear}</div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
