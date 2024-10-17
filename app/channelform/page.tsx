import { EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ChannelForm() {
  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <Card className="min-w-fit w-1/4">
        <CardHeader>
          <CardTitle className="text-2xl">New Channel</CardTitle>
          <CardDescription>
            Fill the required fields below to create a new channel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">
                Title
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Pedro Duarte Channel"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">
                Username
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="@peduarte"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                placeholder="Welcome to my channel!"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price_per_month">
                Price Per Month ($)
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="price_per_month"
                type="number"
                defaultValue="5"
                min="5"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price_per_month">
                Access for Non Subscribers
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <RadioGroup required className="w-full">
                <div>
                  <RadioGroupItem
                    value="card"
                    id="card"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="card"
                    className="grid grid-cols-7 items-center justify-center space-x-1 rounded-md border-2 border-muted bg-popover px-2 py-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="col-span-1 mx-auto">
                      <EyeNoneIcon className="mt-px h-5 w-5" />
                    </div>
                    <div className="col-span-6 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Channel Page
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Open channel but cannot see any video thumbnail
                      </p>
                    </div>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="paypal"
                    id="paypal"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="paypal"
                    className="grid grid-cols-7 items-center justify-center space-x-1 rounded-md border-2 border-muted bg-popover px-2 py-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="col-span-1 mx-auto">
                      <EyeOpenIcon className="mt-px h-5 w-5" />
                    </div>
                    <div className="col-span-6 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Video Page
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Open video page but cannot play the video
                      </p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <Button type="submit" className="w-full">
              Create
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
