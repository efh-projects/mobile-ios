import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { CustomText } from "../../../components/reuseable";
import {
  PopupModalWrapper,
  SafeAreaWrapper,
  ScrollWrapper,
} from "../../../components/wrapper";
import { CONSTANT } from "../../../utils";

export default function ContactSupport() {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    page: {
      gap: CONSTANT.dimension.xxb * 2,
    },
    section: {
      width: "100%",
      gap: CONSTANT.dimension.m,
    },
  });

  return (
    <SafeAreaWrapper showHeader={true}>
      <ScrollWrapper containerStyle={styles.page}>
        {/**section */}
        <View style={styles.section}>
          <CustomText type="h3">Help & Support</CustomText>
          <CustomText type="p">
            Need assistance? Our support team is here for you. Choose a contact
            option to get the help you need fast and easy.
          </CustomText>
        </View>

        {/**section */}
        <View style={styles.section}>
          <CustomText type="h3">Frequently Asked Questions</CustomText>
          <CustomText type="p">
            Find quick answers to common questions. Explore our FAQs section for
            guidance before reaching out to support.
          </CustomText>

          {/**faq list */}
          <View>
            <FaqComponent />
          </View>
        </View>
      </ScrollWrapper>
    </SafeAreaWrapper>
  );
}

const FaqComponent = ({ data = {} }) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    component: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: CONSTANT.dimension.m,
    },
    title: {
      flex: 1,
    },
    detail: {
      gap: CONSTANT.dimension.m,
    },
  });

  const [faqVisible, setFaqVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.component}
        onPress={() => setFaqVisible(true)}
      >
        <View style={styles.title}>
          <CustomText type="h4" numberOfLines={1}>
            How to delete your account
          </CustomText>
        </View>

        <Feather
          name={faqVisible ? CONSTANT.icon.minus : CONSTANT.icon.plus}
          size={CONSTANT.f_size.b}
          color={CONSTANT.color[theme].gray200}
        />
      </TouchableOpacity>

      {/**faq detail */}
      <PopupModalWrapper
        isVisible={faqVisible}
        setIsVisible={setFaqVisible}
        containerStyle={styles.detail}
      >
        <CustomText type="h3">How to delete your account</CustomText>

        <CustomText type="p">
          To delete your account, visit the setting spage on your app and scroll
          till you see the 'permanently delect account' option. Click it and
          confirm action. Be warned, this action can not be undone
        </CustomText>
      </PopupModalWrapper>
    </>
  );
};
