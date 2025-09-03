import { memo } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { CONSTANT } from "../../utils";

const AppButton = ({
  title = "Click here",
  onPress = () => {},
  isLoading = false,
  isDisabled = false,
  hasIcon = false,
  icon = <></>,
  type = "primary", // primary, secondary, error, success
}) => {
  const theme = useSelector((state) => state.app.theme);

  //--
  const bgColor =
    type === "secondary"
      ? "transparent"
      : type === "error"
      ? CONSTANT.color[theme].error
      : type === "success"
      ? CONSTANT.color[theme].success
      : CONSTANT.color[theme].primary;
  const txtColor =
    type === "secondary"
      ? CONSTANT.color[theme].primary
      : CONSTANT.color.fixed.white;
  const bdColor =
    type === "secondary" ? CONSTANT.color[theme].primary : "transparent";

  const styles = StyleSheet.create({
    button: {
      width: "100%",
      height: 48,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: CONSTANT.dimension.xs,
      borderRadius: CONSTANT.dimension.round,
      backgroundColor: bgColor,
      borderWidth: type === "secondary" ? 0.8 : 0,
      borderColor: bdColor,
      opacity: isDisabled ? 0.8 : 1,
    },
    title: {
      fontSize: CONSTANT.f_size.m,
      fontWeight: CONSTANT.f_weight.semibold,
      color: txtColor,
      textAlign: "center",
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      disabled={isLoading || isDisabled}
      style={styles.button}
    >
      {hasIcon && icon}

      <Text style={styles.title}>{title}</Text>

      {isLoading && (
        <ActivityIndicator size={CONSTANT.f_size.b} color={txtColor} />
      )}
    </TouchableOpacity>
  );
};

export default memo(AppButton);
