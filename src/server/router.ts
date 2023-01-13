import { z } from 'zod';
import * as trpc from '@trpc/server';
import prisma from '@/server/prisma';

export const appRouter = trpc
  .router()
  .query('preconnect', {
    async resolve() {
      await prisma.$connect();
    },
  })
  .query('get-character-by-id', {
    input: z.object({ id: z.string() }),
    async resolve({ input }) {
      const id = parseInt(input.id);
      const result = await prisma.character.findFirst({ where: { id } });
      return { success: true, character: result };
    },
  })
  .mutation('send-vote', {
    input: z.object({ voteFor: z.string(), voteAgainst: z.string() }),
    async resolve({ input }) {
      const votedForId = parseInt(input.voteFor);
      const votedAgainstId = parseInt(input.voteAgainst);
      const result = await prisma.vote.create({ data: { votedForId, votedAgainstId } });
      return { success: true, vote: result };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
