import React from "react";
import { Image, StyleSheet, Dimensions, View } from "react-native";
import Swiper from "react-native-swiper";
import { useTheme } from "@rneui/themed";
import { getContainerWidth } from "../../utils/screen";

const { width } = Dimensions.get("window");

const Banner: React.FC = () => {
  const { theme } = useTheme();
  const bannerData = [
    "https://images.vexels.com/media/users/3/126443/preview2/ff9af1e1edfa2c4a46c43b0c2040ce52-macbook-pro-touch-bar-banner.jpg",
    "https://pbs.twimg.com/media/D7P_yLdX4AAvJWO.jpg",
    "https://www.yardproduct.com/blog/wp-content/uploads/2016/01/gardening-banner.jpg",
  ];

  return (
    <View
      style={[
        styles.bannerContainer,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Swiper
        style={styles.bannerSwiperHeight}
        showsButtons={false}
        autoplay={true}
        autoplayTimeout={3}
      >
        {bannerData.map((item) => (
          <Image
            style={styles.bannerImage}
            key={item}
            resizeMode="cover"
            source={{ uri: item }}
          />
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    width: "100%",
    height: getContainerWidth(1.5),
    alignItems: "center",
    justifyContent: "center",
  },
  bannerSwiperHeight: {
    height: getContainerWidth(1.5),
  },
  bannerImage: {
    height: getContainerWidth(1.5),
    width: width - 40,
    borderRadius: 12,
    marginHorizontal: 10,
  },
});

export default Banner;
