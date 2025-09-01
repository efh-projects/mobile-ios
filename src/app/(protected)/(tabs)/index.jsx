import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function Home() {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({});

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}
