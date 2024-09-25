import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "@rneui/themed";

interface SummarySectionProps {
  title: string;
  info: { label: string; value: string }[];
}

const SummarySection: React.FC<SummarySectionProps> = ({ title, info }) => {
  const { theme } = useTheme();
  console.log("info", info);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      {info.map((item, index) => (
        <View key={index} style={styles.infoRow}>
          <Text style={[styles.label, { color: theme.colors.text }]}>
            {item.label}:
          </Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>
            {item.value}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontWeight: "600",
  },
  value: {
    fontWeight: "normal",
  },
});

export default SummarySection;
