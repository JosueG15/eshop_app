import { StyleSheet, View, Image, Text, Button } from "react-native";
import { IProduct } from "../../types/products";
import { truncateText } from "../../utils/string";
import { getContainerWidth } from "../../utils/screen";

const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => {
  const { name, price, image, countInStock } = product;
  const truncatedName = truncateText(name, 15);

  return (
    <View style={styles.productCard}>
      <Image
        style={styles.productImage}
        resizeMode="contain"
        source={{ uri: image || "https://placehold.co/500x600/png" }}
      />
      <View style={styles.cardContent} />
      <Text style={styles.productTitle}>{truncatedName}</Text>
      <Text style={styles.productPrice}>{price}</Text>

      {countInStock > 0 ? (
        <View>
          <Button title="Add" color="green" />
        </View>
      ) : (
        <Text style={styles.unavailableText}>Currently Unavailable</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: getContainerWidth(2) - 20,
    height: getContainerWidth(1.7),
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    backgroundColor: "white",
  },
  productImage: {
    width: getContainerWidth(2) - 30,
    height: getContainerWidth(2) - 50,
    backgroundColor: "transparent",
    position: "absolute",
    top: -45,
  },
  cardContent: {
    marginBottom: 10,
    height: getContainerWidth(2) - 90,
    backgroundColor: "transparent",
    width: getContainerWidth(2) - 30,
  },
  productTitle: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 20,
    color: "orange",
    marginTop: 10,
  },
  unavailableText: {
    marginTop: 20,
    color: "red",
    fontWeight: "bold",
  },
});

export default ProductCard;
