import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { TabHeader } from "../../../components/reuseable";
import { CONSTANT } from "../../../utils";

export default function Transactions() {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: CONSTANT.color[theme].white,
    },
  });

  return (
    <View style={styles.page}>
      <TabHeader title="Transactions" />
    </View>
  );
}
