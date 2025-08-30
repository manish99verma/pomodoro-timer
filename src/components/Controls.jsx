import { useState } from "react";
import Button from "./Button";
import SettingsDialog from "./Dialog/SettingsDialog";

const Controls = ({
  timerStarted,
  onStartTimer,
  toggleTimer,
  isPaused,
  onSkipSession,
  onAbort,
}) => {
  const [settingsDialogOpened, setSettingsDialogOpened] = useState(false);

  const handleStart = (preferences) => {
    setSettingsDialogOpened(false);
    onStartTimer(preferences);
  };

  const handleToggleTimer = () => {
    toggleTimer();
  };

  return (
    <>
      <div className="flex gap-5">
        {timerStarted ? (
          <>
            <Button variant="outline" onClick={onAbort}>
              Abort
            </Button>
            <Button
              variant={isPaused ? "primary" : "secondary"}
              size="lg"
              onClick={handleToggleTimer}
            >
              {isPaused ? "Resume" : "Pause"}
            </Button>
            <Button variant="outline" onClick={onSkipSession}>
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
