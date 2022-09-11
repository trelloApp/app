import { combineReducers } from "@reduxjs/toolkit";
import reducer from "./reducers/auth";
const rootReducer = combineReducers({
  auth: reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
