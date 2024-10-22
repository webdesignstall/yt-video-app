"use client";

import * as React from "react";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
  BellIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const groups = {
  label: "Channels",
  teams: [
    {
      label: "Fadel spaceship",
      value: "fadelpamungkas",
    },
    {
      label: "Alya Jelita Cooking",
      value: "cookingjelita",
    },
    {
      label: "Monsters Inc.",
      value: "monstersinc",
    },
  ],
};

// type Team = (typeof groups)["teams"][number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
type TeamSwitcherProps = Omit<PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & {
  channels: string[]; // Assuming channels is an array of strings
  selectedTeam: any,
  setSelectedTeam: any,
};

export default function TeamSwitcher({ className, channels, selectedTeam, setSelectedTeam,  ...props }: TeamSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [showNewTeamSheet, setShowNewTeamSheet] = React.useState(false);

  const [successMsg, setSuccessMsg] = React.useState();
  const [errorMsg, setErrorMsg] = React.useState();
  
  const onsubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const username = e.target.username.value;
    const description = e.target.description.value;
    const price_per_month = e.target.price_per_month.value;
    const option = e.target.option.value;


    const response = await fetch("/api/channel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        description,
        price_per_month,
        option
      }),
    });
    const result = await response.json();
    if (response.ok) {
      console.log(result?.message);
      setSuccessMsg(result?.message)
      setShowNewTeamSheet(false)
    }else {
      console.log(result?.error);
      setErrorMsg(result?.error)
      setShowNewTeamSheet(true)
    }
  }

  if (!channels?.length){
    return ""
  }

  return (
    <Sheet open={showNewTeamSheet} onOpenChange={setShowNewTeamSheet}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-label="Select a team"
              className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                  src={`https://avatar.vercel.sh/${selectedTeam?.username}.png`}
                  alt={selectedTeam?.name}
                  className="grayscale"
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {selectedTeam?.name}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>


        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search channel..." />
              <CommandEmpty>No team found.</CommandEmpty>
              <CommandGroup key='Channel' heading='Channel'>
                {channels?.map((team: any) => (
                  <CommandItem
                    key={team?.usrename}
                    onSelect={() => {
                      setSelectedTeam(team);
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${team?.username}.png`}
                        alt={team?.name}
                        className="grayscale"
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    {team?.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedTeam?.username === team?.username
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <SheetTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamSheet(true);
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    <p data-cy='channel-create-modal-open-btn'> Create Channel </p>
                  </CommandItem>
                </SheetTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <SheetContent className="w-1/2">
        <SheetHeader>
          {
            successMsg &&  <SheetTitle data-cy='apiResponse-msg' className='text-green-500'>{successMsg}</SheetTitle>
          }
          {
            errorMsg &&  <SheetTitle data-cy='apiResponse-msg' className='text-red-500'>{errorMsg}</SheetTitle>
          }

          <SheetTitle>New Channel</SheetTitle>
          <SheetDescription>
            Fill the required fields below to create a new channel.
          </SheetDescription>
        </SheetHeader>
        {/*@ts-ignore*/}
        <form data-cy='channel-form' onSubmit={onsubmit}>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input data-cy='channel-name' name='name' id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input data-cy='username' name='username' id="username"  className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              data-cy='description' name='description'
              id="description"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price_per_month" className="text-right">
              Price Per Month ($)
            </Label>
            <Input
              data-cy='price_per_month' name='price_per_month'
              id="price_per_month"
              type="number"
              min="5"
              className="col-span-3"
            />
          </div>
          <div className="w-full space-y-4">
            <Label htmlFor="non_subscriber_access" className="text-right">
              Access for Non Subscribers
            </Label>
            <RadioGroup name='option' data-cy='option' className="w-full space-y-4">
              <div>
                <RadioGroupItem
                  value="1"
                  id="card"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="card"
                  className="grid grid-cols-5 items-center justify-center rounded-md border-2 border-muted bg-popover px-2 py-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="col-span-1 mx-auto">
                    <BellIcon className="mt-px h-5 w-5" />
                  </div>
                  <div className="col-span-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Everything
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Email digest, mentions & all activity.
                    </p>
                  </div>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="2"
                  id="paypal"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="paypal"
                  className="grid grid-cols-5 items-center justify-center rounded-md border-2 border-muted bg-popover px-2 py-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="col-span-1 mx-auto">
                    <EyeNoneIcon className="mt-px h-5 w-5" />
                  </div>
                  <div className="col-span-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Ignoring</p>
                    <p className="text-sm text-muted-foreground">
                      Turn off all notifications.
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <SheetFooter>
          {/*<SheetClose value={showNewTeamSheet} asChild>*/}
            <Button type="submit">Save changes</Button>
          {/*</SheetClose>*/}
        </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
