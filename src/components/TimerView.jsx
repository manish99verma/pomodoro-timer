import { MdOutlineVisibility, MdCoffee } from "react-icons/md";
import { formatTime, getPercentage } from "../utils/timeUtils";

const TimerView = ({ timer }) => {
  return (
    <div className="relative flex flex-col gap-5 w-64 h-64 rounded-full items-center justify-center">
      {timer?.isFocusTime() ? (
        <MdOutlineVisibility className="w-6 h-6 opacity-80" />
      ) : (
        <MdCoffee className="w-6 h-6 opacity-80" />
      )}
      <div className="font-bold text-4xl tracking-widest">
        {formatTime(timer?.getCurrentSessionTimeLeftInSeconds() || 0)}
      </div>
      <div className="opacity-80 font-light">
        {timer?.isFocusTime() ? "Focus" : "Chill"}
      </div>

      <svg
        className="absolute inset-0 size-full -rotate-90"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* <!-- Background Circle --> */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-gray-300/50"
          strokeWidth="2"
        ></circle>
        {/* <!-- Progress Circle --> */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-orange-600"
          strokeWidth="2"
          strokeDasharray="100"
          strokeDashoffset={
            100 -
            getPercentage(
              timer?.getCurrentSessionTimeLeftInSeconds() || 0,
              timer?.getCurrentJobDurationInSeconds() || 0
            )
          }
          strokeLinecap="round"
        ></circle>
      </svg>
    </div>
  );
};

export default TimerView;
