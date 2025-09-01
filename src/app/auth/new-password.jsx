import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { SuccessCard } from "../../components/card";
import { AppButton, FormInput } from "../../components/reuseable";
import { SafeAreaWrapper, ScrollWrapper } from "../../components/wrapper";
import { CONSTANT, DEBOUNCE } from "../../utils";

export default function NewPassword() {
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
    confirm_pass: "",
  });

  const [createPassIsSuccessful, setCreatePassIsSuccessful] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const _createPass = DEBOUNCE(async () => {
    const res = true;

    if (res) {
      setCreatePassIsSuccessful(true);
    }
  });

  return (
    <SafeAreaWrapper showHeader={true}>
      <ScrollWrapper>
        <View style={styles.block}>
          <FormInput
            label="New Password"
            placeholder="Create a new password"
            icon={CONSTANT.icon.lock}
            mode={CONSTANT.input_mode.password}
            form={form}
            setForm={setForm}
            name={"pass"}
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
          title="Create Password"
          onPress={_createPass}
          isLoading={isLoading}
        />
      </ScrollWrapper>

      {/**create pass success */}
      <SuccessCard
        isSuccessful={createPassIsSuccessful}
        setIsSuccessful={setCreatePassIsSuccessful}
        path={"/auth/"}
        dismissAll
        title="Create Password Successful"
        description="Your new password has been created successfully. Continue to sign in."
        buttonTitle="Continue"
      />
    </SafeAreaWrapper>
  );
}
