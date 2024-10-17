"use client";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { VideosTable } from "@/app/dashboard/videos/videos-table";
import { useDropzone } from "react-dropzone";
import { Task } from "./data/schema";
import { UploadIcon } from "@radix-ui/react-icons";

function VideoUploader({ onUpload }: { onUpload: (_files: File[]) => void }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "video/*": [".mp4", ".avi", ".mov", ".wmv"],
    },
    onDrop: (acceptedFiles) => {
      onUpload(acceptedFiles);
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`p-6 mt-4 mb-6 border-2 border-dashed rounded-lg text-center cursor-pointer ${
        isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <div className="space-y-4">
          <UploadIcon className="w-12 h-12 mx-auto text-blue-500" />
          <p>Drop the video files here ...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <UploadIcon className="w-12 h-12 mx-auto text-blue-500" />
          <p>Drag n drop some video files here, or click to select files</p>
        </div>
      )}
    </div>
  );
}

export default function SettingsVideosPage() {
  const [videos, setVideos] = useState<Task[]>([]);

  const handleUpload = (newVideos: File[]) => {
    if (newVideos.length > 0) {
      const lastUploadedVideo = newVideos[newVideos.length - 1];
      const updatedVideo: Task = {
        id: `new-${Date.now()}`,
        filename: lastUploadedVideo.name,
        duration: "Processing...",
        thumbnail:
          "https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=3274",
        created: new Date().toISOString(),
      };
      console.log(updatedVideo);
      console.log("prev videos", videos);
      setVideos(() => [updatedVideo]);
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="text-lg font-medium">Videos</h3>
        <p className="text-sm text-muted-foreground">
          Upload and manage private videos.
        </p>
      </div>
      <Separator />
      <VideoUploader onUpload={handleUpload} />
      <div className="w-full">
        <VideosTable initialVideos={videos} />
      </div>
    </div>
  );
}
