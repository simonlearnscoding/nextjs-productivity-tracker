import { useEffect, useState } from 'react';
import { api } from "~/trpc/react"; // Ensure this is your client-side TRPC instance

function useAutoAddActivities(userId: string | null, activities: any[] | undefined) {
  const { data: allActivities, isLoading: isLoadingAllActivities } = api.activity.getAllActivities.useQuery();
  const addActivity = api.activity.addActivityToUser.useMutation();
  const [activitiesAdded, setActivitiesAdded] = useState(false);

  useEffect(() => {
    if (!activitiesAdded && activities?.length === 0 && allActivities && userId) {
      allActivities.forEach(activity => {
        addActivity.mutate({ userId, activityId: activity.id });
      });
      setActivitiesAdded(true); // Prevent further additions
    }
  }, [activities, allActivities, userId, addActivity, activitiesAdded]);

  return { isLoading: isLoadingAllActivities };
}

export default useAutoAddActivities;
