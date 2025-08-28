import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { saveState } from "./localStorageHelper";

const store = configureStore({ reducer: reducer });

store.subscribe(() => {
  saveState("initialState", store.getState());
});

export default store;
