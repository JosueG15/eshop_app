import { createStackNavigator } from "@react-navigation/stack";
import SingleProduct from "../../product/components/SingleProduct";
import { HomeStackParamList } from "../../../shared/types/routeType";
import ProductScreen from "../../product/screens/ProductScreen";

const screenOptions = {
  headerShown: false,
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="Home" component={ProductScreen} />
    <Stack.Screen name="ProductDetail" component={SingleProduct} />
  </Stack.Navigator>
);

export default HomeNavigator;
