import { FlashList } from "@shopify/flash-list";
import { memo, useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useKeyboardHeight } from "../../hooks";
import { CONSTANT } from "../../utils";
import { NotFound } from "../reuseable";

const ListWrapper = ({
  data = [],
  renderItem,
  keyExtractor = (_, index) => index.toString(),
  refreshFunc = async () => {},
  loadMoreFunc = async () => {},
  canLoadMore = false,
  estimatedItemSize = 100,
  isLoading = false,
  ListEmptyComponent = <NotFound text="Not found" />,
  gapSize = CONSTANT.dimension.m,
  padding = 0,
  paddingTop = 0,
  paddingVertical = 0,
  paddingHorizontal = 0,
}) => {
  const keyboardHeight = useKeyboardHeight() || CONSTANT.dimension.set(64);

  const styles = StyleSheet.create({
    list: {
      padding: padding,
      paddingTop: paddingTop,
      paddingVertical: paddingVertical,
      paddingHorizontal: paddingHorizontal,
      paddingBottom: keyboardHeight,
    },
  });

  //--
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    if (refreshing) return;

    setRefreshing(true);
    try {
      await refreshFunc();
    } catch (error) {
      // HEADERS.error_extractor({
      //   message: "Something went wrong. Please try again",
      // });
    } finally {
      setRefreshing(false);
    }
  }, [refreshFunc]);

  const handleLoadMore = useCallback(() => {
    if (canLoadMore) {
      loadMoreFunc();
    }
  }, [loadMoreFunc]);

  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.list}
      estimatedItemSize={estimatedItemSize}
      showsVerticalScrollIndicator={false}
      onEndReached={loadMoreFunc ? handleLoadMore : null}
      onEndReachedThreshold={0.5} // Trigger loadMoreFunc when 50% from the end
      refreshing={refreshing}
      onRefresh={refreshFunc ? handleRefresh : null}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={
        Boolean(canLoadMore && isLoading) ? ListEmptyComponent : null
      }
      ItemSeparatorComponent={() => <View style={{ height: gapSize }} />}
    />
  );
};

export default memo(ListWrapper);
