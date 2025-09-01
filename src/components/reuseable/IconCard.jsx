import { Feather } from "@expo/vector-icons";
import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { CONSTANT } from "../../utils";

const IconCard = ({ icon = "info" }) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    card: {
      padding: CONSTANT.dimension.m,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: CONSTANT.dimension.round,
      backgroundColor: CONSTANT.color[theme].primaryFaded,
    },
    inner: {
      width: 84,
      height: 84,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: CONSTANT.dimension.round,
      backgroundColor: CONSTANT.color[theme].primary,
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.inner}>
        <Feather
          name={icon}
          size={CONSTANT.f_size.xb}
          color={CONSTANT.color[theme].white}
        />
      </View>
    </View>
  );
};

export default memo(IconCard);
