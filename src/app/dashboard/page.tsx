'use client';
import useAutoAddActivities from './useAutoAddActivities';
import Timer from '../_components/Timer';
import { useEffect, useState } from 'react';
import Activities from '../_components/Activities';
import { api } from '~/trpc/react'; // Ensure this is your client-side TRPC instance
import { useUser } from '@clerk/clerk-react';
import UserHeader from '../_components/UserHeader';
import timerStore from '~/app/store/CurrentTimer';
import { useUserStore } from './../store/user';

export default function Home() {

  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  // const userStore = useUserStore()
  const { userId, setUserId } = useUserStore()

  useEffect(() => {
    if (user) {
      setUserId(user.id);
      setLoading(false);
      console.log('User ID set:', user.id);
    }
  }, [user]);

  // TODO: Refactor this to use it in the backend
  // What am I even getting them for here?
  const { data: activities, isLoading: isLoadingActivities } = api.activity.getAllUserActivities.useQuery(
    { userId: userId ?? '' },
    {
      enabled: !!userId,
    }
  );
  // oh yeah thats why maybe Ill make users just add them right away

  // Auto-add activities if none exist
  const { isLoading: isLoadingAutoAdd } = useAutoAddActivities(userId, activities);
  const userActivities = activities ?? [];
  // ──────────────────────────────────────────────────────────────────────
  // 
  // Fetch active session
  const { data: activeSessionData, isLoading: isLoadingActiveSession } = api.session.getUserActiveSession.useQuery(
    { userId: userId ?? '' },
    {
      enabled: !!userId,
    }
  );

  // ──────────────────────────────────────────────────────────────────────
  const { data: userActivityWeekView, isLoading: isActLoading } = api.activity.getUserActivityWeekView.useQuery(
    { userId: userId ?? '' },
    {
      enabled: !!userId,
    }
  )





  // Combined loading state
  // TODO: use Suspense if possible
  const isLoading = loading || isLoadingActivities || isLoadingActiveSession || isLoadingAutoAdd || isActLoading;


  return (
    <div className="h-screen w-screen bg-slate-800 overflow-hidden">
      <UserHeader />
      <div className="flex items-start w-full h-full justify-start sm:px-8 px-4 gap-8 grow-1 md:pt-16">
        <div className="bg-slate-900 rounded-md h-5/6 hidden md:flex w-full"></div>
        <div className="flex h-5/6 w-full flex-col items-start justify-start">
          {isLoading ? (
            <LoadingState />) : (
            <>
              <Timer />
              <Activities userActivityWeekView={userActivityWeekView} session={activeSessionData} />
            </>
          )}
        </div>
      </div>
    </div >
  );
}

function LoadingState() {
  return <div>Loading...</div> // You can replace this with a loading spinner or skeleton
}
