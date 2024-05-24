'use client'
import { useUserStore } from './../store/user';
import { useState, useEffect, useRef } from 'react';
import PlayIcon from './PlayIcon';
import timerStore from './../store/CurrentTimer';
import { api } from '~/trpc/react';
// import { calculateActivityTime } from '../../utils/calculateActivityTime';
import { useActivityTimer } from './useActivityTimer';

type weekView = {
  day: string;
  duration: number;
  weekday: string;
};

export type activityType = {
  activityName: string;
  activityId: number;
  time: number;
  weekView: weekView[];
  todayDuration: weekView;
};

enum SessionPartialType {
  WORK,
  BREAK,
}

import { RouterOutputs } from '~/server/api/trpc';
type session = RouterOutputs['session']['getUserActiveSession'];

function ActivityNew({ act, session }: { act: activityType; session: session }) {
  // TODO: only if the session is active
  //
  const [time, setTime] = useState(() => calculateTheTime());
  const [isRunning, setIsRunning] = useState<boolean>(() => isActivityRunning());
  const [startTime, setStartTime] = useState((session?.sessionPartialStart && isRunning) ? session?.sessionPartialStart : null);

  function calculateTheTime() { setTimeWithDiff(act.todayDuration.duration, session?.sessionPartialStart); }

  const ctx = api.useUtils();
  const { userId } = useUserStore();
  const { mutate: startSession } = api.session.startSession.useMutation({
    onSuccess: () => {
      ctx.session.getUserActiveSession.invalidate();
      ctx.activity.getUserActivityWeekView.invalidate();
    },
  });

  const { mutate: stopSession } = api.session.stopSession.useMutation({
    onSuccess: () => {
      ctx.activity.getUserActivityWeekView.invalidate();
      ctx.session.getUserActiveSession.invalidate();
      // clearInterval(intervalRef.current);
    },
  });


  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        const newTime = calculateTheTime();
        console.log(newTime);
        setTime(newTime);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const onClick = () => {
    if (isRunning) {
      // stopSession({ userId });
    } else {
      setStartTime(new Date());
      // startSession({ userId, activityId: act.activityId });
    }
    setIsRunning(!isRunning);
  };

  function isActivityRunning(): boolean {
    if (!session) return false;
    if (session.sessionPartialType !== "WORK") return false;
    if (session.activityId === act.activityId) return true;
    return false;
  }

  function setTimeWithDiff(totalDay: number, startedTime: Date | undefined): number {
    console.log(totalDay, startedTime)
    if (!startedTime) {
      return totalDay;
    }
    if (!isActivityRunning()) {
      return totalDay;
    } else {
      const now = new Date();
      const diff = now.getTime() - new Date(startedTime).getTime();
      return totalDay + diff;
    }
  }

  return (
    <div
      onClick={onClick}
      className={`transition:all hover:border-gray-400 border-gray-800 pb-2 text-gray-300 flex items-start w-full my-2 cursor-pointer justify-start rounded-xl border-2 pt-3 text-2xl font-semibold transition-all ${isRunning ? 'bg-gray-900 border-gray-300' : 'bg-gray-700'
        }`}
    >
      <div className="flex text-2xl font-light flex-col mr-auto ml-3">
        <div className="pb-3">{act.activityName}</div>
        <div className="flex mt-3">
          <DayCounter week={act.weekView} />
        </div>
      </div>
      <div className="flex flex-col font-light h-full mr-3">
        <CalculatedTime time={time} />
        <div className="mx-auto mt-auto"></div>
      </div>
    </div>
  );
}

function CalculatedTime({ time }: { time: number }) {
  return <span>{timeIntoString(time)}</span>;
}

function DayCounter({ week }: { week: weekView[] }) {
  return week.map(({ day, duration }) => (
    <div key={day} className={`rounded-full ${duration > 0 ? 'bg-gray-200' : 'bg-gray-600'} mr-1 w-3 h-3`}></div>
  ));
}

function timeIntoString(timeInSeconds: number): string {
  const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
  const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export default ActivityNew;
