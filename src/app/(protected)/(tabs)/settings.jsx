import { Feather } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import {
  CustomText,
  TabHeader,
  ThumbnailPicker,
} from "../../../components/reuseable";
import TermsPolicyModal from "../../../components/TermsPolicyModal";
import { ScrollWrapper } from "../../../components/wrapper";
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
          />
          <OptionComponent
            icon={CONSTANT.icon.lock}
            title="Password & Security"
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
          <OptionComponent title="Sign Out" icon={CONSTANT.icon.log_out} />
          <OptionComponent
            icon={CONSTANT.icon.trash}
            title="Permanently Delete Account"
            danger
          />
        </View>

        {/**terms and policy */}
        <TermsPolicyModal />
      </ScrollWrapper>
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
  });

  return (
    <View style={styles.component}>
      <ThumbnailPicker />
      <CustomText type="h3">Thomas Rainbow</CustomText>
    </View>
  );
};

const OptionComponent = ({ title = "", icon = "", danger = false }) => {
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

  return (
    <TouchableOpacity style={styles.component}>
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
