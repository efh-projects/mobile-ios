import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaWrapper } from "../../../components/wrapper";
import { CONSTANT } from "../../../utils";

export default function TabsLayout() {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    tab: {
      height: "auto",
      paddingTop: CONSTANT.dimension.s,
      paddingBottom: CONSTANT.dimension.s,
      paddingHorizontal: CONSTANT.dimension.s,
      marginHorizontal: CONSTANT.dimension.m,
      backgroundColor: CONSTANT.color[theme].white,
      borderRadius: CONSTANT.dimension.m,
      borderTopWidth: 0,
      overflow: "hidden",
      position: "absolute",
      bottom: CONSTANT.dimension.m,
    },
    item: {
      alignItems: "center",
      justifyContent: "center",
      gap: CONSTANT.dimension.xxs,
    },
    icon: {
      alignItems: "center",
      justifyContent: "center",
    },
    label: {
      fontSize: CONSTANT.f_size.xs,
      fontWeight: CONSTANT.f_weight.semibold,
    },
    scene: {
      flex: 1,
      backgroundColor: CONSTANT.color[theme].gray50,
    },
  });

  return (
    <SafeAreaWrapper>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: CONSTANT.color[theme].primary,
          tabBarInactiveTintColor: CONSTANT.color[theme].gray100,
          tabBarStyle: [styles.tab],
          tabBarButton: ({ children, onPress }) => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onPress}
              style={styles.item}
            >
              {children}
            </TouchableOpacity>
          ),
          tabBarIconStyle: [styles.icon],
          tabBarLabelStyle: [styles.label],
          sceneStyle: [styles.scene],
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Packages",
            tabBarIcon: ({ color, size }) => (
              <Feather name={CONSTANT.icon.archive} size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="transactions"
          options={{
            title: "Transactions",
            tabBarIcon: ({ color, size }) => (
              <Feather
                name={CONSTANT.icon.bar_chart}
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Feather
                name={CONSTANT.icon.settings}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaWrapper>
  );
}
