export async function createActivityHandler(ctx, input) {
  try {
    // Check if an activity with the same name already exists
    const existingActivity = await ctx.db.activity.findUnique({
      where: { name: input.name },
    });

    // If the activity already exists, return a message or the existing activity
    if (existingActivity) {
      return { message: 'Activity already exists', activity: existingActivity };
    }

    // If the activity does not exist, create it
    const newActivity = await ctx.db.activity.create({
      data: { name: input.name },
    });
    return { message: 'Activity created successfully', activity: newActivity };
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error creating activity:', error);

    // Determine error type and respond appropriately
    if (error instanceof ctx.db.Prisma.PrismaClientKnownRequestError) {
      // Handle known request errors from Prisma
      if (error.code === 'P2002') {
        return { error: 'An activity with this name already exists.' };
      }
    } else if (error.name === 'ConnectionError') {
      // Handle connection errors specifically
      return { error: 'Failed to connect to the database.' };
    }

    // Generic error fallback
    return { error: 'An unexpected error occurred.' };
  }
}

