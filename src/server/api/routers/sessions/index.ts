import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { startSessionHandler } from './startSessionHandler';
import { pauseOrContinueSessionHandler } from './pauseSessionHandler';
import { stopSessionHandler } from './stopSessionHandler';
import { getUserActiveSessionHandler } from './getUserActiveSessionHandler';

// Define Zod schema for input validation
const startSessionInput = z.object({
  userId: z.string(),
  activityId: z.number(),
});

// Define the TRPC router
export const sessionRouter = createTRPCRouter({
  getUserActiveSession: publicProcedure
    .input(z.object({
      userId: z.string(),
    }))
    .query(async ({ ctx, input }) => getUserActiveSessionHandler(ctx, input)),
  startSession: publicProcedure
    .input(startSessionInput)
    .mutation(async ({ ctx, input }) => startSessionHandler(ctx, input)),
  pauseOrContinueSession: publicProcedure
    .input(z.object({
      userId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => pauseOrContinueSessionHandler(ctx, input)),
  stopSession: publicProcedure
    .input(z.object({
      userId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => stopSessionHandler(ctx, input)),
});

