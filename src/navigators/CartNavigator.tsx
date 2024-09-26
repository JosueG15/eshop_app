import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CartScreen from "../screens/cart/CartScreen";
import CheckoutNavigator from "./CheckoutNavigator";
import { CartStackParamList } from "../types/routes";
import { useTheme } from "@rneui/themed";

const Stack = createStackNavigator<CartStackParamList>();

const CartNavigator = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutNavigator}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.secondary,
        }}
      />
    </Stack.Navigator>
  );
};

export default CartNavigator;
