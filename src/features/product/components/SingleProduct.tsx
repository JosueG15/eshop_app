import { useState } from "react";
import { Image, View, StyleSheet, ScrollView, Button } from "react-native";
import { Text } from "@rneui/themed";
import { IProduct } from "../../../shared/types/productType";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../../../shared/types/routeType";
import { useTheme } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { showToast } from "../../../shared/components/Toast";
import { addToCart } from "../../../store/slices/cart/cartSlice";

type SingleProductRouteProp = RouteProp<HomeStackParamList, "ProductDetail">;
type SingleProductNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "ProductDetail"
>;

interface SingleProductProps {
  route: SingleProductRouteProp;
  navigation: SingleProductNavigationProp;
}

const SingleProduct: React.FC<SingleProductProps> = (props) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const [item] = useState<IProduct>(props.route.params.item);
  const [availability] = useState<string>("");

  const handleAddToCart = () => {
    dispatch(addToCart(item));
    showToast(
      "Product agregado",
      `${item.name} ha sido agregado a tu carrito.`,
      "success"
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: item.image }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text h1 style={styles.detailsHeader}>
            {item.name}
          </Text>
          <Text style={styles.detailsContent}>{item.brand}</Text>
          <Text>{availability}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.price}>$ {item.price.toFixed(2)}</Text>
          <Button title="Add" color="green" onPress={handleAddToCart} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  scrollView: {
    marginBottom: 80,
    padding: 5,
  },
  imageContainer: {
    borderRadius: 8,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 250,
  },
  detailsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  detailsHeader: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailsContent: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: "red",
  },
});

export default SingleProduct;
