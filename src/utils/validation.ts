import { z } from "zod";

export const QueryParamSchema = z.object({});

export const ActorSchema = z.object({});

export const MovieSchema = z.object({});

export const MovieWithActorSchema = MovieSchema.extend({});
