import { SafeAreaView, StyleSheet } from "react-native";
import QueryClientProvider from "./contexts/QueryClientProvider";
import Header from "./components/shared/Header";
import { ThemeProvider, useThemeMode } from "@rneui/themed";
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
        <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
          <QueryClientProvider>
            <SafeAreaView style={styles.container}>
              <Header />
              <BottomNavigator />
            </SafeAreaView>
          </QueryClientProvider>
        </ThemeProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
