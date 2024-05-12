import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({ name: z.string(), email: z.string(), password: z.string() })
    )
    .mutation(({ ctx, input }) => createUserIfNotExist(ctx, input)),
})

async function createUserIfNotExist() {}
