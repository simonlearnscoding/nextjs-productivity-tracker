export async function addActivityToUserHandler(ctx, input) {
  // TODO: Test
  return await ctx.db.userActivity.create({
    data: { userId: input.userId, activityId: input.activityId },
  });
}

