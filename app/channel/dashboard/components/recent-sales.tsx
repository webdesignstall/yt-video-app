export function RecentSales({data}: {data: any}) {
  return (
    <div className="space-y-8">
        {
            data?.map((item: any) =>
                (
                    <>
                        <div className="flex items-center">
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">{item?.username}</p>
                                <p className="text-sm text-muted-foreground">{item?.type}</p>
                            </div>
                            <div className="ml-auto font-medium">{item?.amount}</div>
                        </div>
                    </>
                )
            )
        }


        {/*<div className="flex items-center">
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">@jacksonlee</p>
          <p className="text-sm text-muted-foreground">Renewal</p>
        </div>
        <div className="ml-auto font-medium">+$39.00</div>
      </div>
      <div className="flex items-center">
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">@isabellanguyen</p>
          <p className="text-sm text-muted-foreground">New Subscribers</p>
        </div>
        <div className="ml-auto font-medium">+$299.00</div>
      </div>
      <div className="flex items-center">
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">@williamkim</p>
          <p className="text-sm text-muted-foreground">New Subscribers</p>
        </div>
        <div className="ml-auto font-medium">+$99.00</div>
      </div>
      <div className="flex items-center">
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">@sofiadavis</p>
          <p className="text-sm text-muted-foreground">Renewal</p>
        </div>
        <div className="ml-auto font-medium">+$39.00</div>
      </div>*/}
    </div>
  );
}
