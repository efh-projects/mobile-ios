import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import {
  AppButton,
  CustomText,
  TabHeader,
  ThumbnailPicker,
} from "../../../components/reuseable";
import TermsPolicyModal from "../../../components/TermsPolicyModal";
import { PopupModalWrapper, ScrollWrapper } from "../../../components/wrapper";
import { CONSTANT } from "../../../utils";

export default function Settings() {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: CONSTANT.color[theme].white,
    },
    scroll: {
      paddingBottom: CONSTANT.dimension.xxb * 3,
      gap: CONSTANT.dimension.b,
    },
    section: {
      width: "100%",
      paddingVertical: CONSTANT.dimension.s,
      paddingHorizontal: CONSTANT.dimension.m,
      borderRadius: CONSTANT.dimension.m,
      borderWidth: 0.8,
      borderColor: CONSTANT.color[theme].gray50,
    },
  });

  //--
  const [signOutVisible, setSignOutVisible] = useState(false);
  const [deleteAccountVisible, setDeleteAccountVisible] = useState(false);

  return (
    <View style={styles.page}>
      <TabHeader title="Settings" />

      <ScrollWrapper containerStyle={styles.scroll}>
        <ProfileComponent />

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
    </View>
  );
}

const ProfileComponent = ({}) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    component: {
      paddingVertical: CONSTANT.dimension.xxb,
      alignItems: "center",
      justifyContent: "center",
      gap: CONSTANT.dimension.b,
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
  onPress = () => {},
  path,
}) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    component: {
      width: "100%",
      height: 48,
      flexDirection: "row",
      alignItems: "center",
      gap: CONSTANT.dimension.m,
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
    </TouchableOpacity>
  );
};

const SignOutModal = ({ isVisible, setIsVisible = () => {} }) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({});

  return (
    <>
      <PopupModalWrapper isVisible={isVisible} setIsVisible={setIsVisible} showBackDrop={true}>
        <CustomText type="h3" center>Sign Out</CustomText>
        <CustomText type="p" center>
          Doing this will erase your current session on this device. Meaning you
          will be required to sign back in to access the app. Are you sure you
          want to sign out?
        </CustomText>

        <AppButton title="Yes, Sign Out" />
      </PopupModalWrapper>
    </>
  );
};

const DeleteAccountModal = ({ isVisible, setIsVisible = () => {} }) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({});

  return (
    <>
      <PopupModalWrapper
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        showBackDrop={true}
      >
        <CustomText type="h3" style={{color: CONSTANT.color[theme].error}} center>Warning, Delete Account</CustomText>
        <CustomText type="p" center>
          This action can not be undone. Once you proceed, all your personal data and information will be deleted from our records permanently. Are you sure you
          want to delete your account?
        </CustomText>

        <AppButton title="Yes, Delete Account" type={"error"} />
      </PopupModalWrapper>
    </>
  );
};
