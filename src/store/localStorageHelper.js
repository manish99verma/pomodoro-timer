// localStorageHelpers.js
export const loadState = (key, defaultValue) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return defaultValue; // initial value if nothing in localStorage
    }
    return JSON.parse(serializedState);
  } catch {
    console.log("No initial state");
    return defaultValue;
  }
};

export const saveState = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    console.warn("Error saving state", e);
  }
};
