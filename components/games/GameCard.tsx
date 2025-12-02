import Image from "next/image";
import Link from "next/link";
import { Game } from "@/lib/types";
import { Star } from "lucide-react";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link
      href={`/games/${game.slug}`}
      className="group block bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all duration-200"
    >
      <div className="relative aspect-[16/9] bg-gray-700">
        {game.background_image ? (
          <Image
            src={game.background_image}
            alt={game.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No Image
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
          {game.name}
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-1">
            {game.rating && (
              <>
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="text-white font-medium">{game.rating}</span>
              </>
            )}
          </div>

          {game.released && (
            <span>{new Date(game.released).getFullYear()}</span>
          )}
        </div>

        {game.genres && game.genres.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {game.genres.slice(0, 3).map((genre) => (
              <span
                key={genre.id}
                className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}

        {game.platforms && game.platforms.length > 0 && (
          <div className="mt-2 flex gap-1 text-xs text-gray-500">
            {game.platforms.slice(0, 3).map((p, idx) => (
              <span key={p.platform.id}>
                {p.platform.name}
                {idx < Math.min(game.platforms.length, 3) - 1 && ","}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
