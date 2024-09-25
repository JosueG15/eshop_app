import React from "react";
import { StyleSheet, Image, SafeAreaView } from "react-native";
import { useTheme } from "@rneui/themed";

const Header = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.header, { backgroundColor: theme.colors.background }]}
    >
      <Image
        source={
          theme.mode === "dark"
            ? require("../../../assets/logo_dark.png")
            : require("../../../assets/logo_light.png")
        }
        resizeMode="contain"
        style={styles.logo}
      />
    </SafeAreaView>
  );
};

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
    marginTop: 15,
  },
});

export default Header;
