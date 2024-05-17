export async function addActivityToUserHandler(ctx, input) {
  return await ctx.db.userActivity.create({
    data: { userId: input.userId, activityId: input.activityId },
  });
}

