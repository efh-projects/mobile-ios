import { combineReducers } from "redux";
import appSlice from "./slices/app.slice";
import sessionSlice from "./slices/session.slice";

// Combining burgerReducer and pizzaReducer in reducer
export const reducer = combineReducers({
  app: appSlice.reducer,
  session: sessionSlice.reducer,
});
