"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Task>[] = [
  //{
  //  id: "select",
  //  header: ({ table }) => (
  //    <Checkbox
  //      checked={
  //        table.getIsAllPageRowsSelected() ||
  //        (table.getIsSomePageRowsSelected() && "indeterminate")
  //      }
  //      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //      aria-label="Select all"
  //      className="translate-y-[2px]"
  //    />
  //  ),
  //  cell: ({ row }) => (
  //    <Checkbox
  //      checked={row.getIsSelected()}
  //      onCheckedChange={(value) => row.toggleSelected(!!value)}
  //      aria-label="Select row"
  //      className="translate-y-[2px]"
  //    />
  //  ),
  //  enableSorting: false,
  //  enableHiding: false,
  //},
  {
    accessorKey: "thumbnail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thumbnail" />
    ),
    cell: ({ row }) => (
      <div className="w-fit">
        <Image
          src={row.getValue("thumbnail")}
          alt={row.getValue("filename")}
          width={150}
          height={150}
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("id")}</div>,
    enableHiding: false,
  },
  {
    accessorKey: "filename",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Filename" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("filename")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("duration")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  //{
  //  accessorKey: "title",
  //  header: ({ column }) => (
  //    <DataTableColumnHeader column={column} title="Title" />
  //  ),
  //  cell: ({ row }) => {
  //    const label = labels.find((label) => label.value === row.original.label)
  //
  //    return (
  //      <div className="flex space-x-2">
  //        {label && <Badge variant="outline">{label.label}</Badge>}
  //        <span className="max-w-[500px] truncate font-medium">
  //          {row.getValue("title")}
  //        </span>
  //      </div>
  //    )
  //  },
  //},
  //{
  //  accessorKey: "status",
  //  header: ({ column }) => (
  //    <DataTableColumnHeader column={column} title="Status" />
  //  ),
  //  cell: ({ row }) => {
  //    const status = statuses.find(
  //      (status) => status.value === row.getValue("status"),
  //    );
  //
  //    if (!status) {
  //      return null;
  //    }
  //
  //    return (
  //      <Badge
  //        className="flex w-fit items-center justify-center"
  //        variant={status.variant.toLowerCase() as any}
  //      >
  //        {status.label}
  //      </Badge>
  //    );
  //  },
  //  filterFn: (row, id, value) => {
  //    return value.includes(row.getValue(id));
  //  },
  //},
  //{
  //  accessorKey: "auto_renew",
  //  header: ({ column }) => (
  //    <DataTableColumnHeader column={column} title="Auto Renew" />
  //  ),
  //  cell: ({ row }) => {
  //    return (
  //      <div className="w-fit">{row.getValue("auto_renew") ? "Yes" : "No"}</div>
  //    );
  //  },
  //},
  {
    accessorKey: "created",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const expiresAt = new Date(row.getValue("created"));
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
  //{
  //  accessorKey: "remaining",
  //  header: ({ column }) => (
  //    <DataTableColumnHeader column={column} title="Remaining Time" />
  //  ),
  //  cell: ({ row }) => {
  //    const expiresAt = new Date(row.getValue("expires_at")).getTime();
  //    const currentTime = new Date().getTime();
  //    const remainingTime = expiresAt - currentTime;
  //
  //    let formattedRemainingTime;
  //
  //    if (remainingTime > 0) {
  //      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  //      const hours = Math.floor(
  //        (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  //      );
  //
  //      if (days > 0 || hours > 0) {
  //        formattedRemainingTime = `${days}d ${hours}h`;
  //      } else {
  //        formattedRemainingTime = "< 1 hour";
  //      }
  //    } else {
  //      formattedRemainingTime = "N/A";
  //    }
  //
  //    return <div className="w-fit">{formattedRemainingTime}</div>;
  //  },
  //},
  //{
  //  accessorKey: "priority",
  //  header: ({ column }) => (
  //    <DataTableColumnHeader column={column} title="Expires At" />
  //  ),
  //  cell: ({ row }) => {
  //    const priority = priorities.find(
  //      (priority) => priority.value === row.getValue("priority")
  //    )
  //
  //    if (!priority) {
  //      return null
  //    }
  //
  //    return (
  //      <div className="flex items-center">
  //        {priority.icon && (
  //          <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //        )}
  //        <span>{priority.label}</span>
  //      </div>
  //    )
  //  },
  //  filterFn: (row, id, value) => {
  //    return value.includes(row.getValue(id))
  //  },
  //},
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
  {
    id: "delete",
    cell: ({ row }) => (
      <button
        onClick={() => {
          console.log("Delete", row.getValue("id"));
        }}
        className="text-red-500 hover:underline"
      >
        Delete
      </button>
    ),
  },
];
