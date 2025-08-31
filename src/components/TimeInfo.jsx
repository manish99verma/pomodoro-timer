import { useEffect, useMemo, useState } from "react";
import {
  convertSecondsToHrs,
  formatToClockTime,
  getFocusTimeOfOnDate,
} from "../utils/timeUtils.js";
import { useSelector } from "react-redux";

const TimeInfo = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const dailyFocusTime = useSelector((state) => state.dailyFocusTime);

  // Clock updater
  useEffect(() => {
    const updateIntervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(updateIntervalId);
    };
  }, []);

  // Today focus time
  const getTodayFocusTimeInHrs = useMemo(() => {
    const todayFocusTime = getFocusTimeOfOnDate(dailyFocusTime, new Date());
    return convertSecondsToHrs(todayFocusTime) + " ";
  }, [dailyFocusTime]);

  return (
    <div className="flex flex-row items-center gap-3">
      <div className="bg-blue-400/20 px-3 py-1 rounded-2xl font-semibold tracking-wider text-center">
        {formatToClockTime(currentTime)}
      </div>
      <div className="bg-blue-400/20 px-3 py-1 rounded-2xl font-medium tracking-wider text-center">
        {getTodayFocusTimeInHrs}
        Hours
      </div>
    </div>
  );
};

export default TimeInfo;
