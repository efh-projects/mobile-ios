import { Feather } from "@expo/vector-icons";
import { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { CONSTANT, DEBOUNCE } from "../../utils";
import CustomText from "./CustomText";

const PhotoPicker = ({ photo = {}, setPhoto = () => {} }) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    thumbnail: {
      width: CONSTANT.dimension.set(180),
      marginHorizontal: "auto",
      gap: CONSTANT.dimension.xs,
    },
    image: {
      width: "100%",
      height: CONSTANT.dimension.set(120),
      borderRadius: CONSTANT.dimension.xs,
      borderWidth: 0.8,
      borderColor: CONSTANT.color[theme].gray50,
      overflow: "hidden",
    },
    picker: {
      width: "100%",
      paddingVertical: CONSTANT.dimension.m,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: CONSTANT.dimension.xxs,
      borderRadius: CONSTANT.dimension.xs,
      borderWidth: 0.8,
      borderColor: CONSTANT.color[theme].gray50,
    },
    pickerText: {
      color: CONSTANT.color[theme].gray100,
    },
  });

  const _pickPhoto = DEBOUNCE(async () => {});

  return (
    <View style={styles.thumbnail}>
      {/**image */}
      <View style={styles.image}></View>

      {/**upload */}
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.picker}
        onPress={_pickPhoto}
      >
        <Feather
          name={CONSTANT.icon.plus}
          size={CONSTANT.f_size.b}
          color={CONSTANT.color[theme].gray100}
        />

        <CustomText type="h5" style={styles.pickerText}>
          Select Photo
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default memo(PhotoPicker);
