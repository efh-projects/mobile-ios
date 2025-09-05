import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { SuccessCard } from "../../components/card";
import {
  AppButton,
  CustomText,
  FormInput,
  TextLink,
} from "../../components/reuseable";
import TermsPolicyModal from "../../components/TermsPolicyModal";
import { PopupModalWrapper, SafeAreaWrapper } from "../../components/wrapper";
import { CONSTANT, DEBOUNCE } from "../../utils";

export default function Main() {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    page: {
      padding: CONSTANT.dimension.m,
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: CONSTANT.color[theme].primary,
    },
    data: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      gap: CONSTANT.dimension.m,
    },
    logo: {
      width: 100,
      height: 100,
      backgroundColor: CONSTANT.color[theme].gray50,
      borderRadius: CONSTANT.dimension.round,
    },
    appname: {
      color: CONSTANT.color[theme].white,
      fontWeight: CONSTANT.f_weight.bold,
    },
  });

  return (
    <SafeAreaWrapper style={styles.page} statusMode={"light"}>
      <View />

      {/**app logo */}
      <View style={styles.data}>
        <View style={styles.logo} />
        <CustomText type="h3" style={styles.appname} center>
          Custom App Name
        </CustomText>
      </View>

      {/**auth */}
      <AuthComponent />
    </SafeAreaWrapper>
  );
}

const AuthComponent = ({}) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    component: {
      width: "100%",
      paddingVertical: CONSTANT.dimension.b,
      paddingHorizontal: CONSTANT.dimension.m,
      gap: CONSTANT.dimension.b,
      borderRadius: CONSTANT.dimension.b,
      backgroundColor: CONSTANT.color[theme].white,
    },
    top: {
      width: "100%",
      gap: CONSTANT.dimension.m,
    },
    seperator: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: CONSTANT.dimension.m,
    },
    seperatorLine: {
      flex: 1,
      height: 0.8,
      backgroundColor: CONSTANT.color[theme].gray50,
    },
  });

  //--handle sign in, sign up and forgot password
  const [signInIsVisible, setSignInIsVisible] = useState(false);

  const [signUpIsVisible, setSignUpIsVisible] = useState(false);
  const [signUpIsSuccessful, setSignUpIsSuccessful] = useState(false);

  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);

  return (
    <>
      <View style={styles.component}>
        <View style={styles.top}>
          <AppButton
            title="Sign In To Account"
            onPress={() => setSignInIsVisible(true)}
          />

          <CustomText center>
            Don't have an account?{" "}
            <TextLink text="Sign Up" onPress={() => setSignUpIsVisible(true)} />
          </CustomText>
        </View>

        {/**or */}
        <View style={styles.seperator}>
          <View style={styles.seperatorLine} />
          <CustomText>Or continue with</CustomText>
          <View style={styles.seperatorLine} />
        </View>

        {/**oauth */}
        <OAuthComponent />
      </View>

      {/**signin modal */}
      <SignInModal
        isVisible={signInIsVisible}
        setIsVisible={setSignInIsVisible}
        setForgotPasswordVisible={setForgotPasswordVisible}
      />

      {/**signup modal */}
      <SignUpModal
        isVisible={signUpIsVisible}
        setIsVisible={setSignUpIsVisible}
        setIsSuccessful={setSignUpIsSuccessful}
      />

      {/**signup success */}
      <SuccessCard
        isSuccessful={signUpIsSuccessful}
        setIsSuccessful={setSignUpIsSuccessful}
        path={"/auth/verify/?dir=sign-up"}
        pushRoute
        title="Sign Up Successful"
        description="Account has been created successfully. Proceed to verify your email"
        buttonTitle="Continue"
      />

      {/**forgot password modal */}
      <ForgotPasswordModal
        isVisible={forgotPasswordVisible}
        setIsVisible={setForgotPasswordVisible}
      />
    </>
  );
};

const OAuthComponent = ({}) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    oauthTab: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: CONSTANT.dimension.m,
    },
    button: {
      flex: 1,
    },
  });

  //--##--sign in wit apple--##--//

  //--##--sign in wit google--##--//

  return (
    <View style={styles.oauthTab}>
      {/**sign in with apple */}
      <View style={styles.button}>
        <AppButton
          title="Apple"
          hasIcon
          icon={
            <MaterialCommunityIcons
              name="apple"
              size={CONSTANT.f_size.b}
              color={CONSTANT.color[theme].primary}
            />
          }
          type="secondary"
        />
      </View>

      {/**sign in with google */}
      <View style={styles.button}>
        <AppButton
          title="Google"
          hasIcon
          icon={
            <MaterialCommunityIcons
              name="google"
              size={CONSTANT.f_size.b}
              color={CONSTANT.color[theme].primary}
            />
          }
          type="secondary"
        />
      </View>
    </View>
  );
};

const SignInModal = ({
  isVisible = false,
  setIsVisible = () => {},
  setForgotPasswordVisible = () => {},
}) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    block: {
      width: "100%",
      gap: CONSTANT.dimension.m,
      paddingBottom: CONSTANT.dimension.xxb,
    },
    password: {
      gap: CONSTANT.dimension.xs,
    },
  });

  //--
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const _signIn = DEBOUNCE(async () => {
    const res = true;

    if (res) {
      setTimeout(() => {
        setIsVisible(false);
      }, 200);

      router.dismissTo("/(tabs)/");
    }
  });

  return (
    <PopupModalWrapper isVisible={isVisible} setIsVisible={setIsVisible}>
      <View style={styles.block}>
        <FormInput
          label="Email"
          placeholder="youremail@example.com"
          icon={CONSTANT.icon.mail}
          mode={CONSTANT.input_mode.email}
          form={form}
          setForm={setForm}
          name={"email"}
        />

        <View style={styles.password}>
          <FormInput
            label="Password"
            placeholder="Enter your password"
            icon={CONSTANT.icon.lock}
            mode={CONSTANT.input_mode.password}
            form={form}
            setForm={setForm}
            name={"password"}
          />

          <CustomText right>
            <TextLink
              text="Forgot Password?"
              onPress={() => {
                setForgotPasswordVisible(true);
                setIsVisible(false);
              }}
            />
          </CustomText>
        </View>
      </View>

      <AppButton title="Sign In" onPress={_signIn} isLoading={isLoading} />

      {/**terms modal */}
      <TermsPolicyModal />
    </PopupModalWrapper>
  );
};

const SignUpModal = ({
  isVisible = false,
  setIsVisible = () => {},
  setIsSuccessful = () => {},
}) => {
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
    email: "",
    pass: "",
    confirm_pass: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const _signUp = DEBOUNCE(async () => {
    const res = true;

    if (res) {
      setTimeout(() => {
        setIsVisible(false);
      }, 200);

      setIsSuccessful(true);
    }
  });

  return (
    <PopupModalWrapper
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      onCloseFunc={() => setIsSuccessful(false)}
    >
      <View style={styles.block}>
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

        <FormInput
          label="Email"
          placeholder="youremail@example.com"
          icon={CONSTANT.icon.mail}
          mode={CONSTANT.input_mode.email}
          form={form}
          setForm={setForm}
          name={"email"}
        />

        <FormInput
          label="Password"
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

      <AppButton title="Sign Up" onPress={_signUp} isLoading={isLoading} />

      {/**terms modal */}
      <TermsPolicyModal />
    </PopupModalWrapper>
  );
};

const ForgotPasswordModal = ({
  isVisible = false,
  setIsVisible = () => {},
}) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    block: {
      width: "100%",
      paddingBottom: CONSTANT.dimension.xxb,
    },
  });

  //--
  const [form, setForm] = useState({
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const _checkEmail = DEBOUNCE(async () => {
    const res = true;

    if (res) {
      setTimeout(() => {
        setIsVisible(false);
      }, 200);

      router.push("/auth/verify/?dir=forgot-password");
    }
  });

  return (
    <PopupModalWrapper isVisible={isVisible} setIsVisible={setIsVisible}>
      <View style={styles.block}>
        <FormInput
          label="Email"
          placeholder="Enter your account email"
          icon={CONSTANT.icon.mail}
          mode={CONSTANT.input_mode.email}
          form={form}
          setForm={setForm}
          name={"email"}
        />
      </View>

      <AppButton
        title="Verify Email"
        onPress={_checkEmail}
        isLoading={isLoading}
      />
    </PopupModalWrapper>
  );
};
