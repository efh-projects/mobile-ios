import { router } from "expo-router";
import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { CONSTANT, DEBOUNCE } from "../../utils";
import { AppButton, CustomText, IconCard } from "../reuseable";
import { PopupModalWrapper } from "../wrapper";

const SuccessCard = ({
  isSuccessful,
  setIsSuccessful = () => {},
  title = "Successful",
  description = "Request has been processed successfully",
  buttonTitle = "Go Home",
  path = "/(tabs)/",
  onPress = () => {},
  dismissAll = false,
  dismissByCount = false,
  dismissCount = 1,
  pushRoute = false,
}) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    modal: {
      gap: CONSTANT.dimension.xxb,
      paddingVertical: CONSTANT.dimension.b,
    },
    section: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      gap: CONSTANT.dimension.m,
    },
  });

  //--
  const _onPress = DEBOUNCE(() => {
    onPress();

    if (dismissByCount && router.canDismiss()) {
      router.dismiss(dismissCount);
    }

    if (!path) return;

    if (dismissAll && router.canDismiss()) {
      router.dismissTo(path);
      return;
    }

    if (pushRoute) {
      router.push(path);
    } else {
      router.navigate(path);
    }

    return;
  });

  return (
    <>
      <PopupModalWrapper
        isVisible={isSuccessful}
        setIsVisible={setIsSuccessful}
        canSwipe={false}
        showBackDrop={true}
        containerStyle={styles.modal}
      >
        <View style={styles.section}>
          <IconCard icon={CONSTANT.icon.check} />
        </View>

        <View style={styles.section}>
          <CustomText type="h3" center>
            {title}
          </CustomText>
          <CustomText center>{description}</CustomText>
        </View>

        <AppButton title={buttonTitle} onPress={_onPress} />
      </PopupModalWrapper>
    </>
  );
};

export default memo(SuccessCard);
