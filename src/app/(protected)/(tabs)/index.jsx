import { Feather } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { CustomText } from "../../../components/reuseable";
import { ScrollWrapper } from "../../../components/wrapper";
import { CONSTANT } from "../../../utils";

export default function Packages() {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({});

  return (
    <>
      <TopComponent />

      <ScrollWrapper></ScrollWrapper>
    </>
  );
}

const TopComponent = ({}) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    component: {
      width: "100%",
      padding: CONSTANT.dimension.m,
      flexDirection: "row",
      alignItems: "center",
      gap: CONSTANT.dimension.xs,
      backgroundColor: CONSTANT.color[theme].white,
    },
    circle: {
      width: CONSTANT.dimension.xxb,
      height: CONSTANT.dimension.xxb,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: CONSTANT.dimension.round,
      overflow: "hidden",
    },
    thumbnail: {
      backgroundColor: CONSTANT.color[theme].gray50,
    },
    notification: {
      borderWidth: 0.8,
      borderColor: CONSTANT.color[theme].gray50,
    },
    detail: {
      flex: 1,
    },
  });

  return (
    <View style={styles.component}>
      {/**thumbnail */}
      <View style={[styles.circle, styles.thumbnail]}></View>

      {/**name and greeting */}
      <View style={styles.detail}>
        <CustomText type="p">Good Morning,</CustomText>
        <CustomText type="h4">Thomas Rainbow</CustomText>
      </View>

      {/**notification icon */}
      <TouchableOpacity style={[styles.circle, styles.notification]}>
        <Feather
          name={CONSTANT.icon.bell}
          size={CONSTANT.f_size.b}
          color={CONSTANT.color[theme].gray100}
        />
      </TouchableOpacity>
    </View>
  );
};
