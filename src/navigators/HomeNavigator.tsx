import { createStackNavigator } from "@react-navigation/stack";
import SingleProduct from "../features/product/components/SingleProduct";
import { HomeStackParamList } from "../shared/types/routeType";
import ProductScreen from "../features/product/screens/ProductScreen";

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
