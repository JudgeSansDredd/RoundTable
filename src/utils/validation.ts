import { DateTime } from "luxon";
import { z } from "zod";

export const QueryParamSchema = z
  .object({
    runTimeMax: z.coerce.number(),
    runTimeMin: z.coerce.number().min(0),
    released: z.enum(["true", "false"]).transform((val) => val === "true"),
    releasedAfter: z
      .string()
      .datetime()
      .transform((val) => DateTime.fromISO(val)),
    actors: z.enum(["true", "false"]).transform((val) => val === "true"),
  })
  .partial();

export const ActorSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

export const MovieSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  genres: z.array(z.string()),
  runTime: z.number(),
  releaseDate: z.date().transform((val) => DateTime.fromJSDate(val)),
});

export const MovieWithActorSchema = MovieSchema.extend({
  actors: z.array(ActorSchema),
});
