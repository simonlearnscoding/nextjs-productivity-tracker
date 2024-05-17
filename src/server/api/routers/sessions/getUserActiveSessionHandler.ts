
type activeSessionResponse = {
  activityName: string;
  activityId: number;
  pretrackedDuration: number;
  sessionStart: Date;
  sessionPartialStart: Date;
  sessionPartialType: string;
  sessionTrackingType: string;
} | null;
export async function getUserActiveSessionHandler(ctx: any, input: { userId: string; }): Promise<activeSessionResponse> {
  const session = await ctx.db.session.findFirst({
    where: {
      userId: input.userId,
      isActive: true,
    },
  });
  // if no active session, return null
  if (!session) return null;

  const sessionPartial = await ctx.db.sessionPartial.findFirst({
    where: {
      sessionId: session.id,
      isActive: true,
    },
  });
  // get the activity name
  const activity = await ctx.db.activity.findUnique({
    where: {
      id: session.activityId,
    },
  });
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

