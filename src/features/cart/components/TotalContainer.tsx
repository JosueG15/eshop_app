import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "@rneui/themed";

interface TotalContainerProps {
  totalPrice: number;
}

const TotalContainer: React.FC<TotalContainerProps> = ({ totalPrice }) => {
  const { theme } = useTheme();
  const { colors } = theme;

  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(totalPrice);
  }, [totalPrice]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        totalContainer: {
          flex: 1,
          alignItems: "flex-start",
        },
        totalText: {
          fontSize: 15,
          fontWeight: "bold",
          color: colors.priceText,
        },
        priceWrapper: {
          flexDirection: "row",
          flexWrap: "wrap",
        },
      }),
    [colors]
  );

  return (
    <View style={styles.totalContainer}>
      <View style={styles.priceWrapper}>
        <Text style={styles.totalText} accessibilityLabel="Total">
          Total:
        </Text>
        <Text style={styles.totalText} accessibilityLabel={`${formattedPrice}`}>
          {formattedPrice}
        </Text>
      </View>
    </View>
  );
};

export default TotalContainer;
