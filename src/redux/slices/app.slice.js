import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "App Name",
  theme: "light",
  color: {
    light: {
      white: "#fff7fd",
      black: "#0f000b",
      primary: "#82015b",
      primaryFaded: "rgba(130, 1, 91, 0.15)",
      gray50: "#e0d7de", //d1c9cf
      gray100: "#826f7c",
      gray200: "#333133", //241b21
    },
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    __Action_toggleTheme: (state, action) => {
      const dark = Boolean(state.theme === "dark");

      //switch app theme
      if (dark) {
        state.theme = "light";
      } else {
        state.theme = "dark";
      }
    },
  },
});

export const { __Action_toggleTheme } = appSlice.actions;
export default appSlice;
