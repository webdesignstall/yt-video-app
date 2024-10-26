"use client"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { AlbumArtwork } from "./components/album-artwork";
import {useEffect, useState} from "react";

export default function FeedPage() {

  const [videos, setVideos] = useState<any>()

  useEffect(() => {
    (async ()=> {
      const res = await fetch('/api/public-videos', {method: 'GET'});
      const data = await res.json();
      setVideos(data)

    })()
  }, []);

  
  return (
    <>
      <div className="h-full px-4 py-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Latest</h2>
            <p className="text-sm text-muted-foreground">
              Stay up to date with your followed channels.
            </p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="relative">
          <ScrollArea>
            <div className="grid grid-cols-4 gap-8">
              {videos?.latest?.videos?.map((album: any) => (
                <AlbumArtwork
                  username={videos?.latest?.username}
                  key={album.name}
                  album={album}
                  className="w-full"
                  aspectRatio="video"
                  width={150}
                  height={150}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <div className="mt-6 space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Made for You
          </h2>
          <p className="text-sm text-muted-foreground">
            Top picks for you. Updated daily.
          </p>
        </div>
        <Separator className="my-4" />
        <div className="relative">
          <ScrollArea>
            <div className="grid grid-cols-4 gap-8">
              {videos?.forYou?.videos?.map((album: any) => (
                <AlbumArtwork
                  username={videos?.forYou?.username}
                  key={album.name}
                  album={album}
                  className="w-full"
                  aspectRatio="video"
                  width={150}
                  height={150}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
