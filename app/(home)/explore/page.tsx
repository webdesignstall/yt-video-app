import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ChannelCard } from "@/app/(home)/components/channel-card";
import { subscribedChannel, exploreChannel } from "@/app/(home)/data/channel";

export default function ExplorePage() {
  return (
    <>
      <div className="h-full px-4 py-6 lg:px-8">
        <Tabs defaultValue="explore" className="h-full space-y-6">
          <div className="space-between flex items-center">
            <TabsList>
              <TabsTrigger value="explore" className="relative">
                Explore
              </TabsTrigger>
              <TabsTrigger value="subscribed">Subscribed</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="explore" className="border-none p-0 outline-none">
            <div className="space-y-4">
              {exploreChannel.map((channel) => (
                <ChannelCard
                  key={channel.name}
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
              {subscribedChannel.map((channel) => (
                <ChannelCard
                  key={channel.name}
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
