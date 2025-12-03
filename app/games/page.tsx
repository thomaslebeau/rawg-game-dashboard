import { rawgApi } from "@/lib/api/rawg";
import { GamesClient } from "@/components/games/GamesClient";

interface GamesPageProps {
  searchParams: {
    search?: string;
    genre?: string;
    platform?: string;
    year?: string;
    page?: string;
  };
}

export default async function GamesPage({ searchParams }: GamesPageProps) {
  const page = parseInt(searchParams.page || "1");
  const pageSize = 20;

  // Build API params
  const params: Record<string, string | number> = {
    page,
    page_size: pageSize,
  };

  if (searchParams.search) {
    params.search = searchParams.search;
  }

  if (searchParams.genre) {
    params.genres = searchParams.genre;
  }

  if (searchParams.platform) {
    params.platforms = searchParams.platform;
  }

  if (searchParams.year) {
    params.dates = `${searchParams.year}-01-01,${searchParams.year}-12-31`;
  }

  // Fetch initial data on server
  const [gamesData, genresData, platformsData] = await Promise.all([
    rawgApi.getGames(params),
    rawgApi.getGenres(),
    rawgApi.getPlatforms(),
  ]);

  return (
    <GamesClient
      games={gamesData.results}
      totalCount={gamesData.count}
      genres={genresData.results}
      platforms={platformsData.results}
      currentPage={page}
    />
  );
}
