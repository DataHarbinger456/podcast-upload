"use client";

import { useState } from "react";
import { StarBorder } from "@/components/ui/star-border";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Spinner } from "@/components/ui/spinner";

export default function UploadPage() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [episodeNumber, setEpisodeNumber] = useState("");
  const [editingNotes, setEditingNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadFileDirectly = async (file: File, folderId: string) => {
    const folderRes = await fetch("/api/get-upload-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: file.name,
        mimeType: file.type,
        folderId,
      }),
    });

    const { uploadUrl, fileId, accessToken } = await folderRes.json();

    return new Promise<string>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentComplete);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(fileId);
        } else {
          reject(new Error("Upload failed"));
        }
      });

      xhr.addEventListener("error", () => {
        reject(new Error("Upload failed"));
      });

      xhr.open("PATCH", uploadUrl);
      xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);
      xhr.setRequestHeader("Content-Type", file.type);
      xhr.send(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!episodeNumber) {
      alert("Please enter an episode number");
      return;
    }

    if (!audioFile && !videoFile) {
      alert("Please upload at least one file (audio or video)");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setUploadProgress(0);

    try {
      const folderRes = await fetch("/api/get-upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ episodeNumber }),
      });

      const { folderId } = await folderRes.json();

      let audioFileId = null;
      let videoFileId = null;

      if (audioFile) {
        audioFileId = await uploadFileDirectly(audioFile, folderId);
      }

      if (videoFile) {
        videoFileId = await uploadFileDirectly(videoFile, folderId);
      }

      await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          episodeNumber,
          editingNotes,
          audioFileId,
          videoFileId,
        }),
      });

      setSubmitStatus("success");

      const uploadedFiles = [];
      if (audioFile) uploadedFiles.push(`Audio: ${audioFile.name}`);
      if (videoFile) uploadedFiles.push(`Video: ${videoFile.name}`);

      alert(`✅ Upload Complete!\n\nEpisode ${episodeNumber} uploaded successfully:\n${uploadedFiles.join("\n")}\n\nFiles are now in your Google Drive!`);

      setTimeout(() => {
        setAudioFile(null);
        setVideoFile(null);
        setEpisodeNumber("");
        setEditingNotes("");
        setUploadProgress(0);
        setSubmitStatus("idle");
        const form = e.target as HTMLFormElement;
        form.reset();
      }, 1000);
    } catch (error) {
      console.error("Upload error:", error);
      setSubmitStatus("error");
      setUploadProgress(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-ds-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-surface rounded-ds shadow-md p-ds-6">
          <h1 className="text-3xl font-heading font-bold text-primary mb-ds-2">
            Upload Podcast Episode
          </h1>
          <p className="text-text-secondary mb-ds-6">
            Upload your audio and video files along with episode details
          </p>

          <form onSubmit={handleSubmit} className="space-y-ds-6">
            {/* Episode Number */}
            <div>
              <label htmlFor="episodeNumber" className="block text-sm font-medium text-text-primary mb-ds-2">
                Episode Number *
              </label>
              <input
                id="episodeNumber"
                type="text"
                value={episodeNumber}
                onChange={(e) => setEpisodeNumber(e.target.value)}
                placeholder="e.g., 42"
                className="w-full px-ds-3 py-ds-2 border border-border rounded-ds bg-background text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-normal"
                required
              />
            </div>

            {/* Editing Notes */}
            <div>
              <label htmlFor="editingNotes" className="block text-sm font-medium text-text-primary mb-ds-2">
                Editing Notes
              </label>
              <textarea
                id="editingNotes"
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                placeholder="e.g., Remove the first minute, cut phone ring at 15:30"
                rows={5}
                className="w-full px-ds-3 py-ds-2 border border-border rounded-ds bg-background text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-normal resize-none"
              />
            </div>

            {/* File Uploads - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-ds-4">
              {/* Audio File Upload */}
              <div>
                <label htmlFor="audio" className="block text-sm font-medium text-text-primary mb-ds-2">
                  Audio File
                </label>
                <input
                  id="audio"
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <div className="space-y-ds-2">
                  <RainbowButton
                    type="button"
                    onClick={() => document.getElementById("audio")?.click()}
                    className="w-full"
                  >
                    Choose Audio File
                  </RainbowButton>
                  {audioFile && (
                    <div className="flex items-center justify-between bg-surface border border-border rounded-ds px-ds-3 py-ds-2">
                      <p className="text-sm text-text-primary truncate flex-1">
                        {audioFile.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setAudioFile(null);
                          const input = document.getElementById("audio") as HTMLInputElement;
                          if (input) input.value = "";
                        }}
                        className="ml-ds-2 text-primary hover:text-primary/80 font-bold text-lg"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Video File Upload */}
              <div>
                <label htmlFor="video" className="block text-sm font-medium text-text-primary mb-ds-2">
                  Video File
                </label>
                <input
                  id="video"
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <div className="space-y-ds-2">
                  <RainbowButton
                    type="button"
                    onClick={() => document.getElementById("video")?.click()}
                    className="w-full"
                  >
                    Choose Video File
                  </RainbowButton>
                  {videoFile && (
                    <div className="flex items-center justify-between bg-surface border border-border rounded-ds px-ds-3 py-ds-2">
                      <p className="text-sm text-text-primary truncate flex-1">
                        {videoFile.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setVideoFile(null);
                          const input = document.getElementById("video") as HTMLInputElement;
                          if (input) input.value = "";
                        }}
                        className="ml-ds-2 text-primary hover:text-primary/80 font-bold text-lg"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-ds-2">
              <RainbowButton
                type="submit"
                disabled={isSubmitting}
                className="w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-ds-2"
              >
                {isSubmitting && <Spinner className="h-5 w-5" />}
                {isSubmitting
                  ? `Uploading... ${uploadProgress}%`
                  : submitStatus === "success"
                  ? "Upload Complete ✓"
                  : "Upload Episode"}
              </RainbowButton>

              {/* Progress Bar */}
              {isSubmitting && (
                <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}

              {/* Error Message */}
              {submitStatus === "error" && (
                <p className="text-error text-sm text-center">
                  ❌ Upload failed. Please try again.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}