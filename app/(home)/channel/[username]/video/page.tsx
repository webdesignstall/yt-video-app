"use client";

import React, {ChangeEvent, useEffect, useState} from "react";
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
import {useParams, useSearchParams} from "next/navigation";

export default function BrowsePage() {
  const [pricePerMonth, setPricePerMonth] = React.useState(0);
  const [liked, setLiked] = React.useState(false);
  const [subscribed, setSubscribed] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [channel, setChannel] = useState<any>({})
  const [video, setVideo] = useState<any>({})

  const {username} = useParams();
  const searchParams = useSearchParams();
  const videoId = searchParams.get("id");
  const [autoRenew, setAutoRenew] = useState(false);
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const handleLikeToggle = () => {
    setLiked(!liked);
  };

 /* const handleSubscribeToggle = () => {
    setSubscribed(!subscribed);
  };*/

  const handleNumberOfMonthChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value < 1) {
      event.target.value = "1";
    }
    setTotalPrice(value * pricePerMonth);
  };

  const fetchSingleVideo = async ()=> {
    const response = await fetch(`/api/channel/${username}`, {
      method: "GET",
    });

    const channel = await response.json();

    if (videoId){
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const getVideo = channel?.publicVideos?.find(item => item.id === videoId);
      setVideo(getVideo);
    }

    setChannel(channel)
    setPricePerMonth(channel?.price_per_month);
  }

  const handleComment = async (e: any)=> {
    e.preventDefault();
    const comment = e.target.comment.value;
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({username, videoId, comment})
    })

    await response.json();
    if (response.ok){
      await fetchSingleVideo()
      e.target.comment.value = ''
    }

  }

  const handleSubscribe = async (e: any)=> {
    e.preventDefault();
    const number_of_month = e.target.number_of_month.value;

    const body = {number_of_month, autoRenew, subscribe_for: totalPrice, username: channel?.username, channelId: channel?.id}

    const response = await fetch(`/api/subscribe`, {
      method: 'POST',
      body: JSON.stringify(body)
    })

    const result = await response.json();
    if (response.ok){
      setSuccessMsg(result?.message)
      setSubscribed(false);
    }else {
      setSubscribed(true);
      setErrorMsg(result?.error)
    }

  }

  useEffect(() => {
    (async () => {
     await fetchSingleVideo();
    })()
  }, [username, videoId]);

  //<div className="rounded-xl overflow-hidden">
  //  <video width="100%" controls className="rounded-xl">
  //    <source src="http://localhost:8080/video" type="video/mp4" />
  //    Your browser does not support the video tag.
  //  </video>
  //</div>;

  const handleDialogOpenChange = (isOpen: any) => {
    setSubscribed(isOpen);
    if (isOpen) {
      // Clear messages when modal opens
      setSuccessMsg("");
      setErrorMsg("");
    }
  };


  return (
    <>
      <div className="h-full px-4 py-6 lg:px-8 bg-gray-100">
        <div defaultValue="music" className="h-full space-y-6">
          <div className="border-none p-0 outline-none space-y-3">
            <div className="bg-background">
              <iframe
                width="100%"
                height="100%"
                src={video?.src}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-xl aspect-video"
              ></iframe>
            </div>
            <Card x-chunk="watch-video-descriptions">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{channel?.name}</CardTitle>
                  <h1 className="text-gray-500 font-medium">{video?.views}</h1>
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
                        <h1>{channel?.name}</h1>
                        <p className="text-gray-500 text-sm">
                          {channel?.subscribers?.length} subscribers
                        </p>
                      </div>
                      <Dialog open={subscribed} onOpenChange={handleDialogOpenChange}>
                        <DialogTrigger asChild>
                          {subscribed ? (
                            <Button variant="outline">
                              <BellIcon className="mr-2 h-5 w-5" /> Subscribed
                            </Button>
                          ) : (
                            <Button onClick={() => setSubscribed(true)}>
                              <BellIcon  className="mr-2 h-5 w-5" /> Subscribe
                            </Button>
                          )}
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg">
                          <form onSubmit={handleSubscribe}>

                            <DialogHeader className="mb-4">
                              <DialogTitle>Subscribe Channel</DialogTitle>
                              <DialogDescription>
                                Start to subscribe this channel for
                                <span className="font-semibold text-black">
                                {` $${channel?.price_per_month}/month.`}
                              </span>
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-8">
                              <div className="grid gap-3">
                                <Label htmlFor="number_of_month">Month</Label>
                                <Input
                                    name='number_of_month'
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
                                <Switch name='auto_renew' checked={autoRenew}
                                        onCheckedChange={setAutoRenew}/>
                              </div>
                            </div>

                            <DialogFooter className="sm:justify-end">

                              <DialogClose asChild>
                                <Button type="submit">
                                  Subscribe for ${totalPrice ? totalPrice : channel?.price_per_month}
                                </Button>
                              </DialogClose>

                            </DialogFooter>
                            <div>
                              {
                                  successMsg && <p data-cy='api-res-msg' className='text-green-500'>{successMsg}</p>
                              }
                              {
                                  errorMsg && <p data-cy='api-res-msg' className='text-red-500'>{errorMsg}</p>
                              }
                            </div>
                          </form>
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
                        {video?.liked} likes
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
                  <form onSubmit={handleComment}>
                    <div className="flex items-start justify-start w-full space-x-4">
                      <Input
                          data-cy='comment-input'
                          id="comment"
                          type="text"
                          placeholder="Add a comment"
                      />
                      <Button type='submit'>Post</Button>
                    </div>
                  </form>

                </div>
                <Separator/>
                {
                  video?.comments?.map((comment: any, index: any) => (
                      <div key={index} className="flex items-start gap-4">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src={comment?.author?.avatar} alt="Avatar"/>
                        <AvatarFallback>OM</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-2">
                        <p className="text-sm font-medium leading-none">
                          {comment?.author?.name}
                        </p>
                        <p className="text-sm">{comment?.content}</p>
                      </div>
                    </div>
                  ))
                }


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
                      {channel?.publicVideos?.map((album: any) => (
                          <AlbumArtwork
                              username={channel?.username}
                              key={album?.id}
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
