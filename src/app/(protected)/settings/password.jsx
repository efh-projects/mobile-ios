import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { SuccessCard } from "../../../components/card";
import { AppButton, FormInput } from "../../../components/reuseable";
import { SafeAreaWrapper, ScrollWrapper } from "../../../components/wrapper";
import { CONSTANT, DEBOUNCE } from "../../../utils";

export default function UpdatePassword() {
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
    pass: "",
    new_pass: "",
    confirm_pass: "",
  });

  const [updatePassIsSuccessful, setUpdatePassIsSuccessful] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const _updatePass = DEBOUNCE(async () => {
    const res = true;

    if (res) {
      setUpdatePassIsSuccessful(true);
    }
  });

  return (
    <SafeAreaWrapper showHeader={true}>
      <ScrollWrapper>
        <View style={styles.block}>
          <FormInput
            label="Current Password"
            placeholder="What is your current password?"
            icon={CONSTANT.icon.lock}
            mode={CONSTANT.input_mode.password}
            form={form}
            setForm={setForm}
            name={"pass"}
          />

          <FormInput
            label="New Password"
            placeholder="Create a new password"
            icon={CONSTANT.icon.lock}
            mode={CONSTANT.input_mode.password}
            form={form}
            setForm={setForm}
            name={"new_pass"}
          />

          <FormInput
            label="Confirm Password"
            placeholder="Repeat the password"
            icon={CONSTANT.icon.lock}
            mode={CONSTANT.input_mode.password}
            form={form}
            setForm={setForm}
            name={"confirm_pass"}
          />
        </View>

        <AppButton
          title="Update Password"
          onPress={_updatePass}
          isLoading={isLoading}
        />
      </ScrollWrapper>

      {/**create pass success */}
      <SuccessCard
        isSuccessful={updatePassIsSuccessful}
        setIsSuccessful={setUpdatePassIsSuccessful}
        dismissByCount={true}
        dismissCount={1}
        title="Update Password Successful"
        description="Your password has been updated successfully. For your acocunt safety, do not share this with anybody."
        buttonTitle="Continue"
      />
    </SafeAreaWrapper>
  );
}
