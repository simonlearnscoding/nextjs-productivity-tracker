export type WeekDates = {
  mon: Date;
  tue: Date;
  wed: Date;
  thu: Date;
  fri: Date;
  sat: Date;
  sun: Date;
};
export type getActivityWeekViewResponse = {
  activityId: number;
  activityName: string;
  todayDuration: durationAndDate | null;
  weekView: durationAndDate[];
}


export type durationAndDate = {
  weekDay: string;
  day: Date;
  duration: number;
}
