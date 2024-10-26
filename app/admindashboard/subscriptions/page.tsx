import { Separator } from "@/components/ui/separator";
import SubscriptionsTable  from "@/app/dashboard/subscriptions/subscriptions-table";

export default function SettingsSubscriptionsPage() {
  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="text-lg font-medium">Subscription Transactions</h3>
        <p className="text-sm text-muted-foreground">
          List of all subscription transactions
        </p>
      </div>
      <Separator />
      <div className="w-full">
        <SubscriptionsTable data={[]}/>
      </div>
    </div>
  );
}
