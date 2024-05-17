export async function stopSessionHandler(ctx: any, input: { userId: string; }) {
  // Stop the active session partial by setting isActive to false and ending it
  const updatedPartial = await ctx.db.sessionPartial.updateMany({
    where: {
      isActive: true,
      userId: input.userId,
    },
    data: {
      isActive: false,
      end: new Date(),
    },
  });


  // Get the currently active session
  const activeSession = await ctx.db.session.findFirst({
    where: {
      userId: input.userId,
      isActive: true,
    },
  });

  if (!activeSession) {
    throw new Error('No active session found');
  }


  // Get all the partials for the session where type is WORK
  const activeSessionPartials = await ctx.db.sessionPartial.findMany({
    where: {
      sessionId: activeSession.id,
      type: "WORK",
    },
  });


  const totalDuration = getTotalDuration(activeSessionPartials);


  await endSessionAndIncrementTotalDuration({
    sessionId: activeSession.id,
    totalDuration,
    ctx,
  });

  await incrementDaylogDuration({
    userId: input.userId,
    totalDuration,
    activityId: activeSession.activityId,
    ctx,
  });

  return activeSession;
}

type endSessionIncrementDuration = {
  sessionId: number;
  totalDuration: number;
  ctx: any;
};

async function endSessionAndIncrementTotalDuration({ sessionId, totalDuration, ctx }: endSessionIncrementDuration) {
  return ctx.db.session.update({
    where: {
      id: sessionId,
    },
    data: {
      totalDuration: {
        increment: totalDuration,
      },
      isActive: false,
      end: new Date(),
    },
  });
}

type incrementDaylog = {
  userId: string;
  totalDuration: number;
  activityId: number;
  ctx: any;
};

async function incrementDaylogDuration({ ctx, userId, totalDuration, activityId }: incrementDaylog) {
  return ctx.db.daylog.upsert({
    where: {
      date_userId_activityId_unique: {
        date: new Date().toISOString().split('T')[0],
        userId: userId,
        activityId: activityId,
      },
    },
    create: {
      date: new Date().toISOString().split('T')[0],
      userId: userId,
      activityId: activityId,
      totalDuration,
    },
    update: {
      totalDuration: {
        increment: totalDuration,
      },
    },
  });
}

function getTotalDuration(activeSessionPartials) {
  let totalDuration = 0;
  activeSessionPartials.forEach((partial) => {
    if (partial.end && partial.start) {
      totalDuration += (partial.end.getTime() - partial.start.getTime()) / 1000;
    }
  });
  return totalDuration;

}
