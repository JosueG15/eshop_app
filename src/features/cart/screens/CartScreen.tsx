import { useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text, useTheme } from "@rneui/themed";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import CartItemRow from "../components/CartItemRow";
import TotalContainer from "../components/TotalContainer";
import ButtonContainer from "../components/ButtonContainer";

const CartScreen: React.FC = () => {
  const { theme } = useTheme();
  const { colors } = theme;
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalPrice = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          padding: 10,
          backgroundColor: colors.background,
        },
        scrollView: {
          flex: 1,
        },
        emptyText: {
          fontSize: 18,
          textAlign: "center",
          marginTop: 20,
          color: colors.secondary,
        },
        bottomSection: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          borderTopWidth: 1,
          borderTopColor: colors.borderColor,
        },
      }),
    [colors]
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text
          style={styles.emptyText}
          accessibilityLabel="Tu carrito esta vacio"
        >
          Tu carrito esta vacio.
        </Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => <CartItemRow item={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ flexGrow: 1 }}
          />
          <View style={styles.bottomSection}>
            <TotalContainer totalPrice={totalPrice} />
            <ButtonContainer />
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;
