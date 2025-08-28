import { useSelector } from "react-redux";
import TimeInfo from "./components/TimeInfo";
import Preferences from "./components/Preferences";
import Timer from "./components/Timer";
import Controls from "./components/Controls";
import StatsButton from "./components/StatsButton";

const App = () => {
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div
      className={`w-[100wh] h-[100vh] px-[5%] pt-3  ${
        darkMode ? "bg-gray-800 text-white" : "bg-slate-50 text-black"
      }`}
    >
      <h1 className="py-4 text-center font-bold tracking-wider text-2xl">
        Pomodoro Timer
      </h1>
      <div className="flex flex-col">
        <div className="py-4 flex justify-between gap-3">
          <TimeInfo />
          <Preferences />
        </div>
        <div className="flex flex-1 flex-col items-center">
          <div className="opacity-95"> Session 4/8</div>
          <h2 className="pt-2 tracking-wider text-2xl font-medium">
            Physics Assignment
          </h2>
          <p className="text-sm opacity-95">Stay hydrated. Drink some water.</p>
        </div>
        <div className="py-8 flex justify-center">
          <Timer />
        </div>
        <div className="flex items-center justify-center">
          <Controls />
        </div>
        <div className="flex-1 flex justify-end mt-5">
          <StatsButton />
        </div>
      </div>
    </div>
  );
};

export default App;
