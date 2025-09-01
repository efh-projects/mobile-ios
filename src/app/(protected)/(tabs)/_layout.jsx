import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaWrapper } from "../../../components/wrapper";
import { CONSTANT } from "../../../utils";

export default function TabsLayout() {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    tab: {
      backgroundColor: CONSTANT.color[theme].white,
    },
  });

  return (
    <SafeAreaWrapper>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: [styles.tab],
          tabBarActiveTintColor: CONSTANT.color[theme].primary,
          tabBarInactiveTintColor: CONSTANT.color[theme].gray100,
        }}
      >
        <Tabs.Screen name="index" options={{ title: "Packages" }} />
        <Tabs.Screen name="create" options={{ title: "Create" }} />
        <Tabs.Screen name="transactions" options={{ title: "Transactions" }} />
        <Tabs.Screen name="settings" options={{ title: "Settings" }} />
      </Tabs>
    </SafeAreaWrapper>
  );
}
