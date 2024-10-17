"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
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
  description: z.string().max(160).min(4).optional(),
  price_per_month: z.coerce.number().min(5),
  non_subscriber_access: z.union([z.literal("1"), z.literal("2")]),
  header_background: z.instanceof(File).optional(),
  avatar: z.instanceof(File).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  description: "I own a computer.",
};

export function SettingsForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [headerPreview, setHeaderPreview] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="channel_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Channel Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe Channel" {...field} />
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
                <Input placeholder="johndoepro" {...field} />
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
              <div className="cursor-pointer h-full w-full">
                <Label
                  htmlFor="header-file-input"
                  className="absolute inset-0 flex items-center justify-center text-gray-600 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  Choose Header File
                </Label>
                <Input
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
                  src={headerPreview}
                  layout="fill"
                  objectFit="cover"
                  alt="Header Background"
                />
              )}
            </div>
            <div className="relative z-10 w-32 h-32 mt-4">
              <Image
                src={avatarPreview || "/examples/dashboard-light.png"}
                width={96}
                height={96}
                alt="Avatar"
                className="rounded-full"
              />
              <Label
                htmlFor="file-input"
                className="absolute inset-0 text-white bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
              >
                Choose File
              </Label>
              <Input
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price per Month ($)</FormLabel>
              <FormControl>
                <Input defaultValue={5} type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="non_subscriber_access"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Options for Non-Subscribers</FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue="1"
                  onValueChange={field.onChange}
                  {...field}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="option1" />
                    <Label htmlFor="option1">
                      Open channel but cannot see any video thumbnail
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="option2" />
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
  );
}
