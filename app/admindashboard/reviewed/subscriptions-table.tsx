import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { taskSchema } from "./data/schema";

export const metadata: Metadata = {
  title: "Subscriptions",
  description: "List of your subscriptions and their status.",
};

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/dashboard/subscriptions/data/subs.json"),
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export async function SubscriptionsTable() {
  const tasks = await getTasks();

  return (
    <>
      <DataTable data={tasks} columns={columns} />
    </>
  );
}
