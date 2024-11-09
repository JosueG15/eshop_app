import { useMemo } from "react";
import { StyleSheet, ScrollView, Alert } from "react-native";
import { Text, Button, useTheme } from "@rneui/themed";
import { useFormContext } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useStripe } from "@stripe/stripe-react-native";
import { MERCHANT_NAME } from "@env";

import { AppDispatch, RootState } from "../../../store/store";
import CartItemRow from "../../cart/components/CartItemRow";
import SummarySection from "../components/SummarySection";
import {
  getPaymentMethodTitle,
  PaymentMethod,
} from "../utils/paymentMethodUtil";
import { formatPrice } from "../../../shared/utils/textUtil";
import {
  placeOrder,
  initiatePayment,
} from "../../../store/slices/order/orderSlice";
import { ShippingInfo } from "../../../shared/types/cartType";

const ConfirmScreen: React.FC = () => {
  const { theme } = useTheme();
  const { colors } = theme;
  const { watch } = useFormContext<ShippingInfo>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const shippingInfo = watch([
    "phone",
    "address",
    "city",
    "state",
    "zip",
    "paymentMethod",
  ]);

  const totalPrice = useMemo(() => {
    const price = cartItems.reduce(
      (acc: number, item) => acc + item.price * item.quantity,
      0
    );
    return price;
  }, [cartItems]);

  const handlePlaceOrder = async () => {
    const paymentMethod = shippingInfo[5] as PaymentMethod;

    console.log("Payment method", paymentMethod);

    if (paymentMethod === "card") {
      try {
        const { clientSecret } = await dispatch(
          initiatePayment({ amount: totalPrice })
        ).unwrap();

        const { error } = await initPaymentSheet({
          paymentIntentClientSecret: clientSecret,
          merchantDisplayName: MERCHANT_NAME,
          returnURL: "myapp://payment-complete",
        });

        console.log(error);

        if (!error) {
          const { error: paymentError } = await presentPaymentSheet();

          if (!paymentError) {
            // Payment was successful, create the order
            await dispatch(
              placeOrder({
                orderItems: cartItems,
                address: shippingInfo[1],
                address2: shippingInfo[2],
                city: shippingInfo[3],
                state: shippingInfo[4],
                zip: shippingInfo[4],
                country: "SV",
                phone: shippingInfo[0],
                status: "placed",
                totalPrice,
              })
            ).unwrap();

            Alert.alert(
              "Pago exitoso",
              "La orden ha sido creada exitosamente."
            );
          } else {
            Alert.alert("Pago fallido", paymentError.message);
          }
        } else {
          Alert.alert("Error al inicializar el pago", error.message);
        }
      } catch (error) {
        Alert.alert("Error", "No se pudo procesar el pago.");
      }
    } else {
      // For non-card payment methods, create order with pending status
      try {
        await dispatch(
          placeOrder({
            orderItems: cartItems,
            address: shippingInfo[1],
            address2: shippingInfo[2],
            city: shippingInfo[3],
            state: shippingInfo[4],
            zip: shippingInfo[4],
            country: "SV",
            phone: shippingInfo[0],
            status: "pending",
            totalPrice: totalPrice,
          })
        ).unwrap();

        Alert.alert(
          "Orden creada",
          "La orden ha sido creada exitosamente con pago pendiente."
        );
      } catch (error) {
        Alert.alert("Error", "No se pudo crear la orden.");
      }
    }
  };

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
        Total: {formatPrice(totalPrice)}
      </Text>

      <Button
        title="Comprar"
        onPress={handlePlaceOrder}
        buttonStyle={styles.placeOrderButton}
        titleStyle={{ color: colors.secondary }}
      />
    </ScrollView>
  );
};

export default ConfirmScreen;
