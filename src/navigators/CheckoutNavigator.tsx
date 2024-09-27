import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "@rneui/themed";
import { FormProvider, useForm } from "react-hook-form";
import ShippingScreen from "../features/checkout/screens/ShippingScreen";
import PaymentScreen from "../features/checkout/screens/PaymentScreen";
import ConfirmScreen from "../features/checkout/screens/ConfirmScreen";

const Tab = createMaterialTopTabNavigator();

const CheckoutNavigator = () => {
  const { theme } = useTheme();
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <Tab.Navigator
        initialRouteName="Shipping"
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: theme.colors.primaryText,
          tabBarInactiveTintColor: theme.colors.secondary,
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderTopColor: theme.colors.borderColor,
          },
          tabBarIndicatorStyle: { backgroundColor: theme.colors.infoColor },
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
