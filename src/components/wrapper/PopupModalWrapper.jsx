import { memo } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";
import { useKeyboardHeight } from "../../hooks";
import { CONSTANT } from "../../utils";

const PopupModalWrapper = ({
  children,
  onCloseFunc = () => {},
  isVisible = false,
  setIsVisible = () => {},
  canBounce = true,
  canSwipe = true,
  canClose = true,
  stopScroll = false,
  showBackDrop = false,
  containerStyle,
}) => {
  const theme = useSelector((state) => state.app.theme);
  const keyboardHeight = useKeyboardHeight() || CONSTANT.dimension.set(64);

  const styles = StyleSheet.create({
    modal: {
      padding: 0,
      margin: 0,
    },
    modalInset: {
      width: "100%",
      minHeight: CONSTANT.dimension.h_ratio(1 / 3),
      maxHeight:
        keyboardHeight < 64
          ? CONSTANT.dimension.h_ratio(1 / 1.2)
          : Platform.OS === "ios"
          ? CONSTANT.dimension.h_ratio(1 / 1.2)
          : CONSTANT.dimension.h_ratio(1 / 3),
      position: "absolute",
      bottom: 0,
      left: 0,
      backgroundColor: CONSTANT.color[theme].white,
      shadowColor: CONSTANT.color[theme].gray100,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.08,
      shadowRadius: 3,
      elevation: 3,
    },
    header: {
      width: "100%",
      padding: CONSTANT.dimension.s,
      alignItems: "center",
      justifyContent: "center",
    },
    bar: {
      width: 38,
      height: 4,
      borderRadius: CONSTANT.dimension.round,
      backgroundColor: CONSTANT.color[theme].gray100,
    },
    container: {
      width: "100%",
      padding: CONSTANT.dimension.m,
      paddingBottom: keyboardHeight / 2,
    },
  });

  //--handle close modal
  const _closeModal = () => {
    if (!canClose) return;

    onCloseFunc();

    setIsVisible(false);
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={null}
      propagateSwipe={true}
      swipeDirection={canSwipe ? "down" : null}
      onSwipeComplete={_closeModal}
      style={styles.modal}
      hasBackdrop={true}
      backdropOpacity={showBackDrop ? 0.15 : 0}
      backdropColor={CONSTANT.color[theme].black}
      hideModalContentWhileAnimating={true}
      avoidKeyboard={true}
    >
      <View style={styles.modalInset}>
        <View style={styles.header}>
          <View style={styles.bar} />
        </View>

        {/** */}
        <ScrollView
          contentContainerStyle={[styles.container, containerStyle]}
          bounces={Boolean(canBounce)}
          scrollEnabled={!Boolean(stopScroll)}
        >
          {children}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default memo(PopupModalWrapper);
