import { memo } from "react";
import { StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import { CONSTANT } from "../../utils";

const CustomText = ({
  children,
  style,
  type = "p",
  center = false,
  right = false,
}) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    position: {
      textAlign: center ? "center" : right ? "right" : "left",
    },
    p: {
      fontSize: CONSTANT.f_size.s,
      fontWeight: CONSTANT.f_weight.regular,
      color: CONSTANT.color[theme].gray100,
    },
    h4: {
      fontSize: CONSTANT.f_size.m,
      fontWeight: CONSTANT.f_weight.semibold,
      color: CONSTANT.color[theme].gray200,
    },
    h3: {
      fontSize: CONSTANT.f_size.b,
      fontWeight: CONSTANT.f_weight.semibold,
      color: CONSTANT.color[theme].black,
    },
  });

  return <Text style={[styles[type], styles.position, style]}>{children}</Text>;
};

export default memo(CustomText);
