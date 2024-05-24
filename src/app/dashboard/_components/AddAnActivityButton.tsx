
'use client'

import { api } from '~/trpc/react'; // Ensure this is your client-side TRPC instance
import { Button } from "~/components/ui/button"

import { useUserStore } from './../../store/user';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"

import { RouterOutputs } from '~/server/api/trpc'
type allActivities = RouterOutputs['activity']['getAllActivities'][0]
type userActivity = RouterOutputs['activity']['getAllUserActivities'][0]
type props = {
  userActivities: userActivity[]
  allActivities: allActivities[]
}
export default function AddAnActivityButton({ userActivities, allActivities }: props) {
  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add an Activity</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Start a New Activity</DialogTitle>
            <DialogDescription>
              Pick and start a new activity to track your time.
            </DialogDescription>
          </DialogHeader>

          <DialogClose asChild>
            <div className="flex flex-col items-center gap-2">
              {allActivities.map((activity) => (
                <ActivityListItem key={activity.id} activity={activity} userActivities={userActivities} />
              ))}
            </div>

          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ActivityListItem({ activity, userActivities }: { activity: allActivities, userActivities: userActivity[] }) {
  const { userId } = useUserStore()
  // TODO: optimistic updates here please
  const ctx = api.useUtils()
  const { mutate: addActivity, isPending: isLoadingAdd } = api.activity.addActivityToUser.useMutation({
    onSuccess: () => {
      ctx.activity.getUserActivityWeekView.invalidate();
      ctx.activity.getAllUserActivities.invalidate();
    }
  })
  const { mutate: removeActivity, isPending: isLoadingRemove } = api.activity.removeActivityFromUser.useMutation({
    onSuccess: () => {
      ctx.activity.getUserActivityWeekView.invalidate();
      ctx.activity.getAllUserActivities.invalidate();
    }
  })
  function handleClick() {
    if (isActivityAdded()) {
      removeActivity({
        userId,
        activityId: activity.id
      })
      return
    }
    addActivity({ userId, activityId: activity.id })
    return
  }
  const state = isActivityAdded() ? 'text-gray-300' : 'text-gray-600 hover:text-gray-800 hover:text-bold hover:border-gray-400 active:bg-gray-200'
  return (
    <div onClick={handleClick} className={`w-full flex justify-center items-center ${state} cursor-pointer   transition-all  rounded-md border-gray-200 shadow-sm border h-12`} >
      {activity.name}
    </div >
  )

  function isActivityAdded() {
    return userActivities.some(userActivity => userActivity.activityId === activity.id);
  }
}


