import { Separator } from "@/components/ui/separator";
import { SubscriptionsTable } from "@/app/admindashboard/reviewed/subscriptions-table";

export default function SettingsSubscriptionsPage() {
  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="text-lg font-medium">Reviewed Applications</h3>
        <p className="text-sm text-muted-foreground">
          List of all reviewed applications.
        </p>
      </div>
      <Separator />
      <div className="w-full">
        <SubscriptionsTable />
      </div>
    </div>
  );
}
