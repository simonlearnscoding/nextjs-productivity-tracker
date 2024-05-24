'use client';
import useAutoAddActivities from './useAutoAddActivities';
import Timer from '../_components/Timer';
import { useEffect, useState } from 'react';
import Activities from '../_components/Activities';
import { api } from '~/trpc/react'; // Ensure this is your client-side TRPC instance
import { useUser } from '@clerk/clerk-react';
import UserHeader from '../_components/UserHeader';
import AddAnActivityButton from './_components/AddAnActivityButton';
// import timerStore from '~/app/store/CurrentTimer';
import { useUserStore } from './../store/user';

const ActivityItems = [
  'Workout',
  'Study',
  'Work',
  'Meditation',
  'Reading',
  'Writing',
]
function createAllActivities() {
  const { mutate: createActivity } = api.activity.createActivity.useMutation()
  ActivityItems.map((activity) => {
    createActivity({ name: activity })
  })
}

export default function Home() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const { userId, setUserId } = useUserStore()

  useEffect(() => {
    if (user) {
      setUserId(user.id);
      setLoading(false);
    }
  }, [user]);

  // TODO: Refactor this to use it in the backend
  // What am I even getting them for here?
  // TODO: it seems there is alot of rerendering going on here 
  const { data: userActivities, isLoading: isLoadingActivities } = api.activity.getAllUserActivities.useQuery(
    { userId: userId ?? '' },
    {
      enabled: !!userId,
    }
  );
  // ──────────────────────────────────────────────────────────────────────
  // 
  // Fetch active session
  const { data: activeSessionData, isLoading: isLoadingActiveSession } = api.session.getUserActiveSession.useQuery(
    { userId: userId ?? '' },
    {
      enabled: !!userId,
    }
  );

  const { data: allActivities, isLoading: isAllActivitiesLoading } = api.activity.getAllActivities.useQuery()

  // ──────────────────────────────────────────────────────────────────────
  const { data: userActivityWeekView, isLoading: isActLoading } = api.activity.getUserActivityWeekView.useQuery(
    { userId: userId ?? '' },
    {
      enabled: !!userId,
    }
  )





  // Combined loading state
  // TODO: use Suspense if possible
  const isLoading = loading || isLoadingActivities || isLoadingActiveSession || isActLoading || isAllActivitiesLoading


  return (
    <div className="h-screen w-screen bg-slate-800 overflow-hidden">
      <UserHeader />
      <div className="flex items-start w-full h-full justify-start sm:px-8 px-4 gap-8 grow-1 md:pt-16">
        <div className="bg-slate-900 rounded-md h-5/6 hidden md:flex w-full"></div>
        <Content />
      </div>
    </div >
  );

  function Content({ }) {
    return (
      <div className="flex h-5/6 w-full flex-col items-start justify-start">
        {isLoading ? (
          <LoadingState />) : (
          <>
            <Timer session={activeSessionData} userActivityWeekView={userActivityWeekView} />
            <Activities userActivityWeekView={userActivityWeekView} session={activeSessionData} />
          </>
        )}
        <div className="relative bottom-0 right-10 ml-auto">
          <AddAnActivityButton allActivities={allActivities || []} userActivities={userActivities || []} />
        </div>

      </div>
    )
  }
}

function LoadingState() {
  return <div>Loading...</div> // You can replace this with a loading spinner or skeleton
}
