import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/app/dashboard/components/sidebar-nav";
import { UserNav } from "@/app/(home)/components/user-nav";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage user preferences and settings.",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/dashboard",
  },
  {
    title: "Payment",
    href: "/dashboard/payment",
  },
  {
    title: "Subscriptions",
    href: "/dashboard/subscriptions",
  },
  {
    title: "Videos",
    href: "/dashboard/videos",
  },
  {
    title: "Channels",
    href: "/dashboard/channels",
  },
  //{
  //  title: "Account",
  //  href: "/forms/account",
  //},
  //{
  //  title: "Appearance",
  //  href: "/forms/appearance",
  //},
  //{
  //  title: "Notifications",
  //  href: "/forms/notifications",
  //},
  //{
  //  title: "Display",
  //  href: "/forms/display",
  //},
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-4 md:block">
        <div className="flex items-center justify-between space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <UserNav />
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 min-w-fit lg:min-w-60">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 w-full">{children}</div>
        </div>
      </div>
    </>
  );
}
