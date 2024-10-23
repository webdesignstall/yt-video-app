"use client"
// import { promises as fs } from "fs";
// import path from "path";
// import { Metadata } from "next";
// import { z } from "zod";

// import { publicVideoSchema } from "../data/schema"
import { columns } from "./columns";
import { DataTable } from "./data-table";

/*export const metadata: Metadata = {
  title: "Public Video",
  description: "Manage your Public Video.",
};*/

// Simulate a database read for tasks.
/*async function getTasks() {
 /!* const data = await fs.readFile(
    path.join(process.cwd(), "app/channel/dashboard/data/public_video.json"),
  );*!/

  // const tasks = JSON.parse(data.toString());
  const tasks = [];

  return z.array(publicVideoSchema).parse(tasks);
}*/

export function PublicVideoItems({data}: {data: any}) {
  // const tasks = await getTasks();
  const tasks: any = [];

  return (
    <>
      <DataTable data={data} columns={columns} />
    </>
  );
}

export default function PublicVideos({data}: {data: any}) {
  return (
    <>
      <div className="w-full">
        <PublicVideoItems data={data}/>
      </div>
    </>
  );
}
