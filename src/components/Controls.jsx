import { useEffect, useState } from "react";
import Button from "./Button";
import SettingsDialog from "./Dialog/SettingsDialog";
import { toast } from "react-toastify";

const Controls = ({ timer, onStartNewTimer, onTimerAborted }) => {
  const [settingsDialogOpened, setSettingsDialogOpened] = useState(false);

  // Keyword controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key.toLowerCase()) {
        case " ": // Space → Start/Pause
          if (!settingsDialogOpened) {
            e.preventDefault(); // prevent page scrolling
            if (timer) handleToggle();
            else setSettingsDialogOpened(true);
          }
          break;
        case "a": // A -> Abort
          if (timer) handleAbort();
          break;
        case "s": // S → Skip
          if (timer) handleSkipSession();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleSkipSession = () => {
    toast.info("Session skipped!");
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
      toast.info("Timer Aborted!");
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
