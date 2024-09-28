import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "@rneui/themed";
import { FormProvider, useForm } from "react-hook-form";
import ShippingScreen from "../../checkout/screens/ShippingScreen";
import PaymentScreen from "../../checkout/screens/PaymentScreen";
import ConfirmScreen from "../../checkout/screens/ConfirmScreen";

const Stack = createStackNavigator();

const CheckoutNavigator: React.FC = () => {
  const { theme } = useTheme();
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.primaryText,
        }}
      >
        <Stack.Screen
          name="Shipping"
          component={ShippingScreen}
          options={{
            title: "Informacion de envio",
            headerBackTitle: " ",
            headerBackAccessibilityLabel: "Atras",
          }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{
            title: "Metodo de pago",
            headerBackTitle: " ",
            headerBackAccessibilityLabel: "Atras",
          }}
        />
        <Stack.Screen
          name="Confirm"
          component={ConfirmScreen}
          options={{
            title: "Confirmar pedido",
            headerBackTitle: " ",
            headerBackAccessibilityLabel: "Atras",
          }}
        />
      </Stack.Navigator>
    </FormProvider>
  );
};

export default CheckoutNavigator;
