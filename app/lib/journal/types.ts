import { z } from "zod";

export const ADJECTIVE = {
  VERY_PLEASANT: "Very Pleasant",
  PLEASANT: "Pleasant",
  NEUTRAL: "Neutral",
  SLIGHTLY_UNPLEASANT: "Slightly Unpleasant",
  UNPLEASANT: "Unpleasant",
  VERY_UNPLEASANT: "Very Unpleasant",
} as const;
export const ALLOWED_ADJECTIVE = z.nativeEnum(ADJECTIVE);
export type Adjective = z.infer<typeof ALLOWED_ADJECTIVE>;
export const Entry = z.object({
  adjective: z.nativeEnum(ADJECTIVE),
  date: z.coerce.date(),
  content: z.string(),
});

export type Entry = z.infer<typeof Entry>;
