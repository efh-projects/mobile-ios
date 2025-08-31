import { Feather } from "@expo/vector-icons";
import { router, Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { CONSTANT, DEBOUNCE } from "../../utils";
import { CustomText } from "../reuseable";

const SafeAreaWrapper = ({
  children,
  statusMode,
  showHeader = false,
  style = {},
}) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    safeArea: {
      width: CONSTANT.dimension.w_full,
      flex: 1,
      backgroundColor: CONSTANT.color[theme].white,
    },
  });

  //
  return (
    <SafeAreaView style={[styles.safeArea, style]}>
      <AppStatusBar statusMode={statusMode} />

      {showHeader && <TopBar />}

      {children}
    </SafeAreaView>
  );
};

export default memo(SafeAreaWrapper);

const AppStatusBar = ({ statusMode }) => {
  const theme = useSelector((state) => state.app.theme);
  const is_dark = Boolean(theme === "dark");

  const allowedModes = ["light", "dark"];

  //--select status bar style
  const selectedStyle = Boolean(allowedModes?.includes(statusMode))
    ? statusMode
    : is_dark
    ? "light"
    : "dark";

  return (
    <>
      <StatusBar style={selectedStyle} animated={true} />

      <Stack.Screen
        options={{
          headerShown: false,
          navigationBarHidden: false,
          animation: "none",
        }}
      />
    </>
  );
};

const TopBar = ({}) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    bar: {
      width: "100%",
      height: 54,
      paddingHorizontal: CONSTANT.dimension.m,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: CONSTANT.dimension.m,
      borderBottomWidth: 0.3,
      borderBottomColor: CONSTANT.color[theme].gray50,
      backgroundColor: CONSTANT.color[theme].white,
    },
    icon: {
      width: 24,
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  const path = usePathname();
  const page = String(path)?.replace("/", "");
  const pageTitle = CONSTANT.pages[page];

  const _goBack = DEBOUNCE(() => {
    if (router.canGoBack()) {
      router.back();
    }
  });

  return (
    <View style={styles.bar}>
      {/**back icon */}
      <TouchableOpacity style={styles.icon} onPress={_goBack}>
        <Feather
          name="chevron-left"
          size={CONSTANT.f_size.b}
          color={CONSTANT.color[theme].gray200}
        />
      </TouchableOpacity>

      <CustomText type="h4">{pageTitle}</CustomText>

      {/**options */}
      <TouchableOpacity style={styles.icon} />
    </View>
  );
};
