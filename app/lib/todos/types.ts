import { z } from "zod";

export const TodoSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  done_date: z.nullable(z.coerce.date()),
});

export type Todo = z.infer<typeof TodoSchema>;

export type TodoInput = Omit<Todo, "id">;
