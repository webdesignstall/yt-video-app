"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import {useEffect, useState} from "react";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).min(4, 'Bio must be at least 4 characters.').max(160),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
    id: z.string()
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

/*// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: "I own a computer.",
  urls: [
    { value: "https://shadcn.com" },
    { value: "http://twitter.com/shadcn" },
  ],
}*/

export function ProfileForm() {

    const [userProfile, setUserProfile] = useState()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    // defaultValues: userProfile,
    mode: "onChange",
  })

  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  })

    const [apiResponseSuccessMsg, setApiResponseSuccessMsg] = useState()
    const [apiResponseErrorMsg, setApiResponseErrorMsg] = useState()



  async function onSubmit(data: ProfileFormValues) {

      const response = await fetch("/api/profile-update", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
          console.log(result)
          // @ts-ignore
          setApiResponseSuccessMsg(result?.message)
      }else {
          setApiResponseErrorMsg(result?.error)
      }

      console.log({response})



    /*toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })*/
  }


  const fetchUserProfile = async ()=> {
      const response = await fetch("/api/profile-update",{
          method: "GET"
      });

      const {data} = await response.json();
      return data;
  }

    useEffect(() => {
        (async ()=> {
            const data = await fetchUserProfile();
            form.setValue('username', data?.username)
            form.setValue('email', data?.email)
            form.setValue('bio', data?.bio)
            form.setValue('urls', data?.urls)
            form.setValue('id', data?.id)
            setUserProfile(data)
        })()
    }, []);

  return (
    <Form {...form}>

        {
            apiResponseSuccessMsg && <p data-cy='apiResponseMsg' className='text-green-500'>{apiResponseSuccessMsg}</p>
        }
        {
            apiResponseErrorMsg && <p data-cy='apiResponseMsg' className='text-red-500'>{apiResponseErrorMsg}</p>
        }

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem hidden>
              <FormControl>
                <Input hidden data-cy='id' {...field} />
              </FormControl>
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
                <Input data-cy='username' placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/*  @ts-ignore */}
                  <SelectItem role="option" value={userProfile?.email}>{userProfile?.email}</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage verified email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  data-cy='bio'
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem data-cy={`url-field`}>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input data-cy={`url`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            data-cy='url-add-btn'
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add URL
          </Button>
        </div>
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}
