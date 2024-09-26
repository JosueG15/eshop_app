import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Button, useTheme } from "@rneui/themed";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import CartItemRow from "../../components/cart/CartItemRow";
import { RootState } from "../../store/store"; // Adjust this import to your store location
import SummarySection from "../../components/checkout/SummarySection";
import { CartItem } from "../../types/cart"; // Assuming CartItem type
import { ShippingInfo } from "../../types/cart"; // New type for shipping info
import {
  getPaymentMethodTitle,
  PaymentMethod,
} from "../../utils/paymentMethod";

const ConfirmScreen: React.FC = () => {
  const { theme } = useTheme();
  const { watch } = useFormContext<ShippingInfo>();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [
    phone,
    shippingAddress1,
    shippingAddress2,
    city,
    state,
    zipCode,
    paymentMethod,
  ] = watch([
    "phone",
    "shippingAddress1",
    "shippingAddress2",
    "city",
    "state",
    "zipCode",
    "paymentMethod",
  ]);

  const totalPrice = cartItems.reduce(
    (acc: number, item: CartItem) => acc + item.price * item.quantity,
    0
  );

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Text style={[styles.headerText, { color: theme.colors.secondary }]}>
        Revise su pedido
      </Text>

      <SummarySection
        title="Información de Envío"
        info={[
          { label: "Teléfono", value: phone },
          {
            label: "Dirección",
            value: `${shippingAddress1}, ${city}, ${state}, ${zipCode}`,
          },
        ]}
      />

      <SummarySection
        title="Método de Pago"
        info={[
          {
            label: "Método",
            value: getPaymentMethodTitle(paymentMethod as PaymentMethod),
          },
        ]}
      />

      <Text style={[styles.sectionTitle, { color: theme.colors.secondary }]}>
        Artículos en el Carrito
      </Text>
      {cartItems.map((item: CartItem) => (
        <CartItemRow key={item.id} item={item} />
      ))}

      <Text style={[styles.totalText, { color: theme.colors.priceText }]}>
        Total: ${totalPrice.toFixed(2)}
      </Text>

      <Button
        title="Realizar Pedido"
        onPress={() => {} /* TODO: order placing logic */}
        buttonStyle={[
          styles.placeOrderButton,
          { backgroundColor: theme.colors.buttonColor },
        ]}
        titleStyle={{ color: theme.colors.secondary }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 20,
    marginBottom: 30,
  },
  placeOrderButton: {
    paddingVertical: 12,
    borderRadius: 5,
  },
});

export default ConfirmScreen;
