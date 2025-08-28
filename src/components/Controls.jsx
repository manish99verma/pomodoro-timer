import { useState } from "react";
import Button from "./Button";
import SettingsDialog from "./Dialog/SettingsDialog";

const Controls = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [settingsDialogOpened, setSettingsDialogOpened] = useState(false);

  const handleStart = (preferences) => {
    console.log("Start with: ", preferences);
    setSettingsDialogOpened(false);
    setIsRunning(true);
  };

  return (
    <>
      <div className="flex gap-5">
        {isRunning ? (
          <>
            <Button variant="outline" onClick={() => setIsRunning((b) => !b)}>
              Abort
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setIsRunning((b) => !b)}
            >
              Pause
            </Button>
            <Button variant="outline" onClick={() => setIsRunning((b) => !b)}>
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
