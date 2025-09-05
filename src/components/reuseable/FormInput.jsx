import { Feather } from "@expo/vector-icons";
import { memo, useEffect, useState } from "react";
import {
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { CONSTANT } from "../../utils";
import CustomText from "./CustomText";

const FormInput = ({
  type = "text",
  mode,
  value,
  label,
  placeholder,
  icon,
  form,
  name,
  setForm = () => {},
  onPress = () => {},
  disabled = false,
  danger = false,
}) => {
  return (
    <>
      {type === "text" && (
        <FormInputText
          label={label}
          placeholder={placeholder}
          icon={icon}
          mode={mode}
          disabled={disabled}
          value={value}
          form={form}
          name={name}
          setForm={setForm}
        />
      )}

      {type === "switch" && (
        <FormInputSwitch
          label={label}
          placeholder={placeholder}
          icon={icon}
          value={value}
          onPress={onPress}
          disabled={disabled}
          danger={danger}
        />
      )}
    </>
  );
};

export default memo(FormInput);

const FormInputText = ({
  label = "",
  placeholder = "Type here",
  icon = "info",
  mode = "text",
  disabled = false,
  value,
  form = {},
  name = "",
  setForm = () => {},
}) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    component: {
      width: "100%",
      gap: CONSTANT.dimension.xs,
    },
    label: {
      color: CONSTANT.color[theme].black,
    },
    tab: {
      width: "100%",
      height: 48,
      paddingHorizontal: CONSTANT.dimension.m,
      flexDirection: "row",
      alignItems: "center",
      borderRadius: CONSTANT.dimension.s,
      borderWidth: 0.8,
    },
    icon: {
      width: 24,
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    input: {
      height: "100%",
      paddingLeft: CONSTANT.dimension.xs,
      flex: 1,
      fontSize: CONSTANT.f_size.m,
      fontWeight: CONSTANT.f_weight.regular,
      color: CONSTANT.color[theme].gray200,
    },
  });

  const formValue = Boolean(name) ? form[name] : "";
  const isPassword = Boolean(mode === CONSTANT.input_mode.password);

  const [isTyping, setIsTyping] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (isPassword) {
      setIsHidden(true);
    }
  }, []);

  return (
    <View style={styles.component}>
      {Boolean(label) && (
        <CustomText type="h5" style={styles.label}>
          {label}
        </CustomText>
      )}

      <View
        style={[
          styles.tab,
          {
            borderColor: isTyping
              ? CONSTANT.color[theme].primary
              : CONSTANT.color[theme].gray50,
          },
        ]}
      >
        {/**icon */}
        <View style={styles.icon}>
          <Feather
            name={icon}
            size={CONSTANT.f_size.b}
            color={
              formValue
                ? CONSTANT.color[theme].primary
                : CONSTANT.color[theme].gray100
            }
          />
        </View>

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={CONSTANT.color[theme].gray100}
          inputMode={mode}
          style={styles.input}
          value={value || formValue}
          secureTextEntry={isPassword ? isHidden : false}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, [name]: String(text) }))
          }
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(false)}
          editable={!disabled}
        />

        {Boolean(isPassword) && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setIsHidden((prev) => !prev)}
          >
            <Feather
              name={isHidden ? CONSTANT.icon.eye : CONSTANT.icon.eye_off}
              size={CONSTANT.f_size.b}
              color={CONSTANT.color[theme].gray100}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const FormInputSwitch = ({
  label,
  placeholder,
  icon,
  value = false,
  onPress = () => {},
  disabled = false,
  danger = false,
}) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    wrapper: {
      gap: CONSTANT.dimension.xxs,
    },
    component: {
      width: "100%",
      height: 38,
      flexDirection: "row",
      alignItems: "center",
      gap: CONSTANT.dimension.m,
    },
    label: {
      color: CONSTANT.color[theme].black,
    },
    switch: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
    },
  });

  const _clickSwitch = () => {
    if (disabled) return;

    onPress();
  };

  return (
    <View style={styles.component}>
      {icon && (
        <Feather
          name={icon || "info"}
          size={CONSTANT.f_size.b}
          color={
            danger ? CONSTANT.color[theme].error : CONSTANT.color[theme].gray200
          }
        />
      )}

      <CustomText type="h5" style={styles.label}>
        {label}
      </CustomText>

      <View style={styles.switch}>
        <Switch
          thumbColor={
            Boolean(value)
              ? CONSTANT.color[theme].primary
              : CONSTANT.color[theme].white
          }
          trackColor={
            Boolean(value)
              ? CONSTANT.color[theme].primaryFaded
              : CONSTANT.color[theme].gray50
          }
          ios_backgroundColor={CONSTANT.color[theme].gray50}
          value={value}
          onValueChange={_clickSwitch}
        />
      </View>
    </View>
  );
};
