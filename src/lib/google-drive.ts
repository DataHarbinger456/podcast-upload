import { google } from "googleapis";
import { Readable } from "stream";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export function getAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/drive.file"],
  });
}

export async function getTokenFromCode(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}

export async function uploadFileToDrive(
  file: File,
  fileName: string,
  accessToken: string,
  refreshToken?: string,
  folderId?: string
) {
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  const drive = google.drive({ version: "v3", auth: oauth2Client });

  const buffer = Buffer.from(await file.arrayBuffer());
  const stream = Readable.from(buffer);

  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [folderId || process.env.GOOGLE_DRIVE_FOLDER_ID!],
    },
    media: {
      mimeType: file.type,
      body: stream,
    },
    fields: "id,webViewLink,webContentLink",
    supportsAllDrives: true,
  });

  return response.data;
}

export async function findOrCreateEpisodeFolder(
  episodeNumber: string,
  accessToken: string,
  refreshToken?: string
) {
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  const drive = google.drive({ version: "v3", auth: oauth2Client });
  const folderName = `Episode ${episodeNumber}`;

  const searchResponse = await drive.files.list({
    q: `name='${folderName}' and '${process.env.GOOGLE_DRIVE_FOLDER_ID}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: "files(id, name)",
    pageSize: 1,
  });

  if (searchResponse.data.files && searchResponse.data.files.length > 0 && searchResponse.data.files[0]?.id) {
    return searchResponse.data.files[0].id;
  }

  const createResponse = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
    },
    fields: "id",
  });

  return createResponse.data.id!;
}

export async function listDriveFiles(accessToken: string, refreshToken?: string) {
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  const drive = google.drive({ version: "v3", auth: oauth2Client });

  const response = await drive.files.list({
    q: `'${process.env.GOOGLE_DRIVE_FOLDER_ID}' in parents and trashed=false`,
    fields: "files(id, name, webViewLink, webContentLink, createdTime, mimeType)",
    orderBy: "createdTime desc",
  });

  return response.data.files || [];
}
