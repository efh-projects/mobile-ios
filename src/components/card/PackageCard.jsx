import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { memo, useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { CONSTANT, DEBOUNCE } from "../../utils";
import { AppButton, CustomText, NotFound } from "../reuseable";
import { ListWrapper, PopupModalWrapper } from "../wrapper";

const PackageCard = ({ data = {} }) => {
  const theme = useSelector((state) => state.app.theme);
  const m = CONSTANT.dimension.m;
  const styles = StyleSheet.create({
    card: {
      maxWidth: CONSTANT.dimension.w_split(2, m, m * 2),
      height: 150,
      padding: CONSTANT.dimension.m,
      flex: 1,
      justifyContent: "space-between",
      backgroundColor: CONSTANT.color[theme].white,
      borderRadius: CONSTANT.dimension.m,
    },
    top: {
      width: "100%",
      paddingLeft: CONSTANT.dimension.xxs,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderLeftWidth: 1.3,
      borderLeftColor: CONSTANT.color[theme].gray100,
    },
    detail: {
      width: "100%",
      gap: CONSTANT.dimension.xxs,
    },
  });

  //--
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.card}
        onPress={() => setModalVisible(true)}
      >
        {/**status */}
        <View style={styles.top}>
          <Feather
            name="box"
            size={CONSTANT.f_size.b}
            color={CONSTANT.color[theme].gray100}
          />
          <CustomText type="sp">in-progress</CustomText>
        </View>

        {/**detail */}
        <View style={styles.detail}>
          <CustomText type="p" numberOfLines={2} uppercase>
            Birthday Hair Plan
          </CustomText>

          <CustomText type="h4" numberOfLines={2}>
            {CONSTANT.icon.naira} 350K
          </CustomText>
        </View>
      </TouchableOpacity>

      {/**details */}
      {modalVisible && (
        <PackageDetailComponent
          isVisible={modalVisible}
          setIsVisible={setModalVisible}
        />
      )}
    </>
  );
};

export default memo(PackageCard);

const PackageDetailComponent = ({
  isVisible = false,
  setIsVisible = () => {},
  data = {},
}) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    modal: {
      gap: CONSTANT.dimension.m,
    },
    transactions: {
      marginTop: CONSTANT.dimension.m,
      gap: CONSTANT.dimension.m,
    },
    action: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: CONSTANT.dimension.m,
    },
    actionSplit: {
      flex: 1,
    },
  });

  //--handle transactions
  const [transactions, setTransactions] = useState();
  const [meta, setMeta] = useState();

  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const _fetchTransactions = DEBOUNCE(async (page) => {
    setTransactions();
    return new Promise((resolve) => {
      setTransactionsLoading(true);
      setTimeout(() => {
        setTransactions(["1", "2", "3", "4", "5", "6", "7"]);
        setMeta({ has_next_page: false, page: 1 });
        setTransactionsLoading(false);
        resolve();
      }, 3000);
    });
  });

  useFocusEffect(
    useCallback(() => {
      _fetchTransactions(1);
    }, [])
  );

  return (
    <>
      <PopupModalWrapper
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        containerStyle={styles.modal}
        showBackDrop
      >
        {/**status */}
        <CustomText type="h5" right>
          status:{" "}
          <Text style={{ color: CONSTANT.color[theme].warning }}>
            in-progress
          </Text>
        </CustomText>

        {/**title */}
        <CustomText type="h3" uppercase>
          Birthday Hair Plan
        </CustomText>

        {/**show only if description exists */}
        <CustomText type="p">
          Don't forget to waybill it to Abuja as your sister would have
          relocated by the time you complete the package.
        </CustomText>

        {/**amount and deadline */}
        <AmountComponent />

        {/**action button */}
        <View style={styles.action}>
          <View style={styles.actionSplit}>
            <AppButton
              title="Close"
              type="error"
              hasIcon
              icon={
                <Feather
                  name={CONSTANT.icon.x}
                  size={CONSTANT.f_size.b}
                  color={CONSTANT.color.fixed.white}
                />
              }
            />
          </View>

          <View style={styles.actionSplit}>
            <AppButton
              title="Deposit"
              hasIcon
              icon={
                <Feather
                  name={CONSTANT.icon.plus}
                  size={CONSTANT.f_size.b}
                  color={CONSTANT.color.fixed.white}
                />
              }
            />
          </View>
        </View>

        {/**transaction history */}
        <View style={styles.transactions}>
          <CustomText type="h4">Transaction History</CustomText>

          {/**transactions */}
          <ListWrapper
            data={transactions}
            renderItem={({ item }) => <TransactionComponent data={item} />}
            keyExtractor={(item, index) => item.id || index.toString()}
            refreshFunc={() => {
              _fetchTransactions(1);
            }}
            canLoadMore={Boolean(meta && meta?.has_next_page)}
            loadMoreFunc={() => {
              _fetchTransactions(Number(meta?.page + 1));
            }}
            isLoading={transactionsLoading}
            ListEmptyComponent={
              <NotFound
                text={"No transaction found"}
                loaderType="package-transaction"
                isLoading={transactionsLoading}
              />
            }
            paddingBottom={CONSTANT.dimension.b}
          />
        </View>
      </PopupModalWrapper>
    </>
  );
};

const AmountComponent = ({}) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    component: {
      width: "100%",
      padding: CONSTANT.dimension.m,
      gap: CONSTANT.dimension.m,
      backgroundColor: CONSTANT.color[theme].gray50,
      borderRadius: CONSTANT.dimension.m,
    },
    item: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: CONSTANT.dimension.m,
    },
  });

  const Item = ({ name, value, bigValue, isAmount = false }) => {
    return (
      <View style={styles.item}>
        <CustomText type="p">{name}</CustomText>
        {isAmount ? (
          <CustomText type={"h5"} right>
            {value} /{" "}
            <CustomText type={"h3"} right>
              {bigValue}
            </CustomText>
          </CustomText>
        ) : (
          <CustomText type={"h5"} right>
            {value}
          </CustomText>
        )}
      </View>
    );
  };

  return (
    <View style={styles.component}>
      <Item name={"Started Since"} value={"10 Aug, 2025"} />
      <Item name={"Deadline"} value={"10 Dec, 2025"} />

      <Item
        name={"Amount"}
        value={CONSTANT.icon.naira + " 127,000"}
        bigValue={CONSTANT.icon.naira + " 347,000"}
        isAmount
      />
    </View>
  );
};

const TransactionComponent = ({ data = {} }) => {
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
  });

  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.component}>
      {/**date */}
      <View style={styles.split}>
        <CustomText type="p">12/05/2025</CustomText>
      </View>

      {/**status */}
      <View style={styles.split}>
        <CustomText
          type="p"
          style={{ color: CONSTANT.color[theme].success }}
          center
          lowercase
        >
          success
        </CustomText>
      </View>

      {/**amount */}
      <View style={styles.split}>
        <CustomText type="h5" right>
          {CONSTANT.icon.naira} 1,290,501
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};
