import { useMemo } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, Button, useTheme } from "@rneui/themed";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import CartItemRow from "../../cart/components/CartItemRow";
import { RootState } from "../../../store/store";
import SummarySection from "../components/SummarySection";
import {
  getPaymentMethodTitle,
  PaymentMethod,
} from "../utils/paymentMethodUtil";
import { ShippingFormValues } from "../types/checkoutTypes";
import { formatPrice } from "../../../shared/utils/textUtil";

const ConfirmScreen: React.FC = () => {
  const { theme } = useTheme();
  const { colors } = theme;
  const { watch } = useFormContext<ShippingFormValues>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const shippingInfo = watch([
    "phone",
    "shippingAddress1",
    "city",
    "state",
    "zipCode",
    "paymentMethod",
  ]);

  const totalPrice = useMemo(() => {
    const price = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return formatPrice(price);
  }, [cartItems]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexGrow: 1,
          padding: 20,
          backgroundColor: colors.background,
        },
        headerText: {
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
          color: colors.secondary,
        },
        sectionTitle: {
          fontSize: 18,
          fontWeight: "bold",
          marginVertical: 15,
          color: colors.secondary,
        },
        totalText: {
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "right",
          marginTop: 20,
          marginBottom: 30,
          color: colors.priceText,
        },
        placeOrderButton: {
          paddingVertical: 12,
          borderRadius: 5,
          backgroundColor: colors.buttonColor,
        },
      }),
    [colors]
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText} accessibilityLabel="Revisa tu orden">
        Revisa tu orden
      </Text>

      <SummarySection
        title="Informacion de envio"
        info={[
          { label: "Telefono", value: shippingInfo[0] },
          {
            label: "Direccion",
            value: `${shippingInfo[1]}, ${shippingInfo[2]}, ${shippingInfo[3]}, ${shippingInfo[4]}`,
          },
        ]}
      />

      <SummarySection
        title="Metodo de pago"
        info={[
          {
            label: "Metodo",
            value: getPaymentMethodTitle(shippingInfo[5] as PaymentMethod),
          },
        ]}
      />

      <Text style={styles.sectionTitle} accessibilityLabel="Articulos">
        Articulos
      </Text>
      {cartItems.map((item) => (
        <CartItemRow key={item.id} item={item} shouldDelete={false} />
      ))}

      <Text
        style={styles.totalText}
        accessibilityLabel={`Total: ${totalPrice}`}
      >
        Total: {totalPrice}
      </Text>

      <Button
        title="Comprar"
        onPress={() => {} /* TODO: order placing logic */}
        buttonStyle={styles.placeOrderButton}
        titleStyle={{ color: colors.secondary }}
      />
    </ScrollView>
  );
};

export default ConfirmScreen;
