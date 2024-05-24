
import { useState, useEffect, useRef } from 'react';
import { api } from '~/trpc/react';
function useTimerFactory({ userId }) {
  const { isLoading, activeSessionData, allActivities, userActivityWeekView } = fetchData({ userId })



}

function updateCache() {
}

function fetchData({ userId }) {
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
  const isLoading = isLoadingActiveSession || isActLoading || isAllActivitiesLoading
  return { activeSessionData, allActivities, userActivityWeekView, isLoading }
}
