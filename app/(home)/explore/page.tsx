"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ChannelCard } from "@/app/(home)/components/channel-card";
// import { subscribedChannel, exploreChannel } from "@/app/(home)/data/channel";
import {useEffect, useState} from "react";

export default function ExplorePage() {

  const [exploreChannel, setChannels] = useState<any>([])
  const [subscribedChannel, setSubscribedChannel] = useState<any>([])

  useEffect(() => {
    (async ()=> {
      const response = await fetch("/api/explore-subscribed");
     const channels = await response.json();
     setChannels(channels);

      const susbcribedResponse = await fetch("/api/subscribe", {method: "GET"});
      const subscribed = await susbcribedResponse.json();

      // Merge channel data with subscribed information
      const enrichedSubscribed = subscribed.map((sub: any) => {
        const channel = channels.find((channel: any) => channel.id === sub.channelId);
        return channel
            ? {
              ...sub,
              name: channel.name,
              username: channel.username,
              description: channel.description,
              subscribers: channel.subscribers?.length || 0,
              avatar: channel.avatar,
              isSubscribed: true,
            }
            : sub; // If no channel found, return sub as-is
      });

      setSubscribedChannel(enrichedSubscribed);

    })()
  }, []);


  return (
    <>
      <div className="h-full px-4 py-6 lg:px-8">
        <Tabs defaultValue="explore" className="h-full space-y-6">
          <div className="space-between flex items-center">
            <TabsList>
              <TabsTrigger data-cy='explore' value="explore" className="relative">
                Explore
              </TabsTrigger>
              <TabsTrigger data-cy='subscribed' value="subscribed">Subscribed</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="explore" className="border-none p-0 outline-none">
            <div className="space-y-4">
              {exploreChannel?.map((channel:any) => (
                <ChannelCard
                  data-cy='channel-card'
                  key={channel?.username}
                  channel={channel}
                  className="w-full"
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent
            value="subscribed"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            <div className="space-y-4">
              {subscribedChannel.map((channel: any) => (
                <ChannelCard
                  data-cy='channel-card'
                  key={channel.id}
                  channel={channel}
                  className="w-full"
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
