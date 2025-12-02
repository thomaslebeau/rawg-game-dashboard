import { NextRequest, NextResponse } from "next/server";
import { rawgApi } from "@/lib/api/rawg";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const gameId = parseInt(params.id, 10);

    if (isNaN(gameId)) {
      return NextResponse.json(
        { error: "Invalid game ID" },
        { status: 400 }
      );
    }

    const data = await rawgApi.getGameById(gameId);

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching game ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch game details" },
      { status: 500 }
    );
  }
}
