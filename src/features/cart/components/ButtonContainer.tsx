import React, { useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Button, useTheme } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../store/slices/cart/cartSlice";
import { useNavigation } from "@react-navigation/native";
import { RootState } from "../../../store/store";
import AppModal from "../../../shared/components/AppModal";
import {
  CartNavigationProp,
  MainNavigatorProp,
} from "../../../shared/types/routeType";

const ButtonContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { colors } = theme;
  const navigation = useNavigation<MainNavigatorProp & CartNavigationProp>();
  const token = useSelector((state: RootState) => state.auth.token);
  const [showModal, setShowModal] = useState(false);

  const handleCheckout = () => {
    if (!token) {
      setShowModal(true);
    } else {
      navigation.navigate("Checkout");
    }
  };

  const handleLogin = () => {
    setShowModal(false);
    navigation.navigate("UserTab");
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        buttonContainer: {
          flexDirection: "row",
          alignItems: "center",
        },
        clearCartButton: {
          marginRight: 10,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          backgroundColor: colors.error,
        },
        checkoutButton: {
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          backgroundColor: colors.priceText,
        },
      }),
    [colors]
  );

  return (
    <View style={styles.buttonContainer}>
      <Button
        title="Limpiar Carrito"
        accessibilityLabel="Limpiar Carrito"
        onPress={() => dispatch(clearCart())}
        buttonStyle={styles.clearCartButton}
        titleStyle={{ color: colors.infoTextColor }}
      />
      <Button
        title="Checkout"
        onPress={handleCheckout}
        buttonStyle={styles.checkoutButton}
        titleStyle={{ color: colors.infoTextColor }}
      />

      <AppModal
        visible={showModal}
        onCancel={handleCancel}
        onConfirm={handleLogin}
        message="Necesita iniciar sesion antes de proceder al checkout"
        confirmText="Iniciar sesion"
        cancelText="Cancelar"
      />
    </View>
  );
};

export default ButtonContainer;
