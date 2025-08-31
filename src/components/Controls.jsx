import { useState } from "react";
import Button from "./Button";
import SettingsDialog from "./Dialog/SettingsDialog";

const Controls = ({ timer, onStartNewTimer, onTimerAborted }) => {
  const [settingsDialogOpened, setSettingsDialogOpened] = useState(false);

  const handleSkipSession = () => {
    timer?.skipSession();
  };

  const handleToggle = () => {
    if (!timer) return;

    if (timer.isRunning()) {
      timer.stop();
    } else {
      timer.start();
    }
  };

  const handleStart = (pref) => {
    onStartNewTimer(pref);
    setSettingsDialogOpened(false);
  };

  const handleAbort = () => {
    if (timer) {
      timer.abort();
      onTimerAborted();
    }
  };

  return (
    <>
      <div className="flex gap-5">
        {timer ? (
          <>
            <Button variant="outline" onClick={handleAbort}>
              Abort
            </Button>
            <Button
              variant={timer?.isRunning() ? "secondary" : "primary"}
              size="lg"
              onClick={handleToggle}
            >
              {timer?.isRunning() ? "Pause" : "Resume"}
            </Button>
            <Button variant="outline" onClick={handleSkipSession}>
              Skip
            </Button>
          </>
        ) : (
          <Button size="lg" onClick={() => setSettingsDialogOpened(true)}>
            Start
          </Button>
        )}
      </div>
      {settingsDialogOpened && (
        <SettingsDialog
          onDismiss={() => setSettingsDialogOpened(false)}
          onStart={handleStart}
        />
      )}
    </>
  );
};

export default Controls;
