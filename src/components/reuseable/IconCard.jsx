import { Feather } from "@expo/vector-icons";
import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { CONSTANT } from "../../utils";

const IconCard = ({ icon = "info", success = false, error = false }) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    card: {
      padding: CONSTANT.dimension.xs,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: CONSTANT.dimension.round,
    },
    inner: {
      width: 92,
      height: 92,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: CONSTANT.dimension.round,
    },
  });

  const cardBg = success
    ? CONSTANT.color[theme].successFaded
    : error
    ? CONSTANT.color[theme].errorFaded
    : CONSTANT.color[theme].primaryFaded;
  const innerBg = success
    ? CONSTANT.color[theme].success
    : error
    ? CONSTANT.color[theme].error
    : CONSTANT.color[theme].primary;

  return (
    <View style={[styles.card, { backgroundColor: cardBg }]}>
      <View style={[styles.inner, { backgroundColor: innerBg }]}>
        <Feather
          name={icon}
          size={CONSTANT.f_size.xb}
          color={CONSTANT.color.fixed.white}
        />
      </View>
    </View>
  );
};

export default memo(IconCard);
