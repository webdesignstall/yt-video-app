import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Album } from "../data/albums";

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  username: any,
  album: any;
  aspectRatio?: "portrait" | "square" | "video";
  width?: number;
  height?: number;
}

export function AlbumArtwork({
  username,
  album,
  aspectRatio = "video",
  width,
  height,
  className,
  ...props
}: AlbumArtworkProps) {
  return (
    <Link
      data-cy='video-link'
      key={album.id}
      href={`/channel/${username}/video?id=${album?.id}`}
      className={
        (cn(buttonVariants({ variant: "ghost" })), "w-full justify-start")
      }
    >
      <div className={cn("space-y-3", className)} {...props}>
        <div className="overflow-hidden rounded-md">
          <Image
            data-cy='video-thumbnail'
            src={album?.cover}
            alt={album?.name}
            width={width}
            height={height}
            className={cn("h-auto w-full object-cover", {
              "aspect-[3/4]": aspectRatio === "portrait",
              "aspect-square": aspectRatio === "square",
              "aspect-video": aspectRatio === "video",
            })}
          />
        </div>
        <div className="space-y-1 text-sm">
          <h3 data-cy='video-title' className="font-medium leading-none">{album?.name}</h3>
          <p className="text-xs text-muted-foreground">
            <span data-cy='video-views'>{album?.views}</span> • <span data-cy='video-uploaded-date'> {album?.created_at} </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
