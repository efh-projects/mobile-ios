import { Dimensions, Platform } from "react-native";
import store from "../redux/store";

const appColors = store.getState().app.color;
const screenW = Dimensions.get("window").width;
const screenH = Dimensions.get("window").height;

const CONSTANT = {
  color: appColors,
  f_size: {
    xxs: 10,
    xs: 12,
    s: 14,
    m: 16,
    b: 18,
    xb: 24,
  },
  f_weight: {
    regular: 400,
    semibold: 500,
    bold: 600,
  },
  dimension: {
    xxs: 4,
    xs: 8,
    s: 12,
    m: 16,
    b: 24,
    xb: 32,
    xxb: 48,
    set: (value = 16) => value,
    round: 1000,
    w_full: screenW,
    h_full: screenH,
    w_ratio: (ratio = 1, width = screenW) => Number(width * Number(ratio)),
    h_ratio: (ratio = 1, height = screenH) => Number(height * Number(ratio)),
  },
  icon: {
    user: "user",
    mail: "mail",
    lock: "lock",
    eye: "eye",
    eye_off: "eye-off",
    shield: "shield",
    check: "check",
    back: Platform.OS === "ios" ? "chevron-left" : "arrow-left",
  },
  input_mode: {
    text: "text",
    email: "email",
    numeric: "numeric",
    password: "password",
    search: "search",
  },
  pages: {
    verify: "Verification",
  },
};

export default CONSTANT;
