import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { SuccessCard } from "../../components/card";
import {
  AppButton,
  CustomText,
  FormInput,
  IconCard,
  TextLink,
} from "../../components/reuseable";
import { SafeAreaWrapper, ScrollWrapper } from "../../components/wrapper";
import { CONSTANT, DEBOUNCE } from "../../utils";

export default function VerifyEmail() {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    page: {
      paddingTop: CONSTANT.dimension.xb,
      gap: CONSTANT.dimension.xxb,
    },
    section: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      gap: CONSTANT.dimension.m,
    },
  });

  //--
  const { dir } = useLocalSearchParams();

  //--
  const email = "youremail@example.com";

  //--
  const [form, setForm] = useState({
    otp: "",
    user_id: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const _submitForm = DEBOUNCE(async () => {
    const res = true;

    if (res) {
      setIsVerified(true);
    }
  });

  //--
  const afterPaths = {
    "": {
      path: "/(tabs)/",
      dismissAll: true,
    },
    "sign-up": {
      path: "/(tabs)/",
      dismissAll: true,
    },
    "forgot-password": {
      path: "/auth/new-password/",
      dismissByCount: true,
      dismissCount: 1,
    },
  };

  return (
    <SafeAreaWrapper showHeader={true}>
      <Stack.Screen options={{ animation: "slide_from_bottom" }} />

      <ScrollWrapper containerStyle={styles.page}>
        <View style={styles.section}>
          <IconCard icon={CONSTANT.icon.shield} />
        </View>

        <View style={styles.section}>
          <CustomText type="h3" center>
            Verification Code
          </CustomText>
          <CustomText center>
            Enter the verification code that was sent to: {`\n`}
            <TextLink text={email} />
          </CustomText>
        </View>

        <FormInput
          placeholder={"Enter verification code"}
          mode={CONSTANT.input_mode.numeric}
          icon={CONSTANT.icon.shield}
          form={form}
          setForm={setForm}
          name={"otp"}
        />

        <View style={styles.section}>
          <AppButton
            title="Submit"
            onPress={_submitForm}
            isLoading={isLoading}
            isDisabled={Boolean(!form?.otp)}
          />

          <CustomText center>
            Didn't get the code? <TextLink text="Resend" />
          </CustomText>
        </View>
      </ScrollWrapper>

      {/**success */}
      <SuccessCard
        isSuccessful={isVerified}
        setIsSuccessful={setIsVerified}
        path={afterPaths[dir]?.path}
        title="Verification Successful"
        buttonTitle="Continue"
        dismissAll={afterPaths[dir]?.dismissAll || false}
        dismissByCount={afterPaths[dir]?.dismissByCount || false}
        dismissCount={afterPaths[dir]?.dismissCount || 0}
      />
    </SafeAreaWrapper>
  );
}
