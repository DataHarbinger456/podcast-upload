import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { findOrCreateEpisodeFolder } from "@/lib/google-drive";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export async function POST(request: NextRequest) {
  try {
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Server not configured" },
        { status: 500 }
      );
    }

    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    const body = await request.json();

    if (body.episodeNumber) {
      const folderId = await findOrCreateEpisodeFolder(
        body.episodeNumber,
        "",
        refreshToken
      );
      return NextResponse.json({ folderId });
    }

    const { fileName, mimeType, folderId } = body;

    const drive = google.drive({ version: "v3", auth: oauth2Client });

    const res = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId],
        mimeType: mimeType,
      },
      fields: "id",
    });

    const fileId = res.data.id;

    const uploadUrl = `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`;

    const { credentials } = await oauth2Client.refreshAccessToken();
    const accessToken = credentials.access_token;

    return NextResponse.json({
      uploadUrl,
      fileId,
      accessToken,
    });
  } catch (error) {
    console.error("Error creating upload URL:", error);
    return NextResponse.json(
      { error: "Failed to create upload URL" },
      { status: 500 }
    );
  }
}
