import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { SuccessCard } from "../../../components/card";
import { AppButton, FormInput } from "../../../components/reuseable";
import { SafeAreaWrapper, ScrollWrapper } from "../../../components/wrapper";
import { CONSTANT, DEBOUNCE } from "../../../utils";

export default function UpdateProfile() {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
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
        <View style={styles.block}>
          <FormInput
            label="Email Address"
            placeholder="youremail@example.com"
            icon={CONSTANT.icon.mail}
            mode={CONSTANT.input_mode.email}
            value={"thomasrain@gmail.com"}
            disabled
          />

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
