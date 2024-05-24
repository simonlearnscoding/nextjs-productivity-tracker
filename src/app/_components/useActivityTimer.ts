
import { useState, useEffect, useRef } from 'react';
import { api } from '~/trpc/react';
import { useUserStore } from './../store/user';

export const useActivityTimer = (act: any, session: any) => {
  const ctx = api.useUtils();
  const { userId } = useUserStore();
  const [time, setTime] = useState<number>(0);
  const intervalRef = useRef<any>(null);

  const { mutate: startSession } = api.session.startSession.useMutation({
    onSuccess: () => {
      ctx.session.getUserActiveSession.invalidate();
      ctx.activity.getUserActivityWeekView.invalidate();
      startInterval();
    }
  });

  const { mutate: stopSession } = api.session.stopSession.useMutation({
    onSuccess: () => {
      ctx.activity.getUserActivityWeekView.invalidate();
      ctx.session.getUserActiveSession.invalidate();
      clearInterval(intervalRef.current);
    }
  });

  useEffect(() => {
    setTime(act.todayDuration.duration);
  }, [act.todayDuration.duration]);

  const isActivityRunning = () => {
    if (!session) return false;
    if (session.sessionPartialType !== 'WORK') return false;
    if (session.activityId === act.activityId) return true;
    return false;
  };

  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  };

  useEffect(() => {
    if (isActivityRunning()) {
      startInterval();
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [session]);

  const handleStartStop = () => {
    if (isActivityRunning()) {
      stopSession({ userId });
    } else {
      startSession({ userId, activityId: act.activityId });
    }
  };

  return {
    time,
    isActivityRunning,
    handleStartStop,
  };
};
