import { createStackNavigator } from "@react-navigation/stack";
import ProductScreen from "../screens/products/ProductScreen";
import SingleProduct from "../components/product/SingleProduct";
import { HomeStackParamList } from "../types/routes";

const Stack = createStackNavigator<HomeStackParamList>();

const HomeNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={ProductScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Product Detail"
      component={SingleProduct}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default HomeNavigator;
