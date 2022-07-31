import { z } from 'zod';
import * as trpc from '@trpc/server';
import prisma from '@/server/prisma';
import { getCharacterById } from '@/server/requests';

export const appRouter = trpc
  .router()
  .query('get-character-by-id', {
    input: z.object({ id: z.string() }),
    async resolve({ input }) {
      return await getCharacterById(input.id);
    },
  })
  .mutation('send-vote', {
    input: z.object({ voteFor: z.string(), voteAgainst: z.string() }),
    async resolve({ input }) {
      const result = await prisma.vote.create({ data: { ...input } });
      return { success: true, vote: result };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
