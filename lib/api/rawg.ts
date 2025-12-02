import {
  GameListResponse,
  GameDetailResponse,
  ScreenshotsResponse,
  GenresResponse,
  PlatformsResponse,
} from "@/lib/types";

const API_BASE_URL = "https://api.rawg.io/api";
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

if (!API_KEY) {
  console.warn("RAWG API key is not set. Please add NEXT_PUBLIC_RAWG_API_KEY to your .env.local file");
}

interface FetchOptions {
  params?: Record<string, string | number | boolean>;
}

async function fetchFromRAWG<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params = {} } = options;

  const searchParams = new URLSearchParams({
    key: API_KEY || "",
    ...Object.entries(params).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: String(value),
    }), {}),
  });

  const url = `${API_BASE_URL}${endpoint}?${searchParams.toString()}`;

  const response = await fetch(url, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`RAWG API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const rawgApi = {
  // Get list of games with optional filters
  getGames: (params?: {
    page?: number;
    page_size?: number;
    search?: string;
    genres?: string;
    platforms?: string;
    ordering?: string;
    dates?: string;
  }) => {
    return fetchFromRAWG<GameListResponse>("/games", { params });
  },

  // Get game by ID
  getGameById: (id: number) => {
    return fetchFromRAWG<GameDetailResponse>(`/games/${id}`);
  },

  // Get game details by ID or slug
  getGameDetails: (id: string | number) => {
    return fetchFromRAWG<GameDetailResponse>(`/games/${id}`);
  },

  // Get trending games (ordered by popularity in the last 30 days)
  getTrendingGames: () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const today = new Date();

    const dateRange = `${thirtyDaysAgo.toISOString().split('T')[0]},${today.toISOString().split('T')[0]}`;

    return fetchFromRAWG<GameListResponse>("/games", {
      params: {
        dates: dateRange,
        ordering: "-added",
        page_size: 20,
      },
    });
  },

  // Get game screenshots
  getGameScreenshots: (id: string | number) => {
    return fetchFromRAWG<ScreenshotsResponse>(`/games/${id}/screenshots`);
  },

  // Get list of genres
  getGenres: () => {
    return fetchFromRAWG<GenresResponse>("/genres");
  },

  // Get list of platforms
  getPlatforms: () => {
    return fetchFromRAWG<PlatformsResponse>("/platforms");
  },
};
