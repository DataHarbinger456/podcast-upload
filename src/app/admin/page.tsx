import { listDriveFiles } from "@/lib/google-drive";

interface DriveFile {
  id: string;
  name: string;
  webViewLink?: string;
  webContentLink?: string;
  createdTime: string;
  mimeType: string;
}

interface SubmissionMetadata {
  episodeNumber: string;
  editingNotes: string;
  audioUrl: string | null;
  videoUrl: string | null;
  uploadedAt: string;
}

async function getSubmissions(): Promise<SubmissionMetadata[]> {
  try {
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

    if (!refreshToken) {
      return [];
    }

    const files = await listDriveFiles("", refreshToken);

    const metadataFiles = files.filter((file) =>
      file.name?.includes("metadata.json")
    );

    const submissions: SubmissionMetadata[] = [];

    for (const file of metadataFiles) {
      const response = await fetch(file.webContentLink || file.webViewLink!);
      const metadata = await response.json();
      submissions.push(metadata);
    }

    return submissions.sort((a, b) =>
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return [];
  }
}

export default async function AdminPage() {
  const submissions = await getSubmissions();

  return (
    <div className="min-h-screen bg-background p-ds-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-surface rounded-ds shadow-md p-ds-6">
          <h1 className="text-3xl font-heading font-bold text-primary mb-ds-2">
            Episode Submissions
          </h1>
          <p className="text-text-secondary mb-ds-6">
            All uploaded podcast episodes ({submissions.length} total)
          </p>

          {submissions.length === 0 ? (
            <div className="text-center py-ds-8 text-text-secondary">
              No episodes uploaded yet
            </div>
          ) : (
            <div className="space-y-ds-4">
              {submissions.map((submission, index) => (
                <div
                  key={index}
                  className="border border-border rounded-ds p-ds-4 bg-background hover:shadow-md transition-normal"
                >
                  <div className="flex justify-between items-start mb-ds-3">
                    <h2 className="text-xl font-heading font-semibold text-text-primary">
                      Episode {submission.episodeNumber}
                    </h2>
                    <span className="text-sm text-text-secondary">
                      {new Date(submission.uploadedAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-ds-3 mb-ds-3">
                    {submission.audioUrl && (
                      <div>
                        <p className="text-sm font-medium text-text-secondary mb-ds-1">Audio File</p>
                        <a
                          href={submission.audioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm break-all"
                        >
                          Download Audio →
                        </a>
                      </div>
                    )}
                    {submission.videoUrl && (
                      <div>
                        <p className="text-sm font-medium text-text-secondary mb-ds-1">Video File</p>
                        <a
                          href={submission.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm break-all"
                        >
                          Download Video →
                        </a>
                      </div>
                    )}
                  </div>

                  {submission.editingNotes && (
                    <div>
                      <p className="text-sm font-medium text-text-secondary mb-ds-1">
                        Editing Notes
                      </p>
                      <p className="text-text-primary whitespace-pre-wrap bg-surface p-ds-3 rounded-ds border border-border">
                        {submission.editingNotes}
                      </p>
                    </div>
                  )}

                  <div className="mt-ds-4 pt-ds-3 border-t border-border">
                    <p className="text-sm text-text-secondary">
                      Files stored in Google Drive: <code className="text-primary">Podcast Episodes/Episode {submission.episodeNumber}/</code>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}