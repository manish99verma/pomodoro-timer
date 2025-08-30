import { useDispatch, useSelector } from "react-redux";
import TimeInfo from "./components/TimeInfo";
import Preferences from "./components/Preferences";
import TimerView from "./components/TimerView";
import Controls from "./components/Controls";
import StatsButton from "./components/StatsButton";
import Timer from "./utils/Timer";
import { useEffect, useState } from "react";
import TimerFinishedDialog from "./components/Dialog/TimerFinishedDialog";
import { saveOnGoingTimer } from "./store/actions";

const App = () => {
  const dispatch = useDispatch();
  const savedTimerInfo = useSelector((state) => state.onGoingTimer);
  const darkMode = useSelector((state) => state.darkMode);
  const [formattedTimerState, setFormattedTimerState] =
    useState("Sessions 0/0");
  const [_, setUpdatesCount] = useState(0);
  const [timer, setTimer] = useState(null);
  const [congratulationDialogVisible, setCongratulationDialogVisible] =
    useState(false);

  // updates
  useEffect(() => {
    if (!timer) return;
    timer.onTimerUpdateListener(() => {
      setUpdatesCount((c) => c + 1);

      setFormattedTimerState(timer.formattedTimerState());

      if (timer.isCompleted()) {
        setCongratulationDialogVisible(true);
        setTimer(null);
      }

      const serializedTimer = timer.getSerializedTimer();
      console.log("serialized timer obj: ", serializedTimer);
      dispatch(saveOnGoingTimer(serializedTimer));
    });
  }, [timer, dispatch]);

  useEffect(() => {
    console.log("Saved info: ", savedTimerInfo);
    const t = new Timer(savedTimerInfo);
    if (t.isCompleted() || t.isAborted) {
      return;
    }

    // resume timer from last session
    setTimer(t);
  }, [savedTimerInfo]);

  const updateViewFromTimer = (t) => {
    setUpdatesCount((c) => c + 1);

    setFormattedTimerState(t.formattedTimerState());

    if (t.isCompleted()) {
      setCongratulationDialogVisible(true);
      setTimer(null);
    }

    const serializedTimer = t.getSerializedTimer();
    console.log("serialized timer obj: ", serializedTimer);
    dispatch(saveOnGoingTimer(serializedTimer));
  };

  const startNewTimer = (preferences) => {
    const t = new Timer(preferences);
    t.start();

    // updateViewFromTimer(t);

    // t.onTimerUpdateListener(() => {
    //   updateViewFromTimer(t);
    // });

    setTimer(t);
  };

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
            <div className="opacity-95">{formattedTimerState}</div>
            <h2 className="pt-2 tracking-wider text-2xl font-medium">
              {timer?.label || "Unlabelled"}
            </h2>
            <p className="text-sm opacity-95">
              Stay hydrated. Drink some water.
            </p>
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
