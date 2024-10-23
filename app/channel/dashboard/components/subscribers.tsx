import  SubscriptionsTable  from "@/app/dashboard/subscriptions/subscriptions-table";

export function Subscribers({data}: {data: any}) {
  return (
    <div className="w-full">
      <SubscriptionsTable data={data} />
    </div>
  );
}
