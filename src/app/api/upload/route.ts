import { NextRequest, NextResponse } from "next/server";
import { findOrCreateEpisodeFolder, uploadFileToDrive } from "@/lib/google-drive";

export async function POST(request: NextRequest) {
  try {
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Server not configured. Missing GOOGLE_REFRESH_TOKEN." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { episodeNumber, editingNotes, audioFileId, videoFileId } = body;

    if (!episodeNumber) {
      return NextResponse.json(
        { error: "Episode number is required" },
        { status: 400 }
      );
    }

    const episodeFolderId = await findOrCreateEpisodeFolder(
      episodeNumber,
      "",
      refreshToken
    );

    let audioUrl = null;
    let videoUrl = null;

    if (audioFileId) {
      audioUrl = `https://drive.google.com/file/d/${audioFileId}/view`;
    }

    if (videoFileId) {
      videoUrl = `https://drive.google.com/file/d/${videoFileId}/view`;
    }

    const metadata = {
      episodeNumber,
      editingNotes,
      audioUrl,
      videoUrl,
      uploadedAt: new Date().toISOString(),
    };

    const metadataBlob = new Blob([JSON.stringify(metadata, null, 2)], {
      type: "application/json",
    });
    const metadataFile = new File(
      [metadataBlob],
      "metadata.json",
      { type: "application/json" }
    );

    await uploadFileToDrive(
      metadataFile,
      "metadata.json",
      "",
      refreshToken,
      episodeFolderId
    );

    return NextResponse.json({
      success: true,
      message: "Files uploaded successfully to Google Drive",
      episodeNumber,
      audioUrl,
      videoUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}