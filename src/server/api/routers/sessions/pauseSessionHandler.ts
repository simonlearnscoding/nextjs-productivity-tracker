export async function pauseOrContinueSessionHandler(ctx: any, input: { userId: string }) {
  // Find the active session partial
  const activePartial = await ctx.db.sessionPartial.findFirst({
    where: {
      userId: input.userId,
      isActive: true,
    },
  });


  if (!activePartial) {
    throw new Error('No active session partial found');
  }
  let type = "BREAK"
  if (activePartial.type == "BREAK") {
    type = "WORK"
  }

  // Update the active session partial
  const updatedPartial = await ctx.db.sessionPartial.update({
    where: {
      id: activePartial.id,
    },
    data: {
      isActive: false,
      end: new Date(),
    },
  });

  // Create a new session partial
  const newPartial = await ctx.db.sessionPartial.create({
    data: {
      activityId: activePartial.activityId,
      userId: input.userId,
      type: type,
      sessionId: activePartial.sessionId,
      start: new Date(),
      isActive: true,
    },
  });
  return { updatedPartial, newPartial };
}
