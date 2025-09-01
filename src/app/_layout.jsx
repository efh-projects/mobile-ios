import { Stack } from "expo-router";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { ToastComponent } from "../components/reuseable";
import store from "../redux/store";

export default function RootLayout() {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      {/**persist global states even on app reload */}
      <PersistGate loading={null} persistor={persistor}>
        <Stack>
          <Stack.Screen name="auth" options={{ headerShown: false }} />

          <Stack.Screen name="(protected)" options={{ headerShown: false }} />
        </Stack>

        <ToastManager />
        {/*<SessionManager />
        <SessionChecker /> */}
      </PersistGate>
    </Provider>
  );
}

const ToastManager = ({}) => {
  //creating custom toast configurations
  const toastConfig = {
    customSuccess: ({ text1, ...props }) => (
      <ToastComponent type={"success"} text={text1} props={props} />
    ),
    customError: ({ text1, ...props }) => (
      <ToastComponent type={"error"} text={text1} props={props} />
    ),
  };

  const isIos = Boolean(Platform.OS === "ios");

  return (
    <Toast
      autoHide={true}
      visibilityTime={3000}
      config={toastConfig}
      position="top"
      topOffset={isIos ? 32 : 40}
    />
  );
};
