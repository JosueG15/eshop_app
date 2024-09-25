import { useState } from "react";
import { Image, View, StyleSheet, ScrollView, Button } from "react-native";
import { Text } from "@rneui/themed";
import { IProduct } from "../../types/products";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../../types/routes";
import { useTheme } from "@rneui/themed";

type SingleProductRouteProp = RouteProp<HomeStackParamList, "Product Detail">;
type SingleProductNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "Product Detail"
>;

interface SingleProductProps {
  route: SingleProductRouteProp;
  navigation: SingleProductNavigationProp;
}

const SingleProduct: React.FC<SingleProductProps> = (props) => {
  const { theme } = useTheme();
  const [item] = useState<IProduct>(props.route.params.item);
  const [availability] = useState<string>("");

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
        {/* Simulating Left and Right from native base */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.price}>$ {item.price.toFixed(2)}</Text>
          <Button title="Add" />
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
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: "red",
  },
});

export default SingleProduct;