import React, { useMemo, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  FlatList,
  RefreshControl,
} from "react-native";
import { useTheme } from "@rneui/themed";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "./ProductItem";

import {
  IProduct,
  IProductQueryParams,
} from "../../../shared/types/productType";
import {
  fetchProducts,
  resetProducts,
} from "../../../store/slices/product/productSlice";
import { AppDispatch, RootState } from "../../../store/store";

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
  const dispatch = useDispatch<AppDispatch>();

  const { products, page, totalPages, isLoading, isError, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts(params));

    return () => {
      dispatch(resetProducts());
    };
  }, [dispatch, params]);

  const handleLoadMore = () => {
    if (page < totalPages && !isLoading) {
      dispatch(fetchProducts(params));
    }
  };

  const handleRefresh = () => {
    dispatch(resetProducts());
    dispatch(fetchProducts(params));
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
        isLoading ? (
          <ActivityIndicator
            size="large"
            color={colors.secondary}
            style={styles.loader}
            accessibilityLabel="Cargando más productos"
          />
        ) : null
      }
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={handleRefresh}
          colors={[colors.secondary]}
        />
      }
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={
        <Text style={styles.emptyMessage}>
          {isError
            ? `Error al obtener los productos: ${error || "Error desconocido"}`
            : !isLoading &&
              "¡Ups! No hay productos disponibles en este momento."}
        </Text>
      }
    />
  );
};

export default React.memo(ProductList);
