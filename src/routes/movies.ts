import express, { Request, Response } from "express";
import { z } from "zod";
import PrismaClientSingleton from "../../prisma/PrismaClientSingleton";
import { MovieSchema, QueryParamSchema } from "../utils/validation";

const router = express.Router();
const db = PrismaClientSingleton.getInstance();

// All routes in this file will be prefixed with /movies
router.get("/", async (req: Request, res: Response) => {
  try {
    const params = QueryParamSchema.parse(req.query);
    const movies = await db.movie.findMany({
      where: {
        runTime: {
          gte: params.runTimeMin,
          lte: params.runTimeMax,
        },
        releaseDate: {
          lte: params.released ? new Date() : undefined,
          gte: params.releasedAfter?.toJSDate(),
        },
      },
      include: {
        actors: params.actors,
      },
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = z.object({ id: z.string().uuid() }).parse(req.params);
    const movie = await db.movie.findUnique({
      where: { id },
      include: { actors: true },
    });

    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id/genres", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const movie = await db.movie.findUnique({
      where: { id },
      include: { actors: true },
    });
    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }
    const movieValidated = MovieSchema.parse(movie);

    const genres = movieValidated.genres.map((genre) => genre.toLowerCase());

    res.json(genres);
    return;
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
