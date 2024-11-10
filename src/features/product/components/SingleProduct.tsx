import { useState, useMemo } from "react";
import {
  Image,
  View,
  StyleSheet,
  FlatList,
  Button,
  Dimensions,
  ListRenderItem,
} from "react-native";
import Swiper from "react-native-swiper";
import { Text, useTheme } from "@rneui/themed";
import { IProduct } from "../../../shared/types/productType";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../../../shared/types/routeType";
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

const { width } = Dimensions.get("window");

interface SectionItem {
  key: "carousel" | "details" | "reviews";
}

const SingleProduct: React.FC<SingleProductProps> = (props) => {
  const { theme } = useTheme();
  const { colors } = theme;
  const dispatch = useDispatch();

  const [item] = useState<IProduct>(props.route.params.item);

  const handleAddToCart = () => {
    dispatch(addToCart(item));
    showToast(
      "Producto agregado",
      `${item.name} ha sido agregado a tu carrito.`,
      "success"
    );
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.background,
        },
        carouselContainer: {
          width: "100%",
          height: width * 0.75,
          marginBottom: 20,
          borderRadius: 8,
          overflow: "hidden",
        },
        swiper: {
          height: "100%",
        },
        carouselImage: {
          width: "100%",
          height: "100%",
        },
        detailsContainer: {
          paddingHorizontal: 15,
          marginVertical: 10,
        },
        detailsHeader: {
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10,
          color: colors.primaryText,
        },
        detailsBrand: {
          fontSize: 16,
          fontWeight: "500",
          textAlign: "center",
          marginBottom: 15,
          color: colors.secondary,
        },
        detailsDescription: {
          fontSize: 14,
          lineHeight: 22,
          textAlign: "center",
          marginBottom: 15,
          color: colors.grey1,
        },
        availability: {
          fontSize: 16,
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 10,
          color: item.countInStock > 0 ? colors.success : colors.error,
        },
        bottomContainer: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
          backgroundColor: colors.background,
        },
        price: {
          fontSize: 22,
          fontWeight: "bold",
          color: colors.priceText,
        },
        reviewsContainer: {
          paddingHorizontal: 15,
          marginVertical: 20,
        },
        reviewTitle: {
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
          color: colors.secondary,
        },
        reviewItem: {
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 15,
        },
        reviewAvatar: {
          width: 40,
          height: 40,
          borderRadius: 20,
          marginRight: 10,
        },
        reviewTextContainer: {
          flex: 1,
        },
        reviewName: {
          fontSize: 16,
          fontWeight: "bold",
          color: colors.primaryText,
        },
        reviewText: {
          fontSize: 14,
          color: colors.grey1,
        },
        richDescription: {
          marginVertical: 10,
          color: colors.secondary,
        },
      }),
    [colors, item.countInStock]
  );

  const productData: SectionItem[] = useMemo(() => {
    return [{ key: "carousel" }, { key: "details" }, { key: "reviews" }];
  }, []);

  const renderItem: ListRenderItem<SectionItem> = ({ item: section }) => {
    switch (section.key) {
      case "carousel":
        return (
          <View style={styles.carouselContainer}>
            <Swiper
              style={styles.swiper}
              showsButtons={false}
              autoplay
              autoplayTimeout={4}
              dotColor={colors.grey5}
              activeDotColor={colors.primary}
            >
              {item.images.map((imageUri, index) => (
                <Image
                  key={index}
                  style={styles.carouselImage}
                  source={{ uri: imageUri }}
                  resizeMode="cover"
                />
              ))}
            </Swiper>
          </View>
        );
      case "details":
        return (
          <View style={styles.detailsContainer}>
            <Text h1 style={styles.detailsHeader}>
              {item.name}
            </Text>
            <Text style={styles.detailsBrand}>Marca: {item.brand}</Text>
            {item.richDescription ? (
              <Text style={styles.richDescription}>
                {item.richDescription.replace(/<[^>]+>/g, "")}
              </Text>
            ) : (
              <Text style={styles.detailsDescription}>{item.description}</Text>
            )}
            <Text style={styles.availability}>
              {item.countInStock > 0 ? "En stock" : "Agotado"}
            </Text>
          </View>
        );
      case "reviews":
        return (
          <View style={styles.reviewsContainer}>
            <Text style={styles.reviewTitle}>Reseñas de Clientes</Text>
            {item.reviews && item.reviews.length > 0 ? (
              item.reviews.map((review, index) => (
                <View key={index} style={styles.reviewItem}>
                  <Image
                    source={{ uri: review.avatar }}
                    style={styles.reviewAvatar}
                  />
                  <View style={styles.reviewTextContainer}>
                    <Text style={styles.reviewName}>{review.name}</Text>
                    <Text style={styles.reviewText}>{review.review}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text
                style={{
                  ...styles.reviewTitle,
                  textAlign: "center",
                  color: colors.secondary,
                }}
              >
                No hay reseñas disponibles.
              </Text>
            )}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={productData}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        ListFooterComponent={
          <View style={styles.bottomContainer}>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            <Button
              title="Agregar al Carrito"
              color={colors.buttonColor}
              onPress={handleAddToCart}
            />
          </View>
        }
      />
    </View>
  );
};

export default SingleProduct;
