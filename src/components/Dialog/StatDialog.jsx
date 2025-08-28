import { useSelector } from "react-redux";
import BaseDialog from "./BaseDialog";
import { convertToHoursAndMinutes } from "../../utils/timeUtils";

const StatDialog = ({ onDismiss }) => {
  const data = useSelector((state) => state.dailyFocusTime);

  const filterOutZeroMin = (data) => {
    return data.filter((item) => item.focusTime >= 60);
  };

  const timeInHrsAndMinutes = (timeInSeconds) => {
    const minutesAndHours = convertToHoursAndMinutes(timeInSeconds);
    if (minutesAndHours.hours > 0)
      return `${minutesAndHours.hours} hours ${minutesAndHours.minutes} min`;
    if (minutesAndHours.minutes > 0) return `${minutesAndHours.minutes} min`;
    return 0;
  };

  return (
    <BaseDialog onDismiss={onDismiss}>
      <h3 className="text-center font-semibold text-xl pb-2">Stats</h3>
      <div className="flex text-orange-500 font-medium text-lg justify-between py-2">
        <div className="w-28 text-center">Date</div>
        <div className="flex-1 text-center">Focus Time</div>
      </div>
      <div className="max-h-96 overflow-y-scroll">
        <div>
          {filterOutZeroMin(data).map((item, index) => (
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
    </BaseDialog>
  );
};

export default StatDialog;
