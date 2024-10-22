"use client"
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainNav } from "@/app/channel/dashboard/components/main-nav";
import { Overview } from "@/app/channel/dashboard/components/overview";
import { Subscribers } from "@/app/channel/dashboard/components/subscribers";
import { RecentSales } from "@/app/channel/dashboard/components/recent-sales";
import { Search } from "@/app/channel/dashboard/components/search";
import TeamSwitcher from "@/app/channel/dashboard/components/team-switcher";
import { UserNav } from "@/app/channel/dashboard/components/user-nav";
import  PublicVideos  from "@/app/channel/dashboard/components/public-videos";
import { SettingsForm } from "@/app/channel/dashboard/components/settings";
import {useEffect, useState} from "react";
import * as React from "react";

/*export const metadata: Metadata = {
  title: "Channel Dashboard",
  description: "Manage your channel easily.",
};*/

export default function DashboardPage() {

  const [channels, setChannels] = useState([])
  const [selectedTeam, setSelectedTeam] = React.useState<any>({});
  const getChannels = async ()=> {
    const response = await fetch("/api/channel", {method: 'GET'});
    const {data} = await response.json();
    return data;
  }

  useEffect(() => {
    (async ()=> {
      const data = await getChannels();
      setChannels(data);
      setSelectedTeam(data[0])
    })()
  }, []);



  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const selectedChannel: any = channels.find((channel) => channel?.username === selectedTeam?.username);


  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Channels { selectedTeam?.name }</h3>
          <p className="text-sm text-muted-foreground">
            Manage your channel easily.
          </p>
        </div>
        <Separator />
        <div className="hidden flex-col md:flex">
          <div className="flex-1 space-y-4">
            <Tabs defaultValue="overview" className="space-y-4">
              <div className="flex items-center justify-start space-x-4">
                <TeamSwitcher channels={channels} selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} />
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
                  <TabsTrigger value="public_video">Public Videos</TabsTrigger>
                  <TabsTrigger data-cy="settings-tab" value="settings">Settings</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                  {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    selectedChannel?.overview?.cards?.map((card: any) => (
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                              {card?.title}
                            </CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-muted-foreground"
                            >
                              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                          </CardHeader>
                          <CardContent>

                            <div className="text-2xl font-bold"> {
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-ignore
                              selectedChannel.overview.cards.indexOf(card) !== selectedChannel.overview.cards.length - 1
                                  ? "$"
                                  : ""} {card?.value}</div>
                            <p className="text-xs text-muted-foreground">
                              {card?.increase}% from last month
                            </p>
                          </CardContent>
                        </Card>
                    ))
                  }

                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Sales</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <Overview data={selectedChannel?.overview?.sales?.data} />
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Recent Sales</CardTitle>
                      <CardDescription>
                        You made {selectedChannel?.overview?.recentSales?.length || 0} sales this month.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentSales data={selectedChannel?.overview?.recentSales} />
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Subscribers</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <Overview data={selectedChannel?.overview?.subscribers?.data} />
                    </CardContent>
                  </Card>
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Views</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <Overview data={selectedChannel?.overview?.views?.data}/>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="subscribers" className="space-y-4">
                <Subscribers />
              </TabsContent>
              <TabsContent value="public_video" className="space-y-4">
                <PublicVideos />
              </TabsContent>
              <TabsContent value="settings" className="space-y-4">
                <SettingsForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
