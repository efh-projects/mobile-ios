import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { CONSTANT } from "../../../utils";

export default function Packages() {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    page: {
      width: "100%",
      height: 200,
      backgroundColor: CONSTANT.color[theme].primary,
    },
  });

  return (
    <View style={styles.page}>
      <Text>Packages</Text>
    </View>
  );
}
