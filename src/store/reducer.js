import { incrementFocusTime } from "../utils/timeUtils";
import {
  ADD_LABEL,
  INCREMENT_TODAY_FOCUS_TIME,
  SAVE_ON_GOING_TIMER,
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
  onGoingTimer: {
    work: 25,
    break: 5,
    sessions: 5,
    longBreakOnSessions: 2,
    longBreakDuration: 15,
    label: "Unlabelled",
    completedSessions: 0,
    completedBreaks: 0,
    completedLongBreaks: 0,
    onGoingTimerStateInSeconds: 0,
    isAborted: true,
  },
  // {day: "YYYY-MM-DD", focusTime: timeInSeconds};
  dailyFocusTime: [],
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
    case SAVE_ON_GOING_TIMER: {
      return { ...state, onGoingTimer: action.payload };
    }
    case INCREMENT_TODAY_FOCUS_TIME:
      return {
        ...state,
        dailyFocusTime: incrementFocusTime(
          state.dailyFocusTime,
          action.payload
        ),
      };
    default:
      return state;
  }
};

export default reducer;
