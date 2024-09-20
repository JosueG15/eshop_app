import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { useProducts } from "../../hooks/useProduct";
import ProductItem from "../../components/product/ProductItem";
import { IProduct } from "../../types/products";

const ProductContainer = () => {
  const { data: productListResponse, isLoading, isError } = useProducts();

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError) {
    return <Text>Error fetching products</Text>;
  }

  const products = productListResponse?.data ?? [];

  const renderProductItem = ({ item }: { item: IProduct }) => (
    <ProductItem product={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: "gainsboro",
  },
});

export default ProductContainer;
