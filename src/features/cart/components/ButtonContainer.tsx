import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, useTheme } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../store/slices/cart/cartSlice";
import { useNavigation } from "@react-navigation/native";
import {
  CartNavigationProp,
  UserNavigationProp,
} from "../../../shared/types/routeType";
import { RootState } from "../../../store/store";
import CustomModal from "../../../shared/components/CustomModal";

const ButtonContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const navigation = useNavigation<CartNavigationProp & UserNavigationProp>();
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
    navigation.navigate("Login");
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.buttonContainer}>
      <Button
        title="Vaciar Carrito"
        onPress={() => dispatch(clearCart())}
        buttonStyle={[
          styles.clearCartButton,
          { backgroundColor: theme.colors.error },
        ]}
        titleStyle={{ color: theme.colors.primary }}
      />
      <Button
        title="Comprar"
        onPress={handleCheckout}
        buttonStyle={[
          styles.checkoutButton,
          { backgroundColor: theme.colors.infoColor },
        ]}
        titleStyle={{ color: theme.colors.primary }}
      />

      <CustomModal
        visible={showModal}
        onClose={handleCancel}
        onConfirm={handleLogin}
        message="Debes iniciar sesión para proceder con la compra."
        confirmText="Iniciar Sesión"
        cancelText="Cancelar"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  clearCartButton: {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  checkoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

export default ButtonContainer;
