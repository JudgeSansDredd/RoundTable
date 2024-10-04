-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "genres" JSONB NOT NULL,
    "runTime" INTEGER NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ActorToMovie" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ActorToMovie_AB_unique" ON "_ActorToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_ActorToMovie_B_index" ON "_ActorToMovie"("B");

-- AddForeignKey
ALTER TABLE "_ActorToMovie" ADD CONSTRAINT "_ActorToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActorToMovie" ADD CONSTRAINT "_ActorToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
