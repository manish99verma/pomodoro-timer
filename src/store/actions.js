import {
  ADD_LABEL,
  SAVE_TIMER_PREFERENCES,
  TOGGLE_SOUND,
  TOGGLE_THEME,
} from "./actionsTypes";

export const toggleTheme = () => {
  return {
    type: TOGGLE_THEME,
  };
};

export const toggleSound = () => {
  return {
    type: TOGGLE_SOUND,
  };
};

export const addLabel = (newLabelObject) => {
  return {
    type: ADD_LABEL,
    payload: newLabelObject,
  };
};

export const saveTimerPreferences = (newTimerObject) => {
  return {
    type: SAVE_TIMER_PREFERENCES,
    payload: newTimerObject,
  };
};
