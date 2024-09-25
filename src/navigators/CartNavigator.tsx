import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CartScreen from "../screens/cart/CartScreen";
import CheckoutNavigator from "./CheckoutNavigator";
import { CartStackParamList } from "../types/routes";

const Stack = createStackNavigator<CartStackParamList>();

const CartNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Cart"
      component={CartScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name="Checkout" component={CheckoutNavigator} options={{}} />
  </Stack.Navigator>
);

export default CartNavigator;
