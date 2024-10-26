"use client"
import { Separator } from "@/components/ui/separator";
import  SubscriptionsTable  from "@/app/dashboard/subscriptions/subscriptions-table";
import {useEffect, useState} from "react";

export default function SettingsSubscriptionsPage() {

  const [subscriptions, setSubscriptions] = useState<any>([])

  useEffect(() => {
    (async ()=> {
      const response = await fetch("/api/subscriptions");
      const data = await response.json();
      setSubscriptions(data);
    })()
  }, []);

    return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="text-lg font-medium">Subscriptions</h3>
        <p className="text-sm text-muted-foreground">
          List of your channel subscriptions and their status.
        </p>
      </div>
      <Separator />
      <div className="w-full">
        <SubscriptionsTable data={subscriptions} />
      </div>
    </div>
  );
}
