import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: "",
  lastSignedIn: null,
  maxCacheLimit: Number(30 * 24 * 60 * 60 * 1000), //30days limit
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    __Action_setUser: (state, action) => {
      const { user } = action.payload;

      if (user) {
        state.user = user;
        state.lastSignedIn = Date.now(); //refresh last sign in date
      }
    },
    __Action_setToken: (state, action) => {
      const { token } = action.payload;

      if (token) {
        state.token = token;
      }
    },
    __Action_clearSession: (state) => {
      if (!state.user && !state.token) return;

      // Clear session data
      state.user = null;
      state.token = "";
      state.lastSignedIn = null;
    },
  },
});

export const { __Action_setUser, __Action_setToken, __Action_clearSession } =
  sessionSlice.actions;
export default sessionSlice;
