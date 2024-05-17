import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { createActivityHandler } from './createActivityHandler'
import { addActivityToUserHandler } from './addActivityToUserHandler'
import { getActivityWeekView } from './getActivityWeekView';

export const activityRouter = createTRPCRouter({


  getUserActivityWeekView: publicProcedure
    .input(z.object({
      userId: z.string()
    }))
    .query(async ({ ctx, input }) => getActivityWeekView(ctx, input)),

  createActivity: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => createActivityHandler(ctx, input)),

  addActivityToUser: publicProcedure
    .input(z.object({
      userId: z.string(),
      activityId: z.number(),
    }))
    .mutation(({ ctx, input }) => addActivityToUserHandler(ctx, input)),

  getAllActivities: publicProcedure
    .query(({ ctx }) => ctx.db.activity.findMany()),

  getAllUserActivities: publicProcedure
    .input(z.object({
      userId: z.string()
    }))
    .query(({ ctx, input }) => ctx.db.userActivity.findMany({
      where: {
        userId: input.userId,
      },
    })),

})    
