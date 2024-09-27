import React, { useMemo } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  FlatList,
  RefreshControl,
} from "react-native";
import { useTheme } from "@rneui/themed";
import {
  IProduct,
  IProductQueryParams,
} from "../../../shared/types/productType";
import ProductItem from "./ProductItem";
import { useProducts } from "../hooks/useProducts";

interface ProductListProps {
  params: IProductQueryParams;
  ListHeaderComponent?: () => React.ReactElement;
}

const ProductList: React.FC<ProductListProps> = ({
  params,
  ListHeaderComponent,
}) => {
  const { theme } = useTheme();
  const { colors } = theme;

  const {
    data,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useProducts(params);

  const products = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  );

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  const renderItem = ({ item }: { item: IProduct }) => (
    <ProductItem product={item} />
  );

  const keyExtractor = (item: IProduct) => item.id.toString();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        loader: {
          justifyContent: "center",
          alignSelf: "center",
          marginVertical: 20,
        },
        emptyMessage: {
          textAlign: "center",
          color: colors.secondary,
          fontSize: 18,
          marginTop: 20,
        },
        contentContainer: {
          paddingHorizontal: 10,
          paddingBottom: 20,
        },
      }),
    [colors.secondary]
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator
            size="large"
            color={colors.secondary}
            style={styles.loader}
            accessibilityLabel="Cargando mas productos"
          />
        ) : null
      }
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={handleRefresh}
          colors={[colors.secondary]}
        />
      }
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={
        <Text style={styles.emptyMessage}>
          {isError
            ? `Error al obtener los productos: ${
                error?.message || "Error desconocido"
              }`
            : "¡Ups! No hay productos disponibles en este momento."}
        </Text>
      }
    />
  );
};

export default React.memo(ProductList);
