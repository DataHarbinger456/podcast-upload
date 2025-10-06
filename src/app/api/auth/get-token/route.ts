import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const refreshToken = request.cookies.get("google_refresh_token")?.value;
  const accessToken = request.cookies.get("google_access_token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "No refresh token found. Please authorize Google Drive first." },
      { status: 401 }
    );
  }

  return NextResponse.json({
    refreshToken,
    accessToken,
    instructions: "Copy the refreshToken value below and add it to your .env.local file as GOOGLE_REFRESH_TOKEN",
  });
}
