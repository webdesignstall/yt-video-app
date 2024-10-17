import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Sidebar } from "./components/sidebar";
import { Search } from "@/app/(home)/components/search";
import { UserNav } from "@/app/(home)/components/user-nav";
import { playlists } from "./data/playlists";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page.",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/music-light.png"
          width={1280}
          height={1114}
          alt="Music"
          className="block dark:hidden"
        />
        <Image
          src="/examples/music-dark.png"
          width={1280}
          height={1114}
          alt="Music"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden md:block">
        <div className="border-b">
          <div className="flex h-16 items-center justify-between px-4">
            <Link href="/" className={cn(buttonVariants({ variant: "ghost" }))}>
              Frud
            </Link>
            <Search />
            <UserNav />
          </div>
        </div>
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
