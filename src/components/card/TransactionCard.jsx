import { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { CONSTANT } from "../../utils";
import { CustomText } from "../reuseable";

const TransactionCard = ({ data = {} }) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    component: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: CONSTANT.dimension.xs,
    },
    icon: {
      width: CONSTANT.dimension.xxb,
      height: CONSTANT.dimension.xxb,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: CONSTANT.color[theme].gray50,
      borderRadius: CONSTANT.dimension.round,
    },
    detail: {
      flex: 1,
      gap: CONSTANT.dimension.xxs,
    },
    holder: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    title: { color: CONSTANT.color[theme].gray200, flex: 1 },
    amount: {
      color: CONSTANT.color[theme].black,
      fontWeight: CONSTANT.f_weight.bold,
      width: 120,
    },
  });

  const statusColor = CONSTANT.color[theme].success;

  return (
    <TouchableOpacity style={styles.component} activeOpacity={0.6}>
      <View style={styles.icon}></View>
      <View style={styles.detail}>
        <View style={styles.holder}>
          <CustomText type="p" style={styles.title} numberOfLines={1}>
            Deposit To Birthday Hair Plan
          </CustomText>
          <CustomText type="h5" style={styles.amount} right>
            {CONSTANT.icon.naira} 16400.00
          </CustomText>
        </View>
        <View style={styles.holder}>
          <CustomText type="sp">4 Jun, 2025 · 09:43pm</CustomText>
          <CustomText type="sp" style={{ color: statusColor }}>
            success
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(TransactionCard);
