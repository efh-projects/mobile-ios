import { memo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useKeyboardHeight } from "../../hooks";
import { CONSTANT } from "../../utils";

const ScrollWrapper = ({
  children,
  containerStyle = {},
  refreshFunc = () => {},
  canScroll = true,
}) => {
  const theme = useSelector((s) => s.app.theme);
  const keyboardHeight = useKeyboardHeight() || CONSTANT.dimension.set(64);

  const styles = StyleSheet.create({
    scrollView: {
      width: "100%",
      minHeight: "100%",
      padding: CONSTANT.dimension.m,
      paddingBottom: keyboardHeight,
      gap: CONSTANT.dimension.m,
    },
  });

  return (
    <ScrollView
      contentContainerStyle={[styles.scrollView, containerStyle]}
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEnabled={canScroll}
    >
      {children}
    </ScrollView>
  );
};

export default memo(ScrollWrapper);
