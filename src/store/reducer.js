import {
  ADD_LABEL,
  SAVE_TIMER_PREFERENCES,
  TOGGLE_SOUND,
  TOGGLE_THEME,
} from "./actionsTypes";
import { loadState } from "./localStorageHelper";

const fallBackState = {
  darkMode: true,
  soundEnabled: true,
  labels: [{ createdAt: 0, label: "Unlabelled" }],
  timerPreferences: {
    work: 25,
    break: 5,
    sessions: 5,
    longBreakOnSessions: 2,
    longBreakDuration: 15,
    label: "Unlabelled",
  },
  currTimerPreferences: {
    work: 25,
    break: 5,
    sessions: 5,
    longBreakOnSessions: 2,
    longBreakDuration: 15,
    label: "Unlabelled",
    completedSessions: 0,
    completedBreaks: 0,
    completedLongBreaks: 0,
    onGoingTimerState: 0,
  },
  // {day: "YYYY-MM-DD", focusTime: timeInSeconds};
  dailyFocusTime: [
    { day: "2025-08-28", focusTime: 43593 },
    { day: "2025-08-27", focusTime: 349 },
    { day: "2025-08-26", focusTime: 543 },
    { day: "2025-08-25", focusTime: 34 },
    { day: "2025-08-24", focusTime: 133 },
    { day: "2025-08-23", focusTime: 34 },
    { day: "2025-08-22", focusTime: 132 },
  ],
};

const currState = loadState("initialState", fallBackState);

const reducer = (state = currState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    case TOGGLE_SOUND:
      return {
        ...state,
        soundEnabled: !state.soundEnabled,
      };
    case ADD_LABEL:
      return {
        ...state,
        labels: [...state.labels, action.payload],
      };
    case SAVE_TIMER_PREFERENCES:
      return {
        ...state,
        timerPreferences: { ...action.payload },
      };
    default:
      return state;
  }
};

export default reducer;
