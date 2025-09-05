import { memo } from "react";
import { StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import { CONSTANT } from "../../utils";

const CustomText = ({
  children,
  style,
  type = "p",
  numberOfLines = 0,
  center = false,
  right = false,
  capitalize = false,
  uppercase = false,
  lowercase = false,
}) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    align: {
      textAlign: center ? "center" : right ? "right" : "left",
    },
    transform: {
      textTransform: uppercase
        ? "uppercase"
        : lowercase
        ? "lowercase"
        : capitalize
        ? "capitalize"
        : "none",
    },
    sp: {
      fontSize: CONSTANT.f_size.xs,
      fontWeight: CONSTANT.f_weight.regular,
      color: CONSTANT.color[theme].gray100,
    },
    p: {
      fontSize: CONSTANT.f_size.s,
      fontWeight: CONSTANT.f_weight.regular,
      color: CONSTANT.color[theme].gray100,
    },
    h5: {
      fontSize: CONSTANT.f_size.s,
      fontWeight: CONSTANT.f_weight.semibold,
      color: CONSTANT.color[theme].gray200,
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

  return (
    <Text
      style={[styles[type], styles.align, styles.transform, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

export default memo(CustomText);
