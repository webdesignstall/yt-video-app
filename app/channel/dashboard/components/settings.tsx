"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import * as React from "react";
import {SheetTitle} from "@/components/ui/sheet";

const profileFormSchema = z.object({
  channel_name: z
    .string()
    .min(4, {
      message: "Channel name must be at least 4 characters.",
    })
    .max(30, {
      message: "Channel name must not be longer than 30 characters.",
    }),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  description: z.string().max(160, 'Description must not be longer than 160 characters.').min(4, 'Description must be at least 4 characters.').optional(),
  price_per_month: z.coerce.number().min(5),
  non_subscriber_access: z.union([z.literal("1"), z.literal("2")]),
  header_background: z.instanceof(File).optional(),
  avatar: z.instanceof(File).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  description: "I own a computer.",
};

export function SettingsForm({data, getChannels}: {data:any, getChannels: any}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [headerPreview, setHeaderPreview] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = React.useState();
    const [errorMsg, setErrorMsg] = React.useState();

  const onSubmit = async (e: any)=> {
    e.preventDefault();
    const {channel_name, username, description, price_per_month, non_subscriber_access} = form.getValues();

        const body = {
            'name': channel_name,
            "avatar": avatarPreview,
            "header_background": headerPreview,
            username, description, price_per_month, non_subscriber_access,
        };

      const response = await fetch("/api/channel", {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
      });

      const result = await response.json();
      if (response.ok) {
          console.log(result?.message);
          setSuccessMsg(result?.message)
          await getChannels()
      }else {
          console.log(result?.error);
          setErrorMsg(result?.error)
      }

   /* toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });*/

  }

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    // setPreview: React.Dispatch<React.SetStateAction<string | null>>,
    setFileBase64: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // setPreview(URL.createObjectURL(file));
        // Convert file to Base64
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result?.toString().split(',')[1]; // Extract the base64 string
            if (base64String) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setFileBase64(base64String);  // Store Base64 string
            }
        };

        reader.readAsDataURL(file);
    }
  };

    useEffect(() => {
        form.setValue('channel_name', data?.name)
        form.setValue('username', data?.username)
        form.setValue('description', data?.description)
        form.setValue('price_per_month', data?.price_per_month)
        form.setValue('non_subscriber_access', data?.option)
        setAvatarPreview(data?.avatar);
        setHeaderPreview(data?.header_background);
    }, [data?.username]);

  return (
      <>
          {
              successMsg &&  <p data-cy='apiResponse-msg' className='text-green-500'>{successMsg}</p>
          }
          {
              errorMsg &&  <p data-cy='apiResponse-msg' className='text-red-500'>{errorMsg}</p>
          }

          <Form {...form}>
              {/*  @ts-ignore */}
              <form onSubmit={onSubmit} className="space-y-8">
                  <FormField
                      control={form.control}
                      name="channel_name"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Channel Name</FormLabel>
                              <FormControl>
                                  <Input data-cy="channel-name" placeholder="John Doe Channel" {...field} />
                              </FormControl>
                              <FormDescription>
                                  This is your public display name that represents your channel.
                              </FormDescription>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                  <Input data-cy="username" placeholder="johndoepro" {...field} />
                              </FormControl>
                              <FormDescription>
                                  Username is unique and lowercase, used to identify your channel.
                              </FormDescription>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                  <Textarea
                                      data-cy="description"
                                      placeholder="Tell us a little bit about yourself"
                                      className="resize-none"
                                      {...field}
                                  />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  <Card className="mb-8">
                      <CardContent className="relative min-h-[200px] p-4">
                          <div className="absolute inset-0">
                              <div className="cursor-pointer h-full w-full relative">
                                  <Label
                                      htmlFor="header-file-input"
                                      className={`absolute inset-0 flex items-center justify-center text-gray-600 transition-opacity cursor-pointer z-10 ${headerPreview ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
                                  >
                                      Choose Header File
                                  </Label>
                                  <Input
                                      data-cy="header-file-input"
                                      id="header-file-input"
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      {...form.register("header_background")}
                                      onChange={(e) => handleFileChange(e, setHeaderPreview)}
                                  />
                              </div>
                              {headerPreview && (
                                  <Image
                                      src={`data:image/png;base64,${headerPreview}`}
                                      layout="fill"
                                      objectFit="cover"
                                      alt="Header Background"
                                      className="absolute inset-0 z-0"
                                  />
                              )}
                          </div>
                          <div className="relative z-10 w-32 h-32 mt-4">
                              <Image
                                  src={`data:image/png;base64,${avatarPreview}` || "/examples/dashboard-light.png"}
                                  width={96}
                                  height={96}
                                  alt="Avatar"
                                  className="rounded-full w-[96%] h-[96%]"
                              />
                              <Label
                                  htmlFor="file-input"
                                  className="absolute inset-0 text-white bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                              >
                                  Choose File
                              </Label>
                              <Input
                                  data-cy="file-input"
                                  id="file-input"
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  {...form.register("avatar")}
                                  onChange={(e) => handleFileChange(e, setAvatarPreview)}
                              />
                          </div>
                      </CardContent>
                  </Card>
                  <FormField
                      control={form.control}
                      name="price_per_month"
                      render={({field}) => (
                          <FormItem>
                              <FormLabel>Price per Month ($)</FormLabel>
                              <FormControl>
                                  <Input data-cy="price" defaultValue={5} type="number" {...field} />
                              </FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="non_subscriber_access"
                      render={({field}) => (
                          <FormItem>
                              <FormLabel>Options for Non-Subscribers</FormLabel>
                              <FormControl>
                                  <RadioGroup

                                      defaultValue="1"
                                      onValueChange={field.onChange}
                                      {...field}
                                  >
                                      <div className="flex items-center space-x-2">
                                          <RadioGroupItem data-cy="option" value="1" id="option1" />
                                          <Label htmlFor="option1">
                                              Open channel but cannot see any video thumbnail
                                          </Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                          <RadioGroupItem data-cy="option" value="2" id="option2" />
                                          <Label htmlFor="option2">
                                              See any video thumbnail and open video-play page but
                                              cannot play the video
                                          </Label>
                                      </div>
                                  </RadioGroup>
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  <Button type="submit">Update profile</Button>
              </form>
          </Form>
      </>

  );
}
