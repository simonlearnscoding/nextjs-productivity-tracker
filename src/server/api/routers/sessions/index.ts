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
    .mutation(({ ctx, input }) => startSessionHandler(ctx, input)),
});

// Define the handler function
function startSessionHandler(ctx: any, input) {
  // TODO: Test

  const { userId, activityId } = input;
  const session = ctx.db.session.create({
    data: {
      start: new Date(),
      userId,
      activityId,
      type: 'TRACKING'
    }
  })
  const sessionPartial = ctx.db.sessionPartial.create({
    start: new Date(),
    userId,
    activityId,
    sessionId: session.id
  })
  return { session, sessionPartial };
}
