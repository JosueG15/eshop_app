import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "@rneui/themed";

interface TotalContainerProps {
  totalPrice: number;
}

const TotalContainer: React.FC<TotalContainerProps> = ({ totalPrice }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.totalContainer}>
      <Text style={[styles.totalText, { color: theme.colors.priceColor }]}>
        Total: ${totalPrice.toFixed(2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  totalContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TotalContainer;
