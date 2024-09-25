import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "@rneui/themed";
import { FormProvider, useForm } from "react-hook-form";
import ShippingScreen from "../screens/checkout/ShippingScreen";
import PaymentScreen from "../screens/checkout/PaymentScreen";
import ConfirmScreen from "../screens/checkout/ConfirmScreen";

const Tab = createMaterialTopTabNavigator();

const CheckoutNavigator = () => {
  const { theme } = useTheme();
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <Tab.Navigator
        initialRouteName="Shipping"
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.text,
          tabBarStyle: { backgroundColor: theme.colors.background },
          tabBarIndicatorStyle: { backgroundColor: theme.colors.primary },
          tabBarLabelStyle: {
            opacity: route.name === "Shipping" ? 1 : 0.5,
          },
          tabBarPressable: false,
          swipeEnabled: false,
        })}
      >
        <Tab.Screen
          name="Shipping"
          options={{ animationEnabled: false, swipeEnabled: false }}
          component={ShippingScreen}
        />
        <Tab.Screen name="Payment" component={PaymentScreen} />
        <Tab.Screen name="Confirm" component={ConfirmScreen} />
      </Tab.Navigator>
    </FormProvider>
  );
};

export default CheckoutNavigator;
