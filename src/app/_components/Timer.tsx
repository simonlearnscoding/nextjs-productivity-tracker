'use client'
import PlayIcon from './PlayIcon';
import { useActivityTimer } from './useActivityTimer';
import { calculateActivityTime } from '../../utils/calculateActivityTime';
import { RouterOutputs } from '~/server/api/trpc';

type session = RouterOutputs['session']['getUserActiveSession'];
type activityWeekView = RouterOutputs['activity']['getUserActivityWeekView'];

type props = {
  session: session | undefined;
  userActivityWeekView: activityWeekView | undefined;
};

const Timer = ({ session, userActivityWeekView }: props) => {
  if (!session || !userActivityWeekView) {
    return (
      <div className="bg-gray-600 w-full mb-3 flex flex-col rounded-md px-1 py-2">
        <div className="bg-gray-700 rounded-md text-gray-200 px-3 py-2 text-xl w-full mb-2">
          No activity is currently being tracked.
        </div>
        <div className="flex py-4 cursor-pointer text-gray-200 px-3 bg-gray-700 items-center rounded-md">
          <div className="text-2xl w-full">--</div>
          <PlayIcon size={'6'} isPlay={true} onClick={() => { }} />
        </div>
      </div>
    );
  }

  const act = userActivityWeekView.find(act => act.activityName === session.activityName);
  if (!act) {
    return (
      <div className="bg-gray-600 w-full mb-3 flex flex-col rounded-md px-1 py-2">
        <div className="bg-gray-700 rounded-md text-gray-200 px-3 py-2 text-xl w-full mb-2">
          No matching activity found.
        </div>
        <div className="flex py-4 cursor-pointer text-gray-200 px-3 bg-gray-700 items-center rounded-md">
          <div className="text-2xl w-full">--</div>
          <PlayIcon size={'6'} isPlay={true} onClick={() => { }} />
        </div>
      </div>
    );
  }

  const { time, isActivityRunning, handleStartStop } = useActivityTimer(act, session);

  const currentlyTrackingAnActivity = () => {
    return session != null;
  };

  const currentActivity = session ? session.activityName : '';

  return (
    <div className="bg-gray-600 w-full mb-3 flex flex-col rounded-md px-1 py-2">
      <div className="bg-gray-700 rounded-md text-gray-200 px-3 py-2 text-xl w-full mb-2">
        {currentlyTrackingAnActivity() ? currentActivity : `Continue`}
      </div>
      <div className="flex py-4 cursor-pointer text-gray-200 px-3 bg-gray-700 items-center rounded-md">
        <div onClick={handleStartStop} className="text-2xl w-full">
          {currentlyTrackingAnActivity() ? calculateActivityTime(time) : "--"}
        </div>
        <PlayIcon
          size={'6'}
          isPlay={!currentlyTrackingAnActivity()}
          onClick={handleStartStop}
        />
      </div>
    </div>
  );
};

export default Timer;
