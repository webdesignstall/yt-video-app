"use client";
import { useState} from "react";
import { Separator } from "@/components/ui/separator";
import { VideosTable } from "@/app/dashboard/videos/videos-table";
import { useDropzone } from "react-dropzone";
import { Task } from "./data/schema";
import { UploadIcon } from "@radix-ui/react-icons";

function VideoUploader({ onUpload }: { onUpload: (_files: File[]) => void }) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "video/mp4": [".mp4"],
      "video/avi": [".avi"],
      "video/quicktime": [".mov"],
      "video/x-ms-wmv": [".wmv"],
    },
    onDrop: (acceptedFiles, rejectedFiles) => {
      console.log("acceptedFiles", acceptedFiles, rejectedFiles);
      if (rejectedFiles.length > 0) {
        setErrorMsg("Unsupported file format. Please upload a video in .mp4, .avi, .mov, or .wmv format.");
      } else {
        setErrorMsg(null); // Clear any previous error
        onUpload(acceptedFiles);
      }
    },
    multiple: false,
  });

  return (
      <div>
        {errorMsg && <p data-cy="upload-error-msg" className="text-red-500">{errorMsg}</p>}

          <div
              {...getRootProps()}
              className={`p-6 mt-4 mb-6 border-2 border-dashed rounded-lg text-center cursor-pointer ${
                  isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              data-cy="upload-wrap"
          >
            <input data-cy="video-input" {...getInputProps()} />
            {isDragActive ? (
                <div className="space-y-4">
                  <UploadIcon className="w-12 h-12 mx-auto text-blue-500" />
                  <p>Drop the video files here ...</p>
                </div>
            ) : (
                <div className="space-y-4">
                  <UploadIcon className="w-12 h-12 mx-auto text-blue-500" />
                  <p>Drag and drop a video file here, or click to select a file</p>
                </div>
            )}
          </div>
      </div>
  );
}

export default function SettingsVideosPage() {
  const [initialVideos, setInitialVideos] = useState<any>([]);
  const [videos, setVideos] = useState<any>([]);
  const [apiResponseSuccessMsg, setApiResponseSuccessMsg] = useState();
  const [apiResponseErrorMsg, setApiResponseErrorMsg] = useState();

  const handleUpload = async (newVideos: File[]) => {
    if (newVideos.length > 0) {
      const lastUploadedVideo = newVideos[newVideos.length - 1];

      // Get video duration in HH:MM:SS format
      const duration = await getVideoDuration(lastUploadedVideo);

      const updatedVideo: Task = {
        id: `new-${Date.now()}`,
        filename: lastUploadedVideo.name,
        duration: duration || "Unknown", // Use the fetched duration
        thumbnail:
            "https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=3274",
        created: new Date().toISOString(),
      };

      const response = await fetch("/api/video-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedVideo),
      });
      const result = await response.json();
      if (response.ok) {
        console.log(result);
        setApiResponseSuccessMsg(result?.message);
        // @ts-ignore
        setVideos((prev) => [...prev, updatedVideo]); // Append the new video to the previous list
      } else {
        setApiResponseErrorMsg(result?.error);
      }
    /*  console.log(updatedVideo);
      console.log("prev videos", videos);
      console.log("upload videos", lastUploadedVideo);*/

    }
  };
  // Function to get video duration in HH:MM:SS format
  const getVideoDuration = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const video = document.createElement("video");
      const fileReader = new FileReader();

      fileReader.onload = (event) => {
        video.src = event.target?.result as string;

        video.onloadedmetadata = () => {
          const durationInSeconds = Math.floor(video.duration);
          const hours = Math.floor(durationInSeconds / 3600);
          const minutes = Math.floor((durationInSeconds % 3600) / 60);
          const seconds = durationInSeconds % 60;

          // Format hours, minutes, seconds to always be two digits
          const formattedDuration = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
          resolve(formattedDuration);
        };

        video.onerror = () => {
          reject(new Error("Error loading video metadata"));
        };
      };

      fileReader.readAsDataURL(file);
    });
  };


  return (
      <div className="space-y-6 w-full">
        <div>
          {apiResponseSuccessMsg && <p data-cy='api-res-msg' className='text-green-500'>{apiResponseSuccessMsg}</p>}
          {apiResponseErrorMsg && <p data-cy='api-res-msg' className='text-red-500'>{apiResponseErrorMsg}</p>}
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
