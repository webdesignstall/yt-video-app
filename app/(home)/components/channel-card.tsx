import { Channel } from "../data/channel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from 'next/image'

interface ChannelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  channel: Channel;
}

export function ChannelCard({
  channel,
  className,
  ...props
}: ChannelCardProps) {
  return (
    <Link
      key={channel?.username}
      href={`/channel/${channel?.username}`}
      className={cn(
        buttonVariants({ variant: "outline" }),
        "w-full justify-start flex py-14 px-6 items-center rounded-xl",
      )}
    >
      <div className={cn("space-y-3", className)} {...props}>
        <div className="flex items-center">
          <Avatar className="h-16 w-16">

            <Image src={`data:image/png;base64,`+channel?.avatar} alt="Avatar" width={64} height={64}/>
            {/*<AvatarImage src={channel?.avatar} alt="Avatar" />*/}
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-lg font-semibold">{channel?.name}</p>
            <p className="text-sm text-muted-foreground">
              {channel?.username} ‧ {channel?.subscribers?.length}
            </p>
            <p className="text-sm text-muted-foreground">
              {channel?.description}
            </p>
          </div>
          <Button className="ml-auto font-medium">
            {channel.isSubscribed ? "Subscribed" : "Subscribe"}
          </Button>
        </div>
      </div>
    </Link>
  );
}
