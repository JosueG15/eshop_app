import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, useTheme } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/slices/cartSlice";

const ButtonContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  return (
    <View style={styles.buttonContainer}>
      <Button
        title="Clear Cart"
        onPress={() => dispatch(clearCart())}
        buttonStyle={[
          styles.clearCartButton,
          { backgroundColor: theme.colors.clearCartBg },
        ]}
        titleStyle={{ color: theme.colors.white }}
      />
      <Button
        title="Checkout"
        onPress={() => {} /* TODO: Implement checkout logic */}
        buttonStyle={[
          styles.checkoutButton,
          { backgroundColor: theme.colors.primary },
        ]}
        titleStyle={{ color: theme.colors.white }}
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
