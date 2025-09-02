import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "App Name",
  theme: "light",
  color: {
    light: {
      white: "#FDFDFD",
      black: "#08010a",
      primary: "#981bbf",
      primaryFaded: "rgba(152, 27, 191, 0.15)",
      gray50: "#E5E7EB", //d1c9cf
      gray100: "#a8a6af", //a79eb4
      gray200: "#353535", //241b21
      success: "#10B981",
      error: "#EF4444",
      warning: "#F59E0B",
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
