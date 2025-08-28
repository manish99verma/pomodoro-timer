import { useState } from "react";
import Button from "../Button";
import TimeSelector from "../TimeSelector";
import BaseDialog from "./BaseDialog";
import LabelSelector from "../LabelSelector";
import AddNewLabel from "./AddNewLabel";
import { useDispatch, useSelector } from "react-redux";
import { saveTimerPreferences } from "../../store/actions";

const focusAndTimeSelectors = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90,
  100, 120, 140, 160, 180,
];

const sessionsSelectors = Array.from({ length: 20 }, (_, i) => i + 1);
const longBreakSessionsSelectors = Array.from({ length: 21 }, (_, i) => i);

const SettingsDialog = ({ onDismiss, onStart }) => {
  const dispatch = useDispatch();
  const timerPreferences = useSelector((state) => state.timerPreferences);
  const labels = useSelector((state) => state.labels);
  const [preferences, setPreferences] = useState({ ...timerPreferences });
  const [isAddNewLabelDialogOpen, setIsAddNewLabelDialogOpen] = useState(false);

  const handleAddNewLabel = () => {
    setIsAddNewLabelDialogOpen(true);
  };

  const handleSaveNewLabel = (newLabel) => {
    console.log("New Label: ", newLabel);
    setIsAddNewLabelDialogOpen(false);
    setPreferences({ ...preferences, label: newLabel });
  };

  // Sort labels from new to old
  const sortedLabels = () => {
    if (!labels || !labels.length) return [];
    return [...labels]
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((item) => item.label);
  };

  // Save settings
  const handleSubmit = (e) => {
    console.log("Handle submit");
    e.preventDefault();
    dispatch(saveTimerPreferences(preferences));
    onStart(preferences);
  };

  return (
    <>
      <BaseDialog onDismiss={onDismiss}>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h2 className="text-center font-medium text-xl pb-4">
            Customize Pomodoro
          </h2>
          <div className="flex flex-col gap-2 mb-8">
            <TimeSelector
              title="Work"
              unitName="min"
              selectorsList={focusAndTimeSelectors}
              selectedValue={preferences.work}
              onSelect={(item) =>
                setPreferences({ ...preferences, work: item })
              }
            />
            <TimeSelector
              title="Break"
              unitName="min"
              selectorsList={focusAndTimeSelectors}
              selectedValue={preferences.break}
              onSelect={(item) =>
                setPreferences({ ...preferences, break: item })
              }
            />
            <TimeSelector
              title="Sessions"
              unitName="Sess."
              selectorsList={sessionsSelectors}
              selectedValue={preferences.sessions}
              onSelect={(item) =>
                setPreferences({ ...preferences, sessions: item })
              }
            />
            <TimeSelector
              title="Long Break after"
              unitName="Sess."
              selectorsList={longBreakSessionsSelectors}
              selectedValue={preferences.longBreakOnSessions}
              onSelect={(item) =>
                setPreferences({ ...preferences, longBreakOnSessions: item })
              }
            />
            <TimeSelector
              title="Long Break Duration"
              unitName="min"
              selectorsList={focusAndTimeSelectors}
              selectedValue={preferences.longBreakDuration}
              onSelect={(item) =>
                setPreferences({ ...preferences, longBreakDuration: item })
              }
            />
            <LabelSelector
              selectedValue={preferences.label}
              selectorsList={sortedLabels()}
              onSelect={(item) =>
                setPreferences({ ...preferences, label: item })
              }
              requestNewItem={handleAddNewLabel}
            />
          </div>
          <Button type="submit">Start now</Button>
        </form>
      </BaseDialog>
      {isAddNewLabelDialogOpen && (
        <AddNewLabel
          onDismiss={() => setIsAddNewLabelDialogOpen(false)}
          onSave={handleSaveNewLabel}
        />
      )}
    </>
  );
};

export default SettingsDialog;
