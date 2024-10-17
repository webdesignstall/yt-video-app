import { Separator } from "@/components/ui/separator";
import { PaymentForm } from "@/app/dashboard/payment/payment-form";

export default function SettingsPaymentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Payment</h3>
        <p className="text-sm text-muted-foreground">
          Payment information for subscriptions use.
        </p>
      </div>
      <Separator />
      <PaymentForm />
    </div>
  );
}
