import React from "react";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
  ToastProps as RNToastProps,
} from "react-native-toast-message";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type ToastType = "success" | "error" | "info";

export const showToast = (title: string, message: string, type: ToastType) => {
  Toast.show({
    type: type,
    text1: title,
    text2: message,
  });
};

const toastConfig: ToastConfig = {
  success: (props: RNToastProps) => (
    <BaseToast
      {...props}
      style={[styles.successToast, styles.toastContainer]}
      text1Style={styles.toastText}
      text2Style={styles.toastTextLarge}
      text2NumberOfLines={0}
    />
  ),
  error: (props: RNToastProps) => (
    <ErrorToast
      {...props}
      style={[styles.errorToast, styles.toastContainer]}
      text1Style={styles.toastText}
      text2Style={styles.toastTextLarge}
      text2NumberOfLines={0}
    />
  ),
  info: (props: RNToastProps) => (
    <BaseToast
      {...props}
      style={[styles.infoToast, styles.toastContainer]}
      text1Style={styles.toastText}
      text2Style={styles.toastTextLarge}
      text2NumberOfLines={0}
    />
  ),
};

const ToastComponent: React.FC = () => {
  return <Toast config={toastConfig} />;
};

const styles = StyleSheet.create({
  toastContainer: {
    height: "auto",
    marginTop: 30,
    padding: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  } as ViewStyle,
  successToast: {
    borderLeftColor: "green",
  } as ViewStyle,
  errorToast: {
    borderLeftColor: "red",
  } as ViewStyle,
  infoToast: {
    borderLeftColor: "blue",
  } as ViewStyle,
  toastText: {
    fontSize: 16,
    fontWeight: "bold",
    flexWrap: "wrap",
  } as TextStyle,
  toastTextLarge: {
    fontSize: 14,
    color: "gray",
    flexWrap: "wrap",
    maxWidth: "95%",
  } as TextStyle,
});

export default ToastComponent;
