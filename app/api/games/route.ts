import { NextRequest, NextResponse } from "next/server";
import { rawgApi } from "@/lib/api/rawg";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const params = {
      search: searchParams.get("search") || undefined,
      genres: searchParams.get("genres") || undefined,
      platforms: searchParams.get("platforms") || undefined,
      page: searchParams.get("page") ? Number(searchParams.get("page")) : undefined,
      page_size: searchParams.get("page_size") ? Number(searchParams.get("page_size")) : undefined,
      ordering: searchParams.get("ordering") || undefined,
      dates: searchParams.get("dates") || undefined,
    };

    // Remove undefined values
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== undefined)
    );

    const data = await rawgApi.getGames(cleanParams);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching games:", error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}
