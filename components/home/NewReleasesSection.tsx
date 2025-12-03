import { GameCard } from "@/components/games/GameCard";
import { Game } from "@/lib/types";

interface NewReleasesSectionProps {
  games: Game[];
}

export function NewReleasesSection({ games }: NewReleasesSectionProps) {
  if (!games || games.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
          <span>🎮</span>
          <span>Recent Releases</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
}
