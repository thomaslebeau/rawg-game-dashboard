"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Game, Genre, Platform } from "@/lib/types";
import { GameGrid } from "./GameGrid";
import { SearchBar } from "./SearchBar";
import { FiltersSidebar } from "./FiltersSidebar";
import { Pagination } from "./Pagination";

interface GamesClientProps {
  games: Game[];
  totalCount: number;
  genres: Genre[];
  platforms: Platform[];
  currentPage: number;
}

const GAMES_PER_PAGE = 20;

export function GamesClient({
  games,
  totalCount,
  genres,
  platforms,
  currentPage,
}: GamesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalCount / GAMES_PER_PAGE);

  // Get current filter values from URL
  const selectedGenre = searchParams.get("genre") || "";
  const selectedPlatform = searchParams.get("platform") || "";
  const selectedYear = searchParams.get("year") || "";
  const searchQuery = searchParams.get("search") || "";

  // Update URL with new search params
  const updateURL = useCallback(
    (params: Record<string, string>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      // Update or remove params
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newSearchParams.set(key, value);
        } else {
          newSearchParams.delete(key);
        }
      });

      // Reset to page 1 when filters change (except when changing page)
      if (!params.page && newSearchParams.has("page")) {
        newSearchParams.set("page", "1");
      }

      router.push(`/games?${newSearchParams.toString()}`);
    },
    [router, searchParams]
  );

  // Handle search
  const handleSearch = useCallback(
    (query: string) => {
      updateURL({ search: query });
    },
    [updateURL]
  );

  // Handle genre change
  const handleGenreChange = useCallback(
    (genre: string) => {
      updateURL({ genre });
    },
    [updateURL]
  );

  // Handle platform change
  const handlePlatformChange = useCallback(
    (platform: string) => {
      updateURL({ platform });
    },
    [updateURL]
  );

  // Handle year change
  const handleYearChange = useCallback(
    (year: string) => {
      updateURL({ year });
    },
    [updateURL]
  );

  // Handle clear filters
  const handleClearFilters = useCallback(() => {
    router.push("/games");
  }, [router]);

  // Handle page change
  const handlePageChange = useCallback(
    (page: number) => {
      updateURL({ page: page.toString() });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [updateURL]
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Browse Games</h1>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} defaultValue={searchQuery} />
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <FiltersSidebar
            genres={genres}
            platforms={platforms}
            selectedGenre={selectedGenre}
            selectedPlatform={selectedPlatform}
            selectedYear={selectedYear}
            onGenreChange={handleGenreChange}
            onPlatformChange={handlePlatformChange}
            onYearChange={handleYearChange}
            onClearFilters={handleClearFilters}
          />

          {/* Games Grid */}
          <div className="flex-1">
            <div className="mb-4 text-gray-400">
              Found {totalCount.toLocaleString()} games
            </div>
            <GameGrid games={games} />
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
