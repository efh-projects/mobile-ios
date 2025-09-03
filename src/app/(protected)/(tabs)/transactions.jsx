import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { TransactionCard } from "../../../components/card";
import { CustomText, NotFound, TabHeader } from "../../../components/reuseable";
import { ListWrapper } from "../../../components/wrapper";
import { CONSTANT, DEBOUNCE } from "../../../utils";

export default function Transactions() {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: CONSTANT.color[theme].white,
    },
  });

  //--
  const [sort, setSort] = useState("All"); // All, Success, Pending, Failed

  //--handle transactions
  const [transactions, setTransactions] = useState();
  const [meta, setMeta] = useState();

  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const _fetchTransactions = DEBOUNCE(async (page) => {
    return new Promise((resolve) => {
      setTransactionsLoading(true);
      setTimeout(() => {
        setTransactions(["1", "2", "3"]);
        setMeta({ has_next_page: false, page: 1 });
        setTransactionsLoading(false);
        resolve();
      }, 3000);
    });
  });

  useEffect(() => {
    _fetchTransactions(1);
  }, [sort]);

  return (
    <View style={styles.page}>
      <TabHeader title="Transactions" />

      <FilterComponent sort={sort} setSort={setSort} />

      {/**transactions */}
      <ListWrapper
        data={transactions}
        renderItem={({ item }) => <TransactionCard data={item} />}
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
            text={"No transactions found"}
            loaderType="transaction"
            isLoading={transactionsLoading}
          />
        }
        gapSize={CONSTANT.dimension.b}
        paddingHorizontal={CONSTANT.dimension.m}
        paddingVertical={CONSTANT.dimension.m}
      />
    </View>
  );
}

const FilterComponent = ({ sort, setSort }) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    component: {
      width: "100%",
      padding: CONSTANT.dimension.m,
      flexDirection: "row",
      alignItems: "center",
      gap: CONSTANT.dimension.s,
      backgroundColor: CONSTANT.color[theme].white,
      borderBottomWidth: 0.3,
      borderBottomColor: CONSTANT.color[theme].gray50,
    },
    item: {
      borderRadius: CONSTANT.dimension.round,
    },
    text: {
      paddingVertical: CONSTANT.dimension.xs,
      paddingHorizontal: CONSTANT.dimension.m,
      fontWeight: CONSTANT.f_weight.semibold,
    },
    inactive: {
      backgroundColor: CONSTANT.color[theme].gray50,
    },
    active: {
      backgroundColor: CONSTANT.color[theme].primaryFaded,
    },
    inactiveText: {
      color: CONSTANT.color[theme].gray100,
    },
    activeText: {
      color: CONSTANT.color[theme].primary,
    },
  });

  const FilterItem = ({ value = "all" }) => {
    const isActive = String(sort).toLowerCase() === String(value).toLowerCase();

    return (
      <TouchableOpacity
        style={[styles.item, isActive ? styles.active : styles.inactive]}
        onPress={() => setSort(value)}
      >
        <CustomText
          type="sp"
          style={[
            styles.text,
            isActive ? styles.activeText : styles.inactiveText,
          ]}
        >
          {value}
        </CustomText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.component}>
      <FilterItem value="All" />
      <FilterItem value="Success" />
      <FilterItem value="Pending" />
      <FilterItem value="Failed" />
    </View>
  );
};
