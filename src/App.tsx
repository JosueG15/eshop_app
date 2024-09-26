import { SafeAreaView, StyleSheet } from "react-native";
import QueryClientProvider from "./contexts/QueryClientProvider";
import Header from "./components/shared/Header";
import { ThemeProvider, useThemeMode, useTheme } from "@rneui/themed";
import { lightTheme, darkTheme } from "./styles/themes";
import { NavigationContainer } from "@react-navigation/native";
import BottomNavigator from "./navigators/BottomNavigator";
import { Provider } from "react-redux";
import store from "./store/store";

export default function App() {
  const { mode } = useThemeMode();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <ThemeProvider theme={mode === "dark" ? darkTheme : darkTheme}>
          <QueryClientProvider>
            <ThemedApp />
          </QueryClientProvider>
        </ThemeProvider>
      </NavigationContainer>
    </Provider>
  );
}

function ThemedApp() {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header />
      <BottomNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
