import { faker } from "@faker-js/faker";
import PrismaClientSingleton from "../PrismaClientSingleton";

const db = PrismaClientSingleton.getInstance();

async function main() {
  // Create 10 actors
  const actorData = Array(100)
    .fill(null)
    .map(() => {
      return { name: faker.person.fullName() };
    });
  await db.actor.createMany({ data: actorData });
  const actorIds = await db.actor.findMany({ select: { id: true } });

  const movieData = Array(100)
    .fill(null)
    .map(() => {
      return {
        name: faker.lorem.words(3),
        genres: faker.helpers.arrayElements(
          ["Action", "Comedy", "Drama", "Horror", "Romance", "Thriller"],
          faker.number.int({ min: 1, max: 2 })
        ),
        runTime: faker.number.int({ min: 90, max: 180 }),
        actors: {
          connect: faker.helpers.arrayElements(
            actorIds,
            faker.number.int({ min: 1, max: 3 })
          ),
        },
        releaseDate: faker.date.past(),
      };
    });
  movieData.forEach(async (movie) => {
    await db.movie.create({ data: movie });
  });
}

main();
