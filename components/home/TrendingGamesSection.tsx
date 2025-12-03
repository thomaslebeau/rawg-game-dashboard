import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Game } from "@/lib/types";

interface TrendingGamesSectionProps {
  games: Game[];
}

export function TrendingGamesSection({ games }: TrendingGamesSectionProps) {
  if (!games || games.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
          <span>🔥</span>
          <span>Trending Now</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <Link
              key={game.id}
              href={`/games/${game.slug}`}
              className="group relative bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              <div className="relative aspect-[3/4] bg-gray-700">
                {game.background_image ? (
                  <>
                    <Image
                      src={game.background_image}
                      alt={game.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No Image
                  </div>
                )}

                {game.rating && (
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-white font-semibold text-sm">{game.rating}</span>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                    {game.name}
                  </h3>

                  {game.platforms && game.platforms.length > 0 && (
                    <div className="flex flex-wrap gap-1 text-xs text-gray-300">
                      {game.platforms.slice(0, 3).map((p) => (
                        <span key={p.platform.id} className="bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded">
                          {p.platform.name}
                        </span>
                      ))}
                      {game.platforms.length > 3 && (
                        <span className="bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded">
                          +{game.platforms.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
