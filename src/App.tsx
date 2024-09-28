import { useMemo } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useTheme } from "@rneui/themed";

import Header from "./shared/components/Header";
import BottomNavigator from "./features/navigation/navigators/BottomNavigator";
import { AppProviders } from "./shared/providers/AppProviders";

export default function App() {
  return (
    <AppProviders>
      <ThemedApp />
    </AppProviders>
  );
}

function ThemedApp() {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
      }),
    [theme.colors.background]
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <BottomNavigator />
    </SafeAreaView>
  );
}
