import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import {
  AppButton,
  CustomText,
  IconCard,
  TabHeader,
  ThumbnailPicker,
} from "../../../components/reuseable";
import TermsPolicyModal from "../../../components/TermsPolicyModal";
import { PopupModalWrapper, ScrollWrapper } from "../../../components/wrapper";
import { CONSTANT, DEBOUNCE, REQUESTS } from "../../../utils";

export default function Settings() {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    page: {
      paddingBottom: CONSTANT.dimension.xxb,
      gap: CONSTANT.dimension.b,
    },
    section: {
      width: "100%",
      gap: CONSTANT.dimension.xxs,
      borderRadius: CONSTANT.dimension.m,
      overflow: "hidden",
    },
  });

  //--
  const [signOutVisible, setSignOutVisible] = useState(false);
  const [deleteAccountVisible, setDeleteAccountVisible] = useState(false);

  //--
  const _switchTheme = DEBOUNCE(async () => {
    await REQUESTS.switchTheme();
  });

  return (
    <>
      <TabHeader title="Settings" />

      <ProfileComponent />

      <ScrollWrapper containerStyle={styles.page}>
        {/** */}
        <View style={styles.section}>
          <OptionComponent
            title="Change Profile Information"
            icon={CONSTANT.icon.user}
            path={"/settings/profile/"}
          />
          <OptionComponent
            icon={CONSTANT.icon.lock}
            title="Password & Security"
            path={"/settings/password/"}
          />
          <OptionComponent
            icon={CONSTANT.icon.credit_card}
            title="Update Bank Details"
          />
        </View>

        {/** */}
        <View style={styles.section}>
          <OptionComponent
            title="Contact Support"
            icon={CONSTANT.icon.headphones}
            path={"/settings/support/"}
          />
          <OptionComponent
            title="Dark Theme"
            icon={CONSTANT.icon.moon}
            hasSwitch
            switchValue={Boolean(theme === "dark")}
            onSwitch={_switchTheme}
          />
        </View>

        {/** */}
        <View style={styles.section}>
          <OptionComponent
            title="Sign Out"
            icon={CONSTANT.icon.log_out}
            onPress={() => setSignOutVisible(true)}
          />
          <OptionComponent
            icon={CONSTANT.icon.trash}
            title="Permanently Delete Account"
            onPress={() => setDeleteAccountVisible(true)}
            danger
          />
        </View>

        {/**terms and policy */}
        <TermsPolicyModal />
      </ScrollWrapper>

      {/**sign out */}
      <SignOutModal
        isVisible={signOutVisible}
        setIsVisible={setSignOutVisible}
      />

      {/**delete account */}
      <DeleteAccountModal
        isVisible={deleteAccountVisible}
        setIsVisible={setDeleteAccountVisible}
      />
    </>
  );
}

const ProfileComponent = ({}) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    component: {
      paddingVertical: CONSTANT.dimension.xxb,
      paddingHorizontal: CONSTANT.dimension.m,
      alignItems: "center",
      justifyContent: "center",
      gap: CONSTANT.dimension.b,
      backgroundColor: CONSTANT.color[theme].white,
    },
    user: {
      gap: CONSTANT.dimension.xs,
    },
  });

  return (
    <View style={styles.component}>
      <ThumbnailPicker />

      <View style={styles.user}>
        <CustomText type="h3" center>
          Thomas Rainbow
        </CustomText>

        <TouchableOpacity>
          <CustomText type="p" center>
            uid-1824945289897{" "}
            <Feather
              name={CONSTANT.icon.copy}
              size={CONSTANT.f_size.m}
              color={CONSTANT.color[theme].gray100}
            />
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const OptionComponent = ({
  title = "",
  icon = "",
  danger = false,
  hasSwitch = false,
  switchValue = false,
  onSwitch = () => {},
  onPress = () => {},
  path,
}) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    component: {
      width: "100%",
      height: 48,
      paddingHorizontal: CONSTANT.dimension.m,
      flexDirection: "row",
      alignItems: "center",
      gap: CONSTANT.dimension.m,
      backgroundColor: CONSTANT.color[theme].white,
    },
    switch: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
    },
  });

  const _onPress = async () => {
    onPress();

    if (path) {
      router.navigate(path);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.component}
      onPress={_onPress}
      disabled={hasSwitch}
    >
      <Feather
        name={icon || "info"}
        size={CONSTANT.f_size.b}
        color={
          danger ? CONSTANT.color[theme].error : CONSTANT.color[theme].gray200
        }
      />
      <CustomText
        type="h5"
        style={danger && { color: CONSTANT.color[theme].error }}
      >
        {title}
      </CustomText>

      {hasSwitch && (
        <View style={styles.switch}>
          <Switch
            thumbColor={
              Boolean(switchValue)
                ? CONSTANT.color[theme].primary
                : CONSTANT.color[theme].white
            }
            trackColor={
              Boolean(switchValue)
                ? CONSTANT.color[theme].primaryFaded
                : CONSTANT.color[theme].gray50
            }
            ios_backgroundColor={CONSTANT.color[theme].gray50}
            value={switchValue}
            onValueChange={onSwitch}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const SignOutModal = ({ isVisible, setIsVisible = () => {} }) => {
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

  return (
    <>
      <PopupModalWrapper
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        showBackDrop={true}
        containerStyle={styles.modal}
      >
        <View style={styles.section}>
          <IconCard icon={CONSTANT.icon.log_out} />
        </View>

        <View style={styles.section}>
          <CustomText type="h3" center>
            Sign Out
          </CustomText>
          <CustomText center>
            Doing this will erase your current session on this device. Meaning
            you will be required to sign back in to access the app. Are you sure
            you want to sign out?
          </CustomText>
        </View>

        <AppButton title={"Yes, Sign Out"} />
      </PopupModalWrapper>
    </>
  );
};

const DeleteAccountModal = ({ isVisible, setIsVisible = () => {} }) => {
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

  return (
    <>
      <PopupModalWrapper
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        showBackDrop={true}
        containerStyle={styles.modal}
      >
        <View style={styles.section}>
          <IconCard icon={CONSTANT.icon.log_out} error />
        </View>

        <View style={styles.section}>
          <CustomText type="h3" center>
            Warning, Delete Account
          </CustomText>
          <CustomText center>
            This action can not be undone. Once you proceed, all your personal
            data and information will be deleted from our records permanently.
            Are you sure you want to delete your account?
          </CustomText>
        </View>

        <AppButton title="Yes, Delete Account" type={"error"} />
      </PopupModalWrapper>
    </>
  );
};
