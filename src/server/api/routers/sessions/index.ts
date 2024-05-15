import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

// Define Zod schema for input validation
const startSessionInput = z.object({
  userId: z.string(),
  activityId: z.number(),
});

// Define the TRPC router
export const sessionRouter = createTRPCRouter({
  startSession: publicProcedure
    .input(startSessionInput)
    .mutation(async ({ ctx, input }) => startSessionHandler(ctx, input)),
});

// Define the handler function
async function startSessionHandler(ctx: any, input: { userId: string; activityId: number }) {
  const { userId, activityId } = input;

  // Create the session
  const session = await ctx.db.session.create({
    data: {
      start: new Date(),
      userId,
      activityId,
      type: 'TRACKING',
    },
  });

  // Create the session partial
  const sessionPartial = await ctx.db.sessionPartial.create({
    data: {
      start: new Date(),
      userId,
      activityId,
      type: 'WORK',
      sessionId: session.id
    },
  });

  return { session, sessionPartial };
}
