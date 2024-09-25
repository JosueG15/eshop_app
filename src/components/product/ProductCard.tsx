import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { IProduct } from "../../types/products";
import { truncateText } from "../../utils/string";
import { getContainerWidth } from "../../utils/screen";
import { useTheme, Icon } from "@rneui/themed";

const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => {
  const { name, price, image, countInStock } = product;
  const truncatedName = truncateText(name, 15);
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.productCard,
        {
          backgroundColor: theme.colors.cardBackground,
          shadowColor: theme.colors.cardShadow,
          borderColor:
            theme.mode === "light" ? "#ddd" : theme.colors.background,
        },
      ]}
    >
      <Image
        style={styles.productImage}
        resizeMode="contain"
        source={{ uri: image || "https://placehold.co/500x600/png" }}
      />
      <View style={styles.cardContent}>
        <Text style={[styles.productTitle, { color: theme.colors.primary }]}>
          {truncatedName}
        </Text>
        <Text style={[styles.productPrice, { color: theme.colors.primary }]}>
          ${price.toFixed(2)}
        </Text>

        {countInStock > 0 ? (
          <TouchableOpacity
            style={[
              styles.addButton,
              {
                backgroundColor: theme.colors.primary,
                shadowColor: theme.colors.cardShadow,
              },
            ]}
          >
            <Icon
              name="cart-plus"
              type="font-awesome"
              color={theme.colors.white}
              size={18}
            />
            <Text style={[styles.addButtonText, { color: theme.colors.white }]}>
              {" "}
              Add to Cart{" "}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={[styles.unavailableText, { color: theme.colors.error }]}>
            Currently Unavailable
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: getContainerWidth(2) - 20,
    padding: 15,
    borderRadius: 16,
    marginVertical: 10,
    alignItems: "center",
    elevation: 6,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 1, height: 3 },
    borderWidth: 1,
  },
  productImage: {
    width: getContainerWidth(2) - 30,
    height: getContainerWidth(2) - 50,
    marginBottom: 10,
  },
  cardContent: {
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
  },
  productTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    width: "100%",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 10,
  },
  unavailableText: {
    marginTop: 10,
    fontWeight: "500",
  },
});

export default ProductCard;
