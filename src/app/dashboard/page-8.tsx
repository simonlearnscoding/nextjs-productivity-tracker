// this should create a 6 second session with pause inbetween
'use client';
import Timer from '../_components/Timer'
import { useEffect, useState } from 'react';
import Activities from '../_components/Activities'
import { api } from "~/trpc/react"; // Ensure this is your client-side TRPC instance
import { useUser } from '@clerk/clerk-react';
import UserHeader from '../_components/UserHeader'

export default function Home() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  // Use useMutation hook for starting a session
  const startSessionMutation = api.session.startSession.useMutation();
  const pauseSessionMutation = api.session.pauseOrContinueSession.useMutation();
  const stopSessionMutation = api.session.stopSession.useMutation();

  useEffect(() => {
    const startSession = async () => {
      if (!user) return;

      const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

      try {
        await startSessionMutation.mutateAsync({
          userId: user.id,
          activityId: 1,
        });

        await delay(3000); // 1 second delay

        await pauseSessionMutation.mutateAsync({
          userId: user.id,
        });

        await delay(2000); // 1 second delay

        await pauseSessionMutation.mutateAsync({
          userId: user.id,
        });

        await delay(3000); // 1 second delay

        await stopSessionMutation.mutateAsync({
          userId: user.id,
        });

        setLoading(false);
      } catch (error) {
        console.error('Failed to start session:', error);
      }
    };

    startSession();
  }, [user]);

  if (!user || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen bg-slate-800 overflow-hidden">
      <UserHeader />
      <div className="flex items-start w-full h-full justify-start sm:px-8 px-4 gap-8 grow-1 md:pt-16">
        <div className="bg-slate-900 rounded-md h-5/6 hidden md:flex w-full "></div>
        <div className="flex h-5/6 w-full flex-col items-start justify-start">
          <Timer />
          <Activities />
        </div>
      </div>
    </div>
  );
}
