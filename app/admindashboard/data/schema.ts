import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const publicVideoSchema = z.object({
  name: z.string(),
  description: z.string(),
  filename: z.string(),
});

export type PublicVideo = z.infer<typeof publicVideoSchema>;
