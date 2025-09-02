import { __Action_toggleTheme } from "../redux/slices/app.slice";
import store from "../redux/store";

const REQUESTS = {
  switchTheme: async () => {
    store.dispatch(__Action_toggleTheme());
    return true;
  },
};

export default REQUESTS;
