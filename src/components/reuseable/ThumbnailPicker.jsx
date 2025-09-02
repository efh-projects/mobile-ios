import { Feather } from "@expo/vector-icons";
import { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { CONSTANT, DEBOUNCE } from "../../utils";

const ThumbnailPicker = () => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    thumbnail: {
      width: CONSTANT.dimension.set(150),
      height: CONSTANT.dimension.set(150),
      borderRadius: CONSTANT.dimension.round,
      borderWidth: 0.8,
      borderColor: CONSTANT.color[theme].gray50,
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: CONSTANT.dimension.round,
      overflow: "hidden",
    },
    picker: {
      width: CONSTANT.dimension.xb,
      height: CONSTANT.dimension.xb,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: CONSTANT.dimension.round,
      backgroundColor: CONSTANT.color[theme].white,
      borderWidth: 0.8,
      borderColor: CONSTANT.color[theme].gray50,
      position: "absolute",
      bottom: 0,
      right: CONSTANT.dimension.xb / 2,
    },
  });

  const _pickThumbnail = DEBOUNCE(async () => {});

  return (
    <View style={styles.thumbnail}>
      {/**image */}
      <View style={styles.image}></View>

      {/**upload */}
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.picker}
        onPress={_pickThumbnail}
      >
        <Feather
          name={CONSTANT.icon.plus}
          size={CONSTANT.f_size.b}
          color={CONSTANT.color[theme].gray100}
        />
      </TouchableOpacity>
    </View>
  );
};

export default memo(ThumbnailPicker);
