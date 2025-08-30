import { useSelector } from "react-redux";
import TimeInfo from "./components/TimeInfo";
import Preferences from "./components/Preferences";
import TimerView from "./components/TimerView";
import Controls from "./components/Controls";
import StatsButton from "./components/StatsButton";
import Timer from "./utils/Timer";
import { useState } from "react";
import TimerFinishedDialog from "./components/Dialog/TimerFinishedDialog";

const App = () => {
  const darkMode = useSelector((state) => state.darkMode);
  const [formattedTimerState, setFormattedTimerState] =
    useState("Sessions 0/0");
  const [timer, setTimer] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isFocusTime, setIsFocusTime] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currSessionDuration, setCurrSessionDuration] = useState(0);
  const [isCompleted, setIsCompleted] = useState(true);
  const [congratulationDialogVisible, setCongratulationDialogVisible] =
    useState(false);

  const updateViewFromTimer = (t) => {
    console.log("timer obj: ", t);

    setFormattedTimerState(t.formattedTimerState());
    setIsPaused(!t.isRunning());
    setTimeLeft(t.getCurrentSessionTimeLeftInSeconds());
    setCurrSessionDuration(t.getCurrentJobDurationInSeconds());
    setIsFocusTime(t.isFocusTime());

    if (t.isCompleted()) {
      setIsCompleted(true);
      setCongratulationDialogVisible(true);
      setTimer(null);
    } else {
      setIsCompleted(false);
    }
  };

  const startNewTimer = (preferences) => {
    const t = new Timer(preferences);
    t.start();

    updateViewFromTimer(t);

    t.onTimerUpdateListener(() => {
      updateViewFromTimer(t);
    });

    setTimer(t);
  };

  const handleToggleTimer = () => {
    if (!timer) return;

    if (timer.isRunning()) {
      timer.stop();
    } else {
      timer.start();
    }
  };

  const handleSkipSession = () => {
    timer?.skipSession();
  };

  const handleAbort = () => {
    console.log("Aborting timer");

    setIsCompleted(true);
    timer?.stop();
    setTimer(null);
  };

  return (
    <>
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
            <div className="opacity-95">{formattedTimerState}</div>
            <h2 className="pt-2 tracking-wider text-2xl font-medium">
              {timer?.label || "Unlabelled"}
            </h2>
            <p className="text-sm opacity-95">
              Stay hydrated. Drink some water.
            </p>
          </div>
          <div className="py-8 flex justify-center">
            <TimerView
              isFocusTime={isFocusTime}
              timeLeft={timeLeft}
              currSessionDuration={currSessionDuration}
            />
          </div>
          <div className="flex items-center justify-center">
            <Controls
              timerStarted={!isCompleted}
              onStartTimer={startNewTimer}
              toggleTimer={handleToggleTimer}
              isPaused={isPaused}
              onSkipSession={handleSkipSession}
              onAbort={handleAbort}
            />
          </div>
          <div className="flex-1 flex justify-end mt-5">
            <StatsButton />
          </div>
        </div>
      </div>
      {congratulationDialogVisible && (
        <TimerFinishedDialog
          onDismiss={() => setCongratulationDialogVisible(false)}
        />
      )}
    </>
  );
};

export default App;
