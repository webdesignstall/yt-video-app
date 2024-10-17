"use client";

import React, { ChangeEvent } from "react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { BellIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { AlbumArtwork } from "@/app/(home)/components/album-artwork";
import { madeForYouAlbums } from "@/app/(home)/data/albums";

export default function ChannelPage() {
  const pricePerMonth = 5;
  const [subscribed, setSubscribed] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(pricePerMonth * 1);

  const handleSubscribeToggle = () => {
    setSubscribed(!subscribed);
  };

  const handleNumberOfMonthChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value < 1) {
      event.target.value = "1";
    }
    setTotalPrice(value * pricePerMonth);
  };

  return (
    <>
      <div className="h-full px-4 py-6 lg:px-8 bg-gray-100">
        <div defaultValue="music" className="h-full space-y-6">
          <div className="border-none p-0 outline-none space-y-3">
            <Card x-chunk="watch-video-descriptions">
              <CardHeader className="p-0">
                <Image
                  src={`https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=3274`}
                  alt="channel_header"
                  width={3000}
                  height={3000}
                  className="h-[250px] w-full object-cover rounded-xl"
                />
              </CardHeader>
              <CardContent>
                <div className="space-y-6 mt-12">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start space-x-4">
                      <Avatar className="mr-2 h-40 w-40">
                        <AvatarImage
                          src={`https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=3274`}
                          alt="test"
                          className="grayscale"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <h1 className="text-4xl font-semibold">
                          Learn Guitar Now
                        </h1>
                        <div className="text-gray-500 font-medium space-y-2">
                          <p>@LearnGuitar ‧ 79.6k subscribers ‧ 12 videos</p>
                          <p>Managed by OneUp Organizer</p>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            {subscribed ? (
                              <Button variant="outline">
                                <BellIcon className="mr-2 h-5 w-5" /> Subscribed
                              </Button>
                            ) : (
                              <Button>
                                <BellIcon className="mr-2 h-5 w-5" /> Subscribe
                              </Button>
                            )}
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-lg">
                            <DialogHeader className="mb-4">
                              <DialogTitle>Subscribe Channel</DialogTitle>
                              <DialogDescription>
                                Start to subscribe this channel for
                                <span className="font-semibold text-black">
                                  {` $${pricePerMonth}/month.`}
                                </span>
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-8">
                              <div className="grid gap-3">
                                <Label htmlFor="number_of_month">Month</Label>
                                <Input
                                  id="number_of_month"
                                  type="number"
                                  placeholder="1"
                                  min="1"
                                  onChange={handleNumberOfMonthChange}
                                />
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="flex-1 space-y-1">
                                  <p className="text-sm font-medium leading-none">
                                    Auto Renew
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Renew your subscription automatically.
                                  </p>
                                </div>
                                <Switch />
                              </div>
                            </div>
                            <DialogFooter className="sm:justify-end">
                              <DialogClose asChild>
                                <Button onClick={handleSubscribeToggle}>
                                  Subscribe for ${totalPrice}
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="watch-video-more-from-this-channel">
              <CardHeader>
                <CardTitle>Videos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <ScrollArea>
                    <div className="grid grid-cols-4 gap-8">
                      {madeForYouAlbums.map((album) => (
                        <AlbumArtwork
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
