import { useDispatch, useSelector } from "react-redux";
import TimeInfo from "./components/TimeInfo";
import Preferences from "./components/Preferences";
import TimerView from "./components/TimerView";
import Controls from "./components/Controls";
import StatsButton from "./components/StatsButton";
import Timer from "./utils/Timer";
import { useCallback, useEffect, useState } from "react";
import TimerFinishedDialog from "./components/Dialog/TimerFinishedDialog";
import { incrementTodayFocusTime, saveOnGoingTimer } from "./store/actions";
import { formatDateToISODate } from "./utils/timeUtils";
import Quote from "./components/Quote";

const App = () => {
  const isSoundEnabled = useSelector((state) => state.soundEnabled);
  const darkMode = useSelector((state) => state.darkMode);
  const savedTimer = useSelector((state) => state.onGoingTimer);
  const dispatch = useDispatch();
  const [_, setUpdatesCount] = useState(0);
  const [timer, setTimer] = useState(null);
  const [congratulationDialogVisible, setCongratulationDialogVisible] =
    useState(false);

  useEffect(() => {
    timer?.setSoundEnabled(isSoundEnabled);
  }, [isSoundEnabled, timer]);

  const updateViewFromTimer = useCallback(
    (t) => {
      setUpdatesCount((c) => c + 1);

      if (t.isCompleted()) {
        setCongratulationDialogVisible(true);
        setTimer(null);
      }

      const serializedTimer = t.getSerializedTimer();
      dispatch(saveOnGoingTimer(serializedTimer));

      if (t.isFocusTime()) {
        const date = new Date();
        const formattedDate = formatDateToISODate(date);

        dispatch(incrementTodayFocusTime(formattedDate));
      }
    },
    [dispatch]
  );

  const startNewTimer = useCallback(
    (preferences, startNow = true) => {
      const t = new Timer(preferences);
      if (startNow) {
        t.start();
        updateViewFromTimer(t);
      }

      t.onTimerUpdateListener(() => {
        updateViewFromTimer(t);
      });

      setTimer(t);
    },
    [updateViewFromTimer]
  );

  useEffect(() => {
    if (
      !savedTimer ||
      timer ||
      savedTimer.isAborted ||
      savedTimer.sessions === savedTimer.completedSessions
    )
      return;
    startNewTimer(savedTimer, false);
  }, [savedTimer, startNewTimer, timer]);

  const onTimerAborted = () => {
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
            <div className="opacity-95">
              {timer?.formattedTimerState() || "Session x/x"}
            </div>
            <h2 className="pt-2 tracking-wider text-2xl font-medium">
              {timer?.label || "Unlabelled"}
            </h2>
            <Quote isFocusTime={timer?.isFocusTime() || false} />
          </div>
          <div className="py-8 flex justify-center">
            <TimerView timer={timer} />
          </div>
          <div className="flex items-center justify-center">
            <Controls
              timer={timer}
              onStartNewTimer={startNewTimer}
              onTimerAborted={onTimerAborted}
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
