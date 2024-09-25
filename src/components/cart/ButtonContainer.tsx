import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, useTheme } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/slices/cartSlice";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CartStackParamList } from "../../types/routes";

type CheckoutNavigationProp = StackNavigationProp<
  CartStackParamList,
  "Checkout"
>;

const ButtonContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const navigation = useNavigation<CheckoutNavigationProp>();

  return (
    <View style={styles.buttonContainer}>
      <Button
        title="Clear Cart"
        onPress={() => dispatch(clearCart())}
        buttonStyle={[
          styles.clearCartButton,
          { backgroundColor: theme.colors.error },
        ]}
        titleStyle={{ color: theme.colors.primary }}
      />
      <Button
        title="Checkout"
        onPress={() => navigation.navigate("Checkout")}
        buttonStyle={[
          styles.checkoutButton,
          { backgroundColor: theme.colors.infoColor },
        ]}
        titleStyle={{ color: theme.colors.primary }}
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
