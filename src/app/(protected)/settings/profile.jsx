import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { SuccessCard } from "../../../components/card";
import {
  AppButton,
  CustomText,
  FormInput,
} from "../../../components/reuseable";
import { SafeAreaWrapper, ScrollWrapper } from "../../../components/wrapper";
import { CONSTANT, DEBOUNCE } from "../../../utils";

export default function UpdateProfile() {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    info: {
      width: "100%",
      padding: CONSTANT.dimension.m,
      marginBottom: CONSTANT.dimension.xxb,
      gap: CONSTANT.dimension.m,
      borderRadius: CONSTANT.dimension.xs,
      borderWidth: 0.8,
      borderColor: CONSTANT.color[theme].gray50,
    },
    block: {
      width: "100%",
      gap: CONSTANT.dimension.m,
      paddingBottom: CONSTANT.dimension.xxb,
    },
  });

  //--
  const [form, setForm] = useState({
    fullname: "",
    phone: "",
  });

  const [updateProfileIsSuccessful, setUpdateProfileIsSuccessful] =
    useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const _updateProfile = DEBOUNCE(async () => {
    const res = true;

    if (res) {
      setUpdateProfileIsSuccessful(true);
    }
  });

  return (
    <SafeAreaWrapper showHeader={true}>
      <ScrollWrapper>
        {/**brief info */}
        <View style={styles.info}>
          <SubComponent name="User ID" value="uid-8492589284502" />
          <SubComponent name="Email Address" value="thomasrain@gmail.com" />
          <SubComponent name="Joined Since" value="23 June, 2024" />
          <SubComponent name="Last Updated On" value="5 August, 2025" />
        </View>

        <View style={styles.block}>
          {/* <FormInput
            label="Email Address"
            placeholder="youremail@example.com"
            icon={CONSTANT.icon.mail}
            mode={CONSTANT.input_mode.email}
            value={"thomasrain@gmail.com"}
            disabled
          /> */}

          <FormInput
            label="What's Your Legal Name?"
            placeholder="John Doe"
            icon={CONSTANT.icon.user}
            mode={CONSTANT.input_mode.text}
            form={form}
            setForm={setForm}
            name={"fullname"}
          />

          <FormInput
            label="Contact Phone Number"
            placeholder="07000000000"
            icon={CONSTANT.icon.user}
            mode={CONSTANT.input_mode.text}
            form={form}
            setForm={setForm}
            name={"phone"}
          />
        </View>

        <AppButton
          title="Update Profile"
          onPress={_updateProfile}
          isLoading={isLoading}
        />
      </ScrollWrapper>

      {/**create pass success */}
      <SuccessCard
        isSuccessful={updateProfileIsSuccessful}
        setIsSuccessful={setUpdateProfileIsSuccessful}
        dismissByCount={true}
        dismissCount={1}
        title="Update Profile Successful"
        description="You have made few changes to your profile information. Do ensure the information provided are accurate and reliable."
        buttonTitle="Continue"
      />
    </SafeAreaWrapper>
  );
}

const SubComponent = ({ name = "Option", value = "This is the value" }) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    component: {
      width: "100%",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: CONSTANT.dimension.m,
    },
    name: {
      width: 120,
    },
    value: {
      flex: 1,
    },
  });

  return (
    <View style={styles.component}>
      <CustomText type="h5" style={styles.name}>
        {name}
      </CustomText>

      <TouchableOpacity style={styles.value}>
        <CustomText type="p" right>
          {value}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};
