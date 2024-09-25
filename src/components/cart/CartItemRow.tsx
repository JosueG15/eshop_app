import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Button, useTheme, Icon } from "@rneui/themed";
import { CartItem } from "../../types/cart";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartQuantity,
} from "../../store/slices/cartSlice";
import { Swipeable } from "react-native-gesture-handler";
import QuantitySelectorModal from "./QuantitySelectorModal";

interface CartItemRowProps {
  item: CartItem;
}

const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleRemove = (quantityToRemove: number) => {
    if (quantityToRemove >= item.quantity) {
      dispatch(removeFromCart(item.id));
    } else {
      const newQuantity = item.quantity - quantityToRemove;
      dispatch(updateCartQuantity({ id: item.id, quantity: newQuantity }));
    }
    setModalVisible(false);
  };

  const renderRightActions = () => {
    return (
      <Button
        icon={<Icon name="trash" type="font-awesome" color="white" size={20} />}
        onPress={() => setModalVisible(true)}
        buttonStyle={[
          styles.deleteButton,
          { backgroundColor: theme.colors.error },
        ]}
      />
    );
  };

  return (
    <>
      <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.cartItemContainer}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <View style={styles.detailsContainer}>
            <Text style={[styles.itemName, { color: theme.colors.text }]}>
              {item.name}
            </Text>
            <Text style={[styles.itemPrice, { color: theme.colors.text }]}>
              ${item.price.toFixed(2)} x {item.quantity}
            </Text>
          </View>
        </View>
      </Swipeable>

      <QuantitySelectorModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleRemove}
        maxQuantity={item.quantity}
      />
    </>
  );
};

const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: 70,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CartItemRow;
