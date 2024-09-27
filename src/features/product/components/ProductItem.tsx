import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { IProduct } from "../../../shared/types/productType";
import ProductCard from "./ProductCard";
import { getContainerWidth } from "../../../shared/utils/styleUtil";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../shared/types/routeType";

interface ProductItemProps {
  product: IProduct;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const navigation = useNavigation<HomeNavigationProp>();

  return (
    <TouchableOpacity
      style={styles.productItemContainer}
      onPress={() => navigation.navigate("Product Detail", { item: product })}
    >
      <View style={styles.cardWrapper}>
        <ProductCard product={product} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productItemContainer: {
    width: "50%",
  },
  cardWrapper: {
    width: getContainerWidth(2) - 20,
  },
});

export default ProductItem;
