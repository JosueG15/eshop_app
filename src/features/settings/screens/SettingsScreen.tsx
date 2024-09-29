import React, { useMemo } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useTheme } from "@rneui/themed";
import SettingsMenuOption from "../../../shared/components/ListMenuOption";
import { version } from "../../../../package.json";
import { useNavigation } from "@react-navigation/native";
import { SettingNavigationProp } from "../../../shared/types/routeType";

const SettingsScreen: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { navigate } = useNavigation<SettingNavigationProp>();
  const { theme } = useTheme();
  const { colors } = theme;
  const currentYear = new Date().getFullYear();

  const menuOptions = useMemo(() => {
    const baseOptions = [
      {
        title: "Cambiar Idioma",
        onPress: () => {
          /* TODO: Handle language setting */
        },
      },
      {
        title: "Cambiar Modo de Visualización",
        onPress: () => {
          navigate("ChangeTheme");
        },
      },
    ];

    if (user?.isAdmin) {
      baseOptions.unshift(
        {
          title: "Administrar Inventario",
          onPress: () => {
            /* TODO: Navigate to product management */
          },
        },
        {
          title: "Administrar Categorías de Productos",
          onPress: () => {
            /* TODO: Navigate to category management */
          },
        },
        {
          title: "Gestionar Usuarios",
          onPress: () => {
            /* TODO: Navigate to user management */
          },
        }
      );
    }

    return baseOptions;
  }, [user]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
          backgroundColor: colors.background,
        },
        appInfoContainer: {
          marginBottom: 50,
          gap: 20,
        },
        appInfoText: {
          fontSize: 18,
          fontWeight: "bold",
          color: colors.secondary,
          textAlign: "center",
        },
        menuContainer: {
          width: "100%",
          flexGrow: 1,
        },
        copyright: {
          textAlign: "center",
          marginVertical: 20,
          color: colors.priceText,
        },
      }),
    [colors]
  );

  return (
    <View style={styles.container}>
      <View style={styles.appInfoContainer}>
        <Text style={styles.appInfoText}>Tienda Movil - Easy Shop</Text>
        <Text style={styles.appInfoText}>Versión {version}</Text>
      </View>
      <FlatList
        data={menuOptions}
        renderItem={({ item }) => <SettingsMenuOption item={item} />}
        keyExtractor={(_, index) => index.toString()}
        style={styles.menuContainer}
      />
      <Text style={styles.copyright}>© {currentYear} Tienda Movil</Text>
    </View>
  );
};

export default SettingsScreen;
