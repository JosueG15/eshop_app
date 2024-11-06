import { useMemo } from "react";
import { StyleSheet, Image, SafeAreaView } from "react-native";
import { useTheme } from "@rneui/themed";

const logoLight = require("../../../assets/logo_light.png");
const logoDark = require("../../../assets/logo_dark.png");

const Header = () => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        header: {
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.background,
        },
        logo: {
          height: 100,
          marginTop: 20,
        },
      }),
    [theme.colors.background]
  );

  const logoSource = theme.mode === "dark" ? logoDark : logoLight;

  return (
    <SafeAreaView style={styles.header}>
      <Image
        source={logoSource}
        resizeMode="contain"
        style={styles.logo}
        accessibilityLabel="Logo de aplicacion"
      />
    </SafeAreaView>
  );
};

export default Header;
