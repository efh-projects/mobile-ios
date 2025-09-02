import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { CONSTANT } from "../../utils";
import CustomText from "./CustomText";

const TabHeader = ({ title = "Title" }) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    header: {
      width: "100%",
      height: 54,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: CONSTANT.color[theme].white,
      borderBottomWidth: 0.5,
      borderBottomColor: CONSTANT.color[theme].gray50,
    },
  });

  return (
    <View style={styles.header}>
      <CustomText type="h4" center>
        {title}
      </CustomText>
    </View>
  );
};

export default memo(TabHeader);
