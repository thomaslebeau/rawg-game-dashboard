import Link from "next/link";

interface GenreCardProps {
  id: number;
  name: string;
  gamesCount: number;
  emoji: string;
  gradient: string;
}

export function GenreCard({ id, name, gamesCount, emoji, gradient }: GenreCardProps) {
  return (
    <Link
      href={`/games?genre=${id}`}
      className={`group relative overflow-hidden rounded-2xl p-6 ${gradient} transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
    >
      <div className="relative z-10">
        <div className="text-5xl mb-3">{emoji}</div>
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:scale-105 transition-transform">
          {name}
        </h3>
        <p className="text-white/80 text-sm">
          {gamesCount.toLocaleString()}+ games
        </p>
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
    </Link>
  );
}
