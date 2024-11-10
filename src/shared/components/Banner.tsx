import React from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator,
} from "react-native";
import Swiper from "react-native-swiper";
import { useSelector } from "react-redux";
import { useTheme } from "@rneui/themed";
import { createSelector } from "reselect";
import { RootState } from "../../store/store";

const { width } = Dimensions.get("window");

const selectFeaturedImages = createSelector(
  [(state: RootState) => state.products.products],
  (products) =>
    products
      .filter((product) => product.isFeatured)
      .slice(0, 3)
      .map((product) => product.image)
);

const Banner: React.FC = React.memo(() => {
  const { theme } = useTheme();

  const featuredImages = useSelector(selectFeaturedImages);

  const isLoading = useSelector((state: RootState) => state.products.isLoading);

  return (
    <View
      style={[
        styles.bannerContainer,
        { backgroundColor: theme.colors.background },
      ]}
    >
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={theme.colors.primary}
          style={styles.activityIndicator}
        />
      ) : (
        <Swiper
          style={styles.bannerSwiperHeight}
          showsButtons={false}
          autoplay
          autoplayTimeout={3}
          showsPagination={false}
        >
          {featuredImages.map((imageUri, index) => (
            <Image
              key={index}
              style={styles.bannerImage}
              resizeMode="cover"
              source={{ uri: imageUri }}
            />
          ))}
        </Swiper>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  bannerContainer: {
    width: "100%",
    height: width / 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerSwiperHeight: {
    height: width / 1.5,
  },
  bannerImage: {
    height: width / 1.5,
    width: width - 40,
    borderRadius: 12,
    marginHorizontal: 10,
  },
  activityIndicator: {
    position: "absolute",
    alignSelf: "center",
  },
});

export default Banner;
