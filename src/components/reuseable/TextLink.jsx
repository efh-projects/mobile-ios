import { memo } from "react";
import { StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import { CONSTANT } from "../../utils";

const TextLink = ({ text = "Click here", onPress = () => {} }) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    link: {
      fontSize: CONSTANT.f_size.s,
      fontWeight: CONSTANT.f_weight.semibold,
      color: CONSTANT.color[theme].primary,
    },
  });

  return (
    <>
      <Text
        style={styles.link}
        onPress={onPress}
        pointerEvents="none"
        suppressHighlighting={true}
      >
        {text}
      </Text>
    </>
  );
};

export default memo(TextLink);
