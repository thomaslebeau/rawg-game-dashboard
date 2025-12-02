// RAWG API Response Types

export interface Platform {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  year_end: number | null;
  year_start: number | null;
  games_count: number;
  image_background: string;
}

export interface PlatformDetail {
  platform: Platform;
  released_at: string;
  requirements?: {
    minimum?: string;
    recommended?: string;
  };
}

export interface Store {
  id: number;
  name: string;
  slug: string;
  domain: string;
  games_count: number;
  image_background: string;
}

export interface StoreDetail {
  id: number;
  url: string;
  store: Store;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}

export interface Publisher {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface Developer {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface EsrbRating {
  id: number;
  name: string;
  slug: string;
}

export interface Screenshot {
  id: number;
  image: string;
  width: number;
  height: number;
  is_deleted: boolean;
}

export interface Clip {
  clip: string;
  clips: {
    320: string;
    640: string;
    full: string;
  };
  video: string;
  preview: string;
}

export interface Ratings {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export interface AddedByStatus {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}

export interface ParentPlatform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Game {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  description: string;
  metacritic: number | null;
  metacritic_platforms: Array<{
    metascore: number;
    url: string;
    platform: {
      platform: number;
      name: string;
      slug: string;
    };
  }>;
  released: string;
  tba: boolean;
  updated: string;
  background_image: string;
  background_image_additional: string;
  website: string;
  rating: number;
  rating_top: number;
  ratings: Ratings[];
  reactions: Record<string, number>;
  added: number;
  added_by_status: AddedByStatus;
  playtime: number;
  screenshots_count: number;
  movies_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: number;
  reddit_url: string;
  reddit_name: string;
  reddit_description: string;
  reddit_logo: string;
  reddit_count: number;
  twitch_count: number;
  youtube_count: number;
  reviews_text_count: number;
  ratings_count: number;
  suggestions_count: number;
  alternative_names: string[];
  metacritic_url: string;
  parents_count: number;
  additions_count: number;
  game_series_count: number;
  user_game: null;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  parent_platforms: ParentPlatform[];
  platforms: PlatformDetail[];
  stores: StoreDetail[];
  developers: Developer[];
  genres: Genre[];
  tags: Tag[];
  publishers: Publisher[];
  esrb_rating: EsrbRating | null;
  clip: Clip | null;
  description_raw: string;
}

export interface GameListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  seo_h1: string;
  noindex: boolean;
  nofollow: boolean;
  description: string;
  filters: {
    years: Array<{
      from: number;
      to: number;
      filter: string;
      decade: number;
      years: Array<{
        year: number;
        count: number;
        nofollow: boolean;
      }>;
      nofollow: boolean;
      count: number;
    }>;
  };
  nofollow_collections: string[];
}

export interface GameDetailResponse extends Game {
  description_raw: string;
  parent_platforms: ParentPlatform[];
  platforms: PlatformDetail[];
}

export interface ScreenshotsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Screenshot[];
}

export interface GenresResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Genre[];
}

export interface PlatformsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Platform[];
}
