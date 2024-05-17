
import { durationAndDate, WeekDates, getActivityWeekViewResponse } from '~/types';


export async function getActivityWeekView(ctx, input): Promise<getActivityWeekViewResponse[]> {
  const userActivities = await ctx.db.userActivity.findMany({
    where: {
      userId: input.userId,
    },
  });
  const results = await Promise.all(userActivities.map(activity => getActivityWeekViewSingle(ctx, activity)));
  return results;
}

export async function getActivityWeekViewSingle(ctx, userActivity): Promise<getActivityWeekViewResponse> {
  const weekdays = getWeekAsObject();
  let weekView: durationAndDate[] = [];


  let todayDuration: durationAndDate | null = null;
  const todayDate = new Date().toISOString().split('T')[0];

  for (const day in weekdays) {
    const duration = await getDurationOfDate(ctx, weekdays[day], userActivity, userActivity.userId);
    const dayObj = {
      weekDay: day,
      day: weekdays[day],
      duration: duration,
    };
    weekView.push(dayObj);

    // Check if this day is today
    if (weekdays[day].toISOString().split('T')[0] === todayDate) {
      todayDuration = dayObj;
    }
  }

  const activity = await ctx.db.activity.findUnique({
    where: {
      id: userActivity.activityId,
    },
  });

  // TODO: replace totalDuration with the actual day duration
  return {
    activityId: userActivity.activityId,
    activityName: activity.name,
    todayDuration: todayDuration,
    weekView: weekView,
  };
}



export async function getDurationOfDate(ctx, date, activity, userId) {
  const daylog = await ctx.db.daylog.findFirst({
    where: {
      date: date.toISOString().split('T')[0],
      userId: userId,
      activityId: activity.activityId,
    },
  });
  if (!daylog) return 0;
  return daylog.totalDuration;
}


export function getWeekAsObject(): WeekDates {
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)

  // Calculate the start of the week (assuming the week starts on Monday)
  const startOfWeek = new Date(currentDate);
  const dayAdjustment = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
  startOfWeek.setDate(currentDate.getDate() + dayAdjustment);

  // Generate an object of dates for the current week (Monday to Sunday)
  const weekDates: WeekDates = {
    mon: new Date(startOfWeek),
    tue: new Date(startOfWeek),
    wed: new Date(startOfWeek),
    thu: new Date(startOfWeek),
    fri: new Date(startOfWeek),
    sat: new Date(startOfWeek),
    sun: new Date(startOfWeek),
  };

  weekDates.tue.setDate(startOfWeek.getDate() + 1);
  weekDates.wed.setDate(startOfWeek.getDate() + 2);
  weekDates.thu.setDate(startOfWeek.getDate() + 3);
  weekDates.fri.setDate(startOfWeek.getDate() + 4);
  weekDates.sat.setDate(startOfWeek.getDate() + 5);
  weekDates.sun.setDate(startOfWeek.getDate() + 6);

  return weekDates;
}

