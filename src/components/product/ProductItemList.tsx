import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ProductItem from "./ProductItem";
import { IProduct } from "../../types/products";

interface ProductItemListProps {
  products: IProduct[];
}

const ProductItemList: React.FC<ProductItemListProps> = ({ products }) => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductItem product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  flatListContent: {
    flexGrow: 1,
  },
  columnWrapper: {
    justifyContent: "flex-start",
  },
});

export default ProductItemList;
