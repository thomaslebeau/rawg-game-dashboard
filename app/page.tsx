import Link from "next/link";
import { rawgApi } from "@/lib/api/rawg";
import { HeroSearchBar } from "@/components/home/HeroSearchBar";
import { TrendingGamesSection } from "@/components/home/TrendingGamesSection";
import { NewReleasesSection } from "@/components/home/NewReleasesSection";
import { GenreCard } from "@/components/home/GenreCard";
import { Gamepad2, TrendingUp, Clock } from "lucide-react";

// Helper function to get date range for last 30 days
function getLast30DaysRange() {
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  return `${formatDate(thirtyDaysAgo)},${formatDate(today)}`;
}

// Define genres with emojis and gradients
const featuredGenres = [
  {
    id: 4,
    name: "Action",
    slug: "action",
    emoji: "⚔️",
    gradient: "bg-gradient-to-br from-red-600 to-orange-600",
  },
  {
    id: 5,
    name: "RPG",
    slug: "role-playing-games-rpg",
    emoji: "🎭",
    gradient: "bg-gradient-to-br from-purple-600 to-pink-600",
  },
  {
    id: 10,
    name: "Strategy",
    slug: "strategy",
    emoji: "🧠",
    gradient: "bg-gradient-to-br from-blue-600 to-cyan-600",
  },
  {
    id: 3,
    name: "Adventure",
    slug: "adventure",
    emoji: "🗺️",
    gradient: "bg-gradient-to-br from-green-600 to-emerald-600",
  },
  {
    id: 51,
    name: "Indie",
    slug: "indie",
    emoji: "💎",
    gradient: "bg-gradient-to-br from-yellow-600 to-orange-600",
  },
  {
    id: 2,
    name: "Shooter",
    slug: "shooter",
    emoji: "🎯",
    gradient: "bg-gradient-to-br from-rose-600 to-red-600",
  },
];

export default async function Home() {
  // Fetch data in parallel with error handling
  let trendingGames;
  let newReleasesData;
  let genresData;

  try {
    [trendingGames, newReleasesData, genresData] = await Promise.all([
      rawgApi.getGames({
        ordering: "-added",
        page_size: 8,
      }),
      rawgApi.getGames({
        dates: getLast30DaysRange(),
        ordering: "-released",
        page_size: 6,
      }),
      rawgApi.getGenres(),
    ]);
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    // Return empty data if API fails
    trendingGames = { results: [] };
    newReleasesData = { results: [] };
    genresData = { results: [] };
  }

  // Map genre IDs to game counts from API
  const genreMap = new Map(genresData.results.map(g => [g.id, g.games_count]));
  const genresWithCounts = featuredGenres.map(genre => ({
    ...genre,
    gamesCount: genreMap.get(genre.id) || 0,
  }));

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-slate-900 to-blue-900 pt-20 pb-32 px-4">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Discover Your Next
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text">
              Favorite Game
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Browse 500,000+ games with detailed info, ratings, and reviews
          </p>

          <div className="flex flex-col items-center gap-6">
            <HeroSearchBar />

            <Link
              href="/games"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <Gamepad2 className="w-5 h-5" />
              Browse All Games
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats Banner */}
      <section className="py-12 px-4 bg-slate-900/50 border-y border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-purple-900/30 to-transparent rounded-xl border border-purple-500/20">
              <div className="p-4 bg-purple-600/20 rounded-full">
                <Gamepad2 className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">500,000+</div>
                <div className="text-gray-400">Games</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-pink-900/30 to-transparent rounded-xl border border-pink-500/20">
              <div className="p-4 bg-pink-600/20 rounded-full">
                <TrendingUp className="w-8 h-8 text-pink-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-gray-400">Platforms</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-cyan-900/30 to-transparent rounded-xl border border-cyan-500/20">
              <div className="p-4 bg-cyan-600/20 rounded-full">
                <Clock className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">Daily</div>
                <div className="text-gray-400">Updates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Games Section */}
      <TrendingGamesSection games={trendingGames.results} />

      {/* New Releases Section */}
      <NewReleasesSection games={newReleasesData.results} />

      {/* Browse by Genre Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            Browse by Genre
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {genresWithCounts.map((genre) => (
              <GenreCard
                key={genre.id}
                id={genre.id}
                name={genre.name}
                gamesCount={genre.gamesCount}
                emoji={genre.emoji}
                gradient={genre.gradient}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/games"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold text-lg transition-colors"
            >
              View All Genres
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
