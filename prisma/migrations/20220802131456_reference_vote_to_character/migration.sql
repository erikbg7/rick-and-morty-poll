/*
  Warnings:

  - You are about to drop the column `voteAgainst` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `voteFor` on the `Vote` table. All the data in the column will be lost.
  - Added the required column `votedAgainstId` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `votedForId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "voteAgainst",
DROP COLUMN "voteFor",
ADD COLUMN     "votedAgainstId" INTEGER NOT NULL,
ADD COLUMN     "votedForId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "spriteUrl" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Vote_votedForId_idx" ON "Vote"("votedForId");

-- CreateIndex
CREATE INDEX "Vote_votedAgainstId_idx" ON "Vote"("votedAgainstId");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_votedForId_fkey" FOREIGN KEY ("votedForId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_votedAgainstId_fkey" FOREIGN KEY ("votedAgainstId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
