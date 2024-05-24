
import { activeSessionResponse } from '~/types';
export async function getUserActiveSessionHandler(ctx: any, input: { userId: string; }): Promise<activeSessionResponse> {
  const session = await ctx.db.session.findFirst({
    where: {
      userId: input.userId,
      isActive: true,
    },
  });
  console.log('session', session);
  // if no active session, return null
  if (!session) return null;

  console.log('before error')
  const sessionPartial = await ctx.db.sessionPartial.findFirst({
    where: {
      sessionId: session.id,
      isActive: true,
    },
  });
  console.log('after error')
  console.log('sessionPartial', sessionPartial)
  // get the activity name
  const activity = await ctx.db.activity.findUnique({
    where: {
      id: session.activityId,
    },
  });
  console.log('activity', activity)
  return {
    activityName: activity.name,
    activityId: session.activityId,
    pretrackedDuration: session.totalDuration,
    sessionStart: session.start,
    sessionPartialStart: sessionPartial.start,
    sessionPartialType: sessionPartial.type,
    sessionTrackingType: session.type,
  };
}

