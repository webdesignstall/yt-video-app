"use client";

import { ColumnDef } from "@tanstack/react-table";

//import { Checkbox } from "@/components/ui/checkbox";

import { statuses } from "../data/data";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("id")}</div>,
    enableHiding: false,
  },
  {
    accessorKey: "channel_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Channel" />
    ),
    cell: ({ row }) => (
      <div className="w-fit">{row.getValue("channel_name")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <Badge
          className="flex w-fit items-center justify-center"
          variant={status.variant.toLowerCase() as any}
        >
          {status.label}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "auto_renew",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Auto Renew" />
    ),
    cell: ({ row }) => {
      const renew = row.getValue("auto_renew");
      return (
        <div className="w-fit">
          <Badge
            className={cn(
              "flex w-fit items-center justify-center",
              renew ? "bg-green-500" : "bg-red-500",
            )}
          >
            {renew ? "Yes" : "No"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "expires_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expires At" />
    ),
    cell: ({ row }) => {
      const expiresAt = new Date(row.getValue("expires_at"));
      const formattedDate = expiresAt.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      return <div className="w-fit">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "remaining",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Remaining Time" />
    ),
    cell: ({ row }) => {
      const expiresAt = new Date(row.getValue("expires_at")).getTime();
      const currentTime = new Date().getTime();
      const remainingTime = expiresAt - currentTime;

      let formattedRemainingTime;

      if (remainingTime > 0) {
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );

        if (days > 0 || hours > 0) {
          formattedRemainingTime = `${days}d ${hours}h`;
        } else {
          formattedRemainingTime = "< 1 hour";
        }
      } else {
        formattedRemainingTime = "N/A";
      }

      return <div className="w-fit">{formattedRemainingTime}</div>;
    },
  },
  {
    id: "detail",
    cell: ({ row }) => {
      const formData = {
        is_post_content: true,
        is_have_following: false,
        number_non_paying_followers: 100,
        kind_of_content: "Blog",
        is_category_a_content: true,
        is_add_bank_detail: true,
        is_add_card_detail: false,
        bank_details: {
          name: "John Doe",
          address: "123 Main St",
          city: "Anytown",
          country: "USA",
          bank_name: "Bank of America",
          bank_iban: "US123456789",
          bank_bic: "BOFAUS3N",
        },
        card_details: {
          number: "4111111111111111",
          holder: "John Doe",
          expiry: "12/25",
          cvc: "123",
          type: "visa",
        },
      };
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Detail</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader className="mb-4">
              <DialogTitle>{row.getValue("channel_name")} Form</DialogTitle>
            </DialogHeader>
            <div className="space-y-8">
              <div className="grid gap-3">
                <Label htmlFor="is_post_content">Post Content</Label>
                <Input
                  id="is_post_content"
                  type="text"
                  value={formData.is_post_content ? "Yes" : "No"}
                  readOnly
                />

                <Label htmlFor="is_have_following">Have Following</Label>
                <Input
                  id="is_have_following"
                  type="text"
                  value={formData.is_have_following ? "Yes" : "No"}
                  readOnly
                />

                <Label htmlFor="number_non_paying_followers">
                  Non-Paying Followers
                </Label>
                <Input
                  id="number_non_paying_followers"
                  type="number"
                  value={formData.number_non_paying_followers}
                  readOnly
                />

                <Label htmlFor="kind_of_content">Content Type</Label>
                <Input
                  id="kind_of_content"
                  type="text"
                  value={formData.kind_of_content}
                  readOnly
                />

                <Label htmlFor="is_category_a_content">
                  Category A Content
                </Label>
                <Input
                  id="is_category_a_content"
                  type="text"
                  value={formData.is_category_a_content ? "Yes" : "No"}
                  readOnly
                />

                <Label htmlFor="is_add_bank_detail">Add Bank Detail</Label>
                <Input
                  id="is_add_bank_detail"
                  type="text"
                  value={formData.is_add_bank_detail ? "Yes" : "No"}
                  readOnly
                />

                {formData.is_add_bank_detail && (
                  <>
                    <Label htmlFor="bank_name">Bank Name</Label>
                    <Input
                      id="bank_name"
                      type="text"
                      value={formData.bank_details.bank_name}
                      readOnly
                    />

                    <Label htmlFor="bank_iban">Bank IBAN</Label>
                    <Input
                      id="bank_iban"
                      type="text"
                      value={formData.bank_details.bank_iban}
                      readOnly
                    />

                    <Label htmlFor="bank_bic">Bank BIC</Label>
                    <Input
                      id="bank_bic"
                      type="text"
                      value={formData.bank_details.bank_bic}
                      readOnly
                    />
                  </>
                )}

                <Label htmlFor="is_add_card_detail">Add Card Detail</Label>
                <Input
                  id="is_add_card_detail"
                  type="text"
                  value={formData.is_add_card_detail ? "Yes" : "No"}
                  readOnly
                />

                {formData.is_add_card_detail && (
                  <>
                    <Label htmlFor="card_number">Card Number</Label>
                    <Input
                      id="card_number"
                      type="text"
                      value={formData.card_details.number}
                      readOnly
                    />

                    <Label htmlFor="card_holder">Card Holder</Label>
                    <Input
                      id="card_holder"
                      type="text"
                      value={formData.card_details.holder}
                      readOnly
                    />

                    <Label htmlFor="card_expiry">Card Expiry</Label>
                    <Input
                      id="card_expiry"
                      type="text"
                      value={formData.card_details.expiry}
                      readOnly
                    />

                    <Label htmlFor="card_type">Card Type</Label>
                    <Input
                      id="card_type"
                      type="text"
                      value={formData.card_details.type}
                      readOnly
                    />
                  </>
                )}
              </div>
            </div>
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button>Approve</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
