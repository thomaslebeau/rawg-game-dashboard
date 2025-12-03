import { Game } from "@/lib/types";
import { GameCard } from "./GameCard";

interface GameGridProps {
  games: Game[];
}

export function GameGrid({ games }: GameGridProps) {
  if (games.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-400">
        <p className="text-xl">No games found</p>
        <p className="text-sm mt-2">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
