import React from "react";
import { KeyboardTypeOptions, StyleSheet } from "react-native";
import { Input, useTheme } from "@rneui/themed";
import { Controller, Control, FieldError } from "react-hook-form";

interface FormInputProps {
  control: Control;
  name: string;
  label: string;
  placeholder: string;
  rules: object;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  error: FieldError | undefined;
}

const FormInput: React.FC<FormInputProps> = ({
  control,
  name,
  label,
  placeholder,
  rules,
  secureTextEntry = false,
  keyboardType = "default",
  error,
}) => {
  const { theme } = useTheme();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          label={label}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          errorMessage={error ? error.message : undefined}
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
          labelStyle={[styles.label, { color: theme.colors.secondary }]}
          placeholderTextColor={theme.colors.grey3}
          inputContainerStyle={{
            borderBottomColor: theme.colors.borderColor,
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: "bold",
  },
});

export default FormInput;
