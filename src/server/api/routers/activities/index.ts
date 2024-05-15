import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { createActivityHandler } from './createActivityHandler'
import { addActivityToUserHandler } from './addActivityToUserHandler';

export const activityRouter = createTRPCRouter({
  createActivity: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => createActivityHandler(ctx, input)),
  addActivityToUser: publicProcedure
    .input(z.object({ userId: z.string(), activityId: z.string() }))
    .mutation(({ ctx, input }) => addActivityToUserHandler(ctx, input)),
})




