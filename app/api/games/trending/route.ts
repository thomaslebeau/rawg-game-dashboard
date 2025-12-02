import { NextResponse } from "next/server";
import { rawgApi } from "@/lib/api/rawg";

export async function GET() {
  try {
    const data = await rawgApi.getTrendingGames();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching trending games:", error);
    return NextResponse.json(
      { error: "Failed to fetch trending games" },
      { status: 500 }
    );
  }
}
