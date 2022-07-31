import * as trpc from '@trpc/server';
import { z } from 'zod';
import { getCharacterById } from '@/server/requests';

export const appRouter = trpc.router().query('get-character-by-id', {
  input: z.object({ id: z.string() }),
  async resolve({ input }) {
    return await getCharacterById(input.id);
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;
