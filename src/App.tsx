import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Header from "./shared/components/Header";
import BottomNavigator from "./navigators/BottomNavigator";
import { useTheme } from "@rneui/themed";
import { AppProviders } from "./shared/components/Providers";

export default function App() {
  return (
    <AppProviders>
      <ThemedApp />
    </AppProviders>
  );
}

function ThemedApp() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <BottomNavigator />
    </SafeAreaView>
  );
}
