import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, useTheme } from "@rneui/themed";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CartItemRow from "../../components/cart/CartItemRow";
import TotalContainer from "../../components/cart/TotalContainer";
import ButtonContainer from "../../components/cart/ButtonContainer";

const CartScreen: React.FC = () => {
  const { theme } = useTheme();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {cartItems.length === 0 ? (
        <Text style={[styles.emptyText, { color: theme.colors.text }]}>
          Tu carrito esta vacio.
        </Text>
      ) : (
        <>
          <ScrollView style={styles.scrollView}>
            {cartItems.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </ScrollView>
          <View
            style={[
              styles.bottomSection,
              { borderTopColor: theme.colors.borderColor },
            ]}
          >
            <TotalContainer totalPrice={totalPrice} />
            <ButtonContainer />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollView: {
    flex: 1,
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
  },
});

export default CartScreen;
