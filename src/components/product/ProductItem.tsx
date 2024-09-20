import { TouchableOpacity, View, StyleSheet } from "react-native";
import { IProduct } from "../../types/products";
import ProductCard from "./ProductCard";
import { getContainerWidth } from "../../utils/screen";

const ProductItem: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <TouchableOpacity style={styles.productItemContainer}>
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
    width: getContainerWidth(2),
  },
});

export default ProductItem;
