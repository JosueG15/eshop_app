import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { Text, useTheme } from "@rneui/themed";
import { KeyboardAvoidingView, Platform } from "react-native";
import { TextInputMask } from "react-native-masked-text";

interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  isPhoneInput?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder = "",
  keyboardType = "default",
  isPhoneInput = false,
}) => {
  const { theme } = useTheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={[styles.label, { color: theme.colors.secondary }]}>
        {label}
      </Text>
      {isPhoneInput ? (
        <TextInputMask
          type={"custom"}
          options={{
            mask: "9999-9999",
          }}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.grey2}
          keyboardType={"phone-pad"}
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.primary,
              color: theme.colors.secondary,
            },
          ]}
        />
      ) : (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor={theme.colors.grey2}
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.primary,
              color: theme.colors.secondary,
            },
          ]}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default FormField;
