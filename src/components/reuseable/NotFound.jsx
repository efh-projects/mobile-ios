import { memo } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { CONSTANT } from "../../utils";

const NotFound = ({
  text = "Not found",
  isLoading = true,
  loaderType = "",
}) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    block: {
      width: "100%",
      minHeight: 100,
      alignItems: "center",
      justifyContent: "center",
      gap: CONSTANT.dimension.m,
    },
    text: {
      paddingHorizontal: CONSTANT.dimension.m,
      fontSize: CONSTANT.f_size.s,
      fontWeight: CONSTANT.f_weight.regular,
      color: CONSTANT.color[theme].gray200,
    },
  });

  //--
  const dummyArr = ["1", "2", "3"];

  return (
    <>
      <View style={styles.block}>
        {isLoading ? (
          <>
            {Boolean(loaderType === "faq") ? (
              dummyArr?.map((item, index) => <FaqLoader key={index} />)
            ) : Boolean(loaderType === "transaction") ? (
              dummyArr?.map((item, index) => <TransactionLoader key={index} />)
            ) : Boolean(loaderType === "package") ? (
              dummyArr?.map((item, index) => <PackageLoader key={index} />)
            ) : Boolean(loaderType === "package-transaction") ? (
              dummyArr?.map((item, index) => (
                <PackageTransactionLoader key={index} />
              ))
            ) : (
              <ActivityIndicator
                size={CONSTANT.dimension.m}
                color={CONSTANT.color[theme].gray100}
              />
            )}
          </>
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}
      </View>
    </>
  );
};

export default memo(NotFound);

const FaqLoader = () => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    component: {
      width: "100%",
      marginBottom: CONSTANT.dimension.m,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: CONSTANT.dimension.m,
    },
    text: {
      width: "80%",
      height: CONSTANT.dimension.xs,
      backgroundColor: CONSTANT.color[theme].gray50,
      borderRadius: CONSTANT.dimension.s,
    },
    dot: {
      width: CONSTANT.dimension.xs,
      height: CONSTANT.dimension.xs,
      backgroundColor: CONSTANT.color[theme].gray50,
      borderRadius: CONSTANT.dimension.s,
    },
  });

  return (
    <View style={styles.component}>
      <View style={styles.text} />
      <View style={styles.dot} />
    </View>
  );
};

const TransactionLoader = () => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    component: {
      width: "100%",
      marginBottom: CONSTANT.dimension.m,
      flexDirection: "row",
      alignItems: "center",
      gap: CONSTANT.dimension.xs,
    },
    icon: {
      width: CONSTANT.dimension.xxb,
      height: CONSTANT.dimension.xxb,
      backgroundColor: CONSTANT.color[theme].gray50,
      borderRadius: CONSTANT.dimension.round,
    },
    detail: {
      flex: 1,
      gap: CONSTANT.dimension.xs,
    },
    text: {
      height: CONSTANT.dimension.xs,
      backgroundColor: CONSTANT.color[theme].gray50,
      borderRadius: CONSTANT.dimension.s,
    },
  });

  return (
    <View style={styles.component}>
      <View style={styles.icon} />

      <View style={styles.detail}>
        <View style={[styles.text, { width: "80%" }]} />
        <View style={[styles.text, { width: "30%" }]} />
      </View>
    </View>
  );
};

const PackageLoader = () => {
  const theme = useSelector((state) => state.app.theme);
  const m = CONSTANT.dimension.m;
  const styles = StyleSheet.create({
    split: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: m,
    },
    component: {
      width: CONSTANT.dimension.w_split(2, m, m * 2),
      height: 150,
      padding: CONSTANT.dimension.m,
      justifyContent: "space-between",
      backgroundColor: CONSTANT.color[theme].white,
      borderRadius: CONSTANT.dimension.m,
    },
    top: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    detail: {
      width: "100%",
      gap: CONSTANT.dimension.xxs,
    },
    dot: {
      width: CONSTANT.dimension.m,
      height: CONSTANT.dimension.m,
      backgroundColor: CONSTANT.color[theme].gray50,
      borderRadius: CONSTANT.dimension.s,
    },
    text: {
      height: CONSTANT.dimension.xs,
      backgroundColor: CONSTANT.color[theme].gray50,
      borderRadius: CONSTANT.dimension.s,
    },
  });

  const SingleItem = () => {
    return (
      <View style={styles.component}>
        <View style={styles.top}>
          <View style={styles.dot} />
          <View style={[styles.text, { width: "35%" }]} />
        </View>

        <View style={styles.detail}>
          <View style={[styles.text, { width: "80%" }]} />
          <View style={[styles.text, { width: "20%" }]} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.split}>
      <SingleItem />
      <SingleItem />
    </View>
  );
};

const PackageTransactionLoader = () => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    component: {
      width: "100%",
      paddingVertical: CONSTANT.dimension.xxs,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: CONSTANT.dimension.m,
    },
    split: {
      flex: 1,
    },
    text: {
      height: CONSTANT.dimension.xs,
      backgroundColor: CONSTANT.color[theme].gray50,
      borderRadius: CONSTANT.dimension.s,
    },
  });

  return (
    <View style={styles.component}>
      <View style={styles.split}>
        <View style={[styles.text, { width: "70%" }]} />
      </View>

      <View style={styles.split}>
        <View
          style={[styles.text, { width: "60%", marginHorizontal: "auto" }]}
        />
      </View>

      <View style={styles.split}>
        <View style={[styles.text, { width: "80%", marginLeft: "auto" }]} />
      </View>
    </View>
  );
};
