import { useSelector } from "react-redux";
import BaseDialog from "./BaseDialog";
import { convertToHoursMinutesSeconds } from "../../utils/timeUtils.js";
import { useEffect, useState } from "react";

const StatDialog = ({ onDismiss }) => {
  const data = useSelector((state) => state.dailyFocusTime);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (!data || !data.length) setFilteredData([]);
    setFilteredData(data.filter((item) => item.focusTime >= 60));
  }, [data]);

  const timeInHrsAndMinutes = (timeInSeconds) => {
    const minutesAndHours = convertToHoursMinutesSeconds(timeInSeconds);
    if (minutesAndHours.hours > 0)
      return `${minutesAndHours.hours} hours ${minutesAndHours.minutes} min`;
    if (minutesAndHours.minutes > 0) return `${minutesAndHours.minutes} min`;
    return 0;
  };

  return (
    <BaseDialog onDismiss={onDismiss}>
      <h3 className="text-center font-semibold text-xl pb-2">Stats</h3>
      {filteredData && filteredData.length ? (
        <>
          <div className="flex text-orange-500 font-medium text-lg justify-between py-2">
            <div className="w-28 text-center">Date</div>
            <div className="flex-1 text-center">Focus Time</div>
          </div>
          <div className="max-h-96 overflow-y-scroll">
            <div>
              {filteredData.map((item, index) => (
                <div
                  key={index}
                  className={`flex  justify-between py-2 ${
                    index < data.length - 1 && "border-b border-gray-500/30"
                  }`}
                >
                  <div className="w-28 text-center">{item.day}</div>
                  <div className="flex-1 text-center">
                    {timeInHrsAndMinutes(item.focusTime)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center opacity-80 min-h-28 px-4">
          Your daily stats will appear here, Please use our app to see stats.
        </div>
      )}
    </BaseDialog>
  );
};

export default StatDialog;
