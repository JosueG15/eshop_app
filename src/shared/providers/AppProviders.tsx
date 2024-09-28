import React, { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider, useThemeMode } from "@rneui/themed";
import store from "../../store/store";
import { darkTheme, lightTheme } from "../styles/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Error from "../components/Error";
import Toast from "../components/Toast";

const queryClient = new QueryClient();

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  const { mode } = useThemeMode();

  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
          <QueryClientProvider client={queryClient}>
            <ErrorBoundary FallbackComponent={Error}>
              {children}
              <Toast />
            </ErrorBoundary>
          </QueryClientProvider>
        </ThemeProvider>
      </NavigationContainer>
    </ReduxProvider>
  );
};
