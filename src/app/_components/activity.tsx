'use client'
import { useUserStore } from './../store/user';
import { useState, useEffect, useRef } from 'react'
import PlayIcon from './PlayIcon'
import timerStore from './../store/CurrentTimer'
import { api } from '~/trpc/react'


type weekView = {
  day: string
  duration: number
  weekday: string
}
export type activityType = {
  activityName: string
  activityId: number
  time: number
  weekView: weekView[]
  todayDuration: weekView
}

enum SessionPartialType {
  WORK,
  BREAK
}

function ActivityNew({ act, session }: { act: activityType, session: any }) {

  // const userStore = useUserStore()
  const { userId } = useUserStore()
  const { mutate: startSession } = api.session.startSession.useMutation()
  const { mutate: stopSession } = api.session.stopSession.useMutation()
  const { activityName } = act


  const isActivityRunning = () => {
    if (session == null) {
      return false
    }
    if (session.sessionPartialType != 'WORK') {
      return false
    }
    if (session.activityId == act.activityId) {
      console.log(act.activityName + ' is running')
      return true
    }
  }

  const handleClick = () => {
    if (isActivityRunning()) {
      stopSession({ userId })
      return
    }
    startSession({ userId, activityId: act.activityId })
  }
  return (
    <div
      onClick={handleClick}
      className={`transition:all  hover:border-gray-400 border-gray-800 pb-2 text-gray-300 flex items-start w-full my-2 cursor-pointer justify-start rounded-xl border-2 pt-3 text-2xl font-semibold transition-all   ${act.isRunning ? `bg-gray-900 border-gray-300` : 'bg-gray-700'
        }`}
    >
      <div className="flex text-2xl font-light flex-col  mr-auto ml-3">
        <div className="pb-3">{activityName}</div>

        <div className="flex mt-3">
          <DayCounter week={act.weekView} />
        </div>
      </div>

      <div className="flex flex-col font-light h-full  mr-3">
        <CaltulatedTime time={act.todayDuration.duration} />
        <div className="mx-auto  mt-auto ">
          <PlayIcon size={'4'} isPlay={!isActivityRunning()} onClick={() => { }} />
        </div>
      </div>
    </div>
  )


}

function CaltulatedTime({ time }) { return calculateActivityTime(time) }

function DayCounter({ week }: { week: weekView[] }) {
  return week.map(({ day, duration }) => (
    <div
      key={day}
      className={`rounded-full ${(duration > 0) ? 'bg-gray-200' : 'bg-gray-600'} mr-1 w-3  h-3`}
    ></div>
  ))



}

// function Activity({ act }: { act: activityType }) {
//   const startActivity = timerStore((state) => state.startActivity)
//   const stopActivity = timerStore((state) => state.stopActivity)
//   const startedAt = timerStore((state) => state.startedAt)
//   const [time, setTime] = useState(act.time)
//   const intervalRef = useRef<any>(null) // Define intervalRef using useRef
//   console.log('activity here', act)
//   console.log('====')
//   console.log('====')
//
//   useEffect(() => {
//     if (!act.isRunning || !startedAt) {
//       clearInterval(intervalRef.current) // Clear the interval if act is not running or startedAt is not set
//       return
//     }
//
//     const interval = setInterval(() => {
//       const now = new Date()
//       const diff = Math.floor((now.getTime() - startedAt.getTime()) / 1000)
//       setTime(act.time + diff)
//     }, 1000)
//
//     intervalRef.current = interval // Store interval ID in a ref
//
//     return () => clearInterval(interval) // Clear interval on unmount or when act.isRunning or startedAt changes
//   }, [act.isRunning, startedAt, act.time])
//
//   const handleClick = () => {
//     if (act.isRunning) {
//       stopActivity()
//     } else {
//       startActivity(act.title)
//     }
//   }
//
//   const color = `bg-${act.color}-400`
//   return (
//     <div
//       onClick={handleClick}
//       className={`transition:all  hover:border-gray-400 border-gray-800 pb-2 text-gray-300 flex items-start w-full my-2 cursor-pointer justify-start rounded-xl border-2 pt-3 text-2xl font-semibold transition-all   ${act.isRunning ? `bg-gray-900 border-gray-300` : 'bg-gray-700'
//         }`}
//     >
//       <div className="flex text-2xl font-light flex-col  mr-auto ml-3">
//         <div className="pb-3">{act.title}</div>
//
//         <div className="flex mt-3">
//           {act.didIt.map((did, index) => (
//             <div
//               key={index}
//               className={`rounded-full ${did ? 'bg-gray-200' : 'bg-gray-600'} mr-1 w-3  h-3`}
//             ></div>
//           ))}
//         </div>
//       </div>
//
//       <div className="flex flex-col font-light h-full  mr-3">
//         <div className="">{calculateActivityTime(time)}</div>
//         <div className="mx-auto  mt-auto ">
//           <PlayIcon size={'4'} isPlay={!act.isRunning} onClick={() => { }} />
//         </div>
//       </div>
//     </div>
//   )
// }

// Function to calculate activity time
function calculateActivityTime(timeInSeconds: number): string {
  const minutes = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (timeInSeconds % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
}

export default ActivityNew
