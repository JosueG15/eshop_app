import React from "react";
import { StyleSheet, Image, SafeAreaView } from "react-native";

const Header = () => (
  <SafeAreaView style={styles.header}>
    <Image
      source={require("../../../assets/Logo.png")}
      resizeMode="contain"
      style={styles.logo}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  logo: {
    height: 50,
  },
});

export default Header;
