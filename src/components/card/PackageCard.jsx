import { Feather } from "@expo/vector-icons";
import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { CONSTANT } from "../../utils";
import { CustomText } from "../reuseable";

const PackageCard = ({ data = {} }) => {
  const theme = useSelector((state) => state.app.theme);
  const m = CONSTANT.dimension.m;
  const styles = StyleSheet.create({
    card: {
      maxWidth: CONSTANT.dimension.w_split(2, m, m * 2),
      height: 150,
      padding: CONSTANT.dimension.m,
      flex: 1,
      justifyContent: "space-between",
      backgroundColor: CONSTANT.color[theme].white,
      borderRadius: CONSTANT.dimension.m,
    },
    top: {
      width: "100%",
      paddingLeft: CONSTANT.dimension.xxs,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderLeftWidth: 1.3,
      borderLeftColor: CONSTANT.color[theme].gray100,
    },
    detail: {
      width: "100%",
      gap: CONSTANT.dimension.xxs,
    },
  });

  return (
    <View style={styles.card}>
      {/**status */}
      <View style={styles.top}>
        <Feather
          name="box"
          size={CONSTANT.f_size.b}
          color={CONSTANT.color[theme].gray100}
        />
        <CustomText type="sp">in-progress</CustomText>
      </View>

      {/**detail */}
      <View style={styles.detail}>
        <CustomText type="p" numberOfLines={2} uppercase>
          Birthday Hair Plan
        </CustomText>

        <CustomText type="h4" numberOfLines={2}>
          {CONSTANT.icon.naira} 350K
        </CustomText>
      </View>
    </View>
  );
};

export default memo(PackageCard);
