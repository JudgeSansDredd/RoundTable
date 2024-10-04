import express, { Request, Response } from "express";
import PrismaClientSingleton from "../../prisma/PrismaClientSingleton";

const router = express.Router();
const db = PrismaClientSingleton.getInstance();

// All routes in this file will be prefixed with /movies
router.get("/", async (req: Request, res: Response) => {
  const movies = await db.movie.findMany();

  res.json(movies);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const movie = await db.movie.findUnique({
    where: { id },
    include: { actors: true },
  });

  if (!movie) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }

  res.json(movie);
});

router.get("/:id/genres", async (req: Request, res: Response) => {
  const { id } = req.params;
  const movie = await db.movie.findUnique({
    where: { id },
    include: { actors: true },
  });

  if (!movie) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }

  const genres = movie.genres.map((genre) => genre.toLowerCase());

  res.json(genres);
});

export default router;
