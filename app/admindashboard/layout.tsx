import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/app/admindashboard/components/sidebar-nav";
import { UserNav } from "@/app/(home)/components/user-nav";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage user applications.",
};

const applications = {
  unreviewedCount: 5,
};

const sidebarNavItems = [
  {
    title: "Overview",
    href: "/admindashboard",
    count: 0,
  },
  {
    title: "Unreviewed Applications",
    href: "/admindashboard/unreviewed",
    count: applications.unreviewedCount,
  },
  {
    title: "Reviewed Applications",
    href: "/admindashboard/reviewed",
    count: 0,
  },
  {
    title: "Subscriptions",
    href: "/admindashboard/subscriptions",
    count: 0,
  },
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
          <h2 className="text-2xl font-bold tracking-tight">Admin Dashboard</h2>
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
