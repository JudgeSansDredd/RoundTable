import express from "express";
import PrismaClientSingleton from "../prisma/PrismaClientSingleton";
import moviesRouter from "./routes/movies";

const app = express();
const db = PrismaClientSingleton.getInstance();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/movies", moviesRouter);

export default app;
