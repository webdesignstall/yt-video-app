import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  filename: z.string(),
  duration: z.string(),
  thumbnail: z.string(),
  created: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
