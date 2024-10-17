"use client";

import React, { ChangeEvent } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { BellIcon, HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
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

export default function BrowsePage() {
  const pricePerMonth = 5;
  const [liked, setLiked] = React.useState(false);
  const [subscribed, setSubscribed] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(pricePerMonth * 1);

  const handleLikeToggle = () => {
    setLiked(!liked);
  };

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

  //<div className="rounded-xl overflow-hidden">
  //  <video width="100%" controls className="rounded-xl">
  //    <source src="http://localhost:8080/video" type="video/mp4" />
  //    Your browser does not support the video tag.
  //  </video>
  //</div>;

  return (
    <>
      <div className="h-full px-4 py-6 lg:px-8 bg-gray-100">
        <div defaultValue="music" className="h-full space-y-6">
          <div className="border-none p-0 outline-none space-y-3">
            <div className="bg-background">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/40AYjP0_xdE"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-xl aspect-video"
              ></iframe>
            </div>
            <Card x-chunk="watch-video-descriptions">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Listen Now</CardTitle>
                  <h1 className="text-gray-500 font-medium">12.6k views</h1>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src="https://source.unsplash.com/100x100/?face"
                          alt="test"
                          className="grayscale"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      <div>
                        <h1>Learn Guitar Now</h1>
                        <p className="text-gray-500 text-sm">
                          79.6k subscribers
                        </p>
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
                    <div className="flex items-center justify-start">
                      <Button
                        variant="ghost"
                        onClick={handleLikeToggle}
                        className="p-2"
                      >
                        {liked ? (
                          <HeartIcon className="h-6 w-6" />
                        ) : (
                          <HeartFilledIcon className="h-6 w-6" />
                        )}
                      </Button>
                      <h1 className="text-gray-500 font-medium ml-2">
                        6.2k likes
                      </h1>
                    </div>
                  </div>
                  <h1>
                    {`Welcome to my guitar tutorial. This video is designed for
                    anyone who's picking up the guitar for the first time or
                    want to solidify their foundationals skills. This video is designed for
                    anyone who's picking up the guitar for the first time or
                    want to solidify their foundationals skills.`}
                  </h1>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="watch-video-more-from-this-channel">
              <CardHeader>
                <CardTitle>Comments</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-8">
                <div className="flex items-start gap-4">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div className="flex items-start justify-start w-full space-x-4">
                    <Input
                      id="comment"
                      type="text"
                      placeholder="Add a comment"
                    />
                    <Button>Post</Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-4">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-2">
                    <p className="text-sm font-medium leading-none">
                      @olivia.martin
                    </p>
                    <p className="text-sm">what’s up what’s up</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src="/avatars/02.png" alt="Avatar" />
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-2">
                    <p className="text-sm font-medium leading-none">
                      @jacksonlee
                    </p>
                    <p className="text-sm">
                      Love your video's but I have stopped watching them because
                      the constant moving maze above your head really triggers
                      my Asperger and ADHD to a point where I can't follow along
                      or I have to concentrate so hard that I tire out on these
                      long videos. I wonder if you would consider removing it?
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src="/avatars/03.png" alt="Avatar" />
                    <AvatarFallback>IN</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-2">
                    <p className="text-sm font-medium leading-none">
                      @isabellanguyen
                    </p>
                    <p className="text-sm">
                      Mind giving me the skinny on the "Zig on the client" part?
                      Are you somehow transforming Zig to JS, or to whatever JS
                      is being transformed(compiled/interpreted, whatever) when
                      Firefox is executing that?...
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="watch-video-more-from-this-channel">
              <CardHeader>
                <CardTitle>More from this channel</CardTitle>
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
