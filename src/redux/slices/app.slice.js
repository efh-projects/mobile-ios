import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "App Name",
  theme: "light",
  color: {
    fixed: {
      white: "#FDFDFD",
      black: "#08010a",
    },
    light: {
      white: "#FDFDFD",
      black: "#08010a",
      primary: "#981bbf",
      primaryFaded: "rgba(152, 27, 191, 0.15)",
      gray50: "#F6F6F6", //E5E7EB
      gray100: "#a8a6af", //a79eb4
      gray200: "#353535", //241b21
      success: "#10B981",
      successFaded: "rgba(16, 185, 129, 0.15)",
      error: "#EF4444",
      errorFaded: "rgba(239, 68, 68, 0.15)",
      warning: "#F59E0B",
    },
    dark: {
      white: "#121212",
      black: "#F9FAFB",
      primary: "#981bbf",
      primaryFaded: "rgba(152, 27, 191, 0.15)",
      gray50: "#1d1d24", //1F2937
      gray100: "#4B5563",
      gray200: "#a8a6af",
      success: "#10B981",
      successFaded: "rgba(16, 185, 129, 0.15)",
      error: "#EF4444",
      errorFaded: "rgba(239, 68, 68, 0.15)",
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
