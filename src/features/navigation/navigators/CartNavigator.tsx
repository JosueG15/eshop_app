import { createStackNavigator } from "@react-navigation/stack";
import CartScreen from "../../cart/screens/CartScreen";
import CheckoutNavigator from "./CheckoutNavigator";
import { CartStackParamList } from "../../../shared/types/routeType";
import { useTheme } from "@rneui/themed";

const Stack = createStackNavigator<CartStackParamList>();

const CartNavigator = () => {
  const { theme } = useTheme();
  const screenOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutNavigator}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

export default CartNavigator;
