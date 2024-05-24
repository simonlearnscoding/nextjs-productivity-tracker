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

  removeActivityFromUser: publicProcedure
    .input(z.object({
      userId: z.string(),
      activityId: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.userActivity.deleteMany({
        where: {
          userId: input.userId,
          activityId: input.activityId,
        },
      });
      return true;
    }),
  getAllActivities: publicProcedure
    .query(async ({ ctx }) => {
      const activities = await ctx.db.activity.findMany();
      return activities || [];
    }),

  getAllUserActivities: publicProcedure
    .input(z.object({
      userId: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      const userActivities = await ctx.db.userActivity.findMany({
        where: {
          userId: input.userId,
        },
      });
      return userActivities || [];
    }),
})    
