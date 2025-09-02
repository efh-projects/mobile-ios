import { memo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { CONSTANT } from "../utils";
import { CustomText, TextLink } from "./reuseable";
import { PopupModalWrapper } from "./wrapper";

const TermsPolicyModal = ({}) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    component: {
      width: "100%",
      padding: CONSTANT.dimension.m,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  //--
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <View style={styles.component}>
        <CustomText center>
          By using our app services, you agree to our{" \n"}
          <TextLink
            text="Terms Of Use"
            onPress={() => setIsVisible(true)}
          />{" "}
          and{" "}
          <TextLink text="Privacy Policy" onPress={() => setIsVisible(true)} />
        </CustomText>
      </View>

      <PopupModalWrapper
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      ></PopupModalWrapper>
    </>
  );
};

export default memo(TermsPolicyModal);
