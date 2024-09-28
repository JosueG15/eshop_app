import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "@rneui/themed";
import { formatPrice } from "../../../shared/utils/textUtil";

interface TotalContainerProps {
  totalPrice: number;
}

const TotalContainer: React.FC<TotalContainerProps> = ({ totalPrice }) => {
  const { theme } = useTheme();
  const { colors } = theme;

  const formattedPrice = useMemo(() => formatPrice(totalPrice), [totalPrice]);

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
