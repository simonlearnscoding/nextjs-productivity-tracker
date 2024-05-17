export async function startSessionHandler(ctx: any, input: { userId: string; activityId: number; }) {
  const { userId, activityId } = input;

  // Get the current date in the format YYYY-MM-DD
  const currentDate = new Date().toISOString().split('T')[0];

  // Upsert the daylog entry
  const daylog = await ctx.db.daylog.upsert({
    where: {
      date_userId_activityId_unique: {
        date: currentDate,
        userId: userId,
        activityId: activityId,
      },
    },
    create: {
      date: currentDate,
      userId: userId,
      activityId: activityId,
      totalDuration: 0,  // Initial total duration
    },
    update: {},
  });

  // Create the session
  const session = await ctx.db.session.create({
    data: {
      start: new Date(),
      userId,
      activityId,
      type: 'TRACKING',
      daylogId: daylog.id,  // Link the session to the daylog
    },
  });

  // Create the session partial
  const sessionPartial = await ctx.db.sessionPartial.create({
    data: {
      start: new Date(),
      userId,
      activityId,
      type: 'WORK',
      sessionId: session.id,
    },
  });

  return { session, sessionPartial };
}
