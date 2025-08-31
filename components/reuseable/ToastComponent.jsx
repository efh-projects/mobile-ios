import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const ToastComponent = ({ type, text, ...props }) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({});

  return (
    <View>
      <Text>ToastComponent</Text>
    </View>
  );
};

export default memo(ToastComponent);
