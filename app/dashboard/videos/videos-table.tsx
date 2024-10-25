import { useState, useEffect } from "react";
import { Metadata } from "next";
import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { taskSchema, Task } from "./data/schema";

export const metadata: Metadata = {
  title: "Videos",
  description: "List of your private videos and their status.",
};

/*const video_demo_json = [
  {
    id: "1",
    filename: "Video 1",
    duration: "1:00",
    thumbnail:
      "https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=3274",
    created: "2021-07-01T12:00:00",
  },
  {
    id: "2",
    filename: "Video 2",
    duration: "1:00",
    thumbnail:
      "https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=3274",
    created: "2021-07-01T12:00:00",
  },
];*/

export function VideosTable({ initialVideos }: { initialVideos: Task[] }) {
  const [videos, setVideos] = useState<Task[]>([...initialVideos]);

  // Fetch uploaded videos if needed
  useEffect(() => {
    const fetchUploadedVideos = async () => {
      const response = await fetch("/api/video-upload", {
        method: "GET",
      });
      const data = await response.json();
      setVideos(data.data); // Update state with fetched videos
    };

    fetchUploadedVideos();
  }, [initialVideos]);

  // Validate videos against the schema
  // const tasks = z?.array(taskSchema)?.parse(videos);

  return (
      <>
        <DataTable data={videos} columns={columns} />
      </>
  );
}
