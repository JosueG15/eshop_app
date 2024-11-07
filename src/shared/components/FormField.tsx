import React, { useMemo } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { useTheme } from "@rneui/themed";
import { Controller, Control, FieldErrors, FieldValues } from "react-hook-form";

import { ErrorForm, Field } from "../types/formTypes";

interface FormFieldProps extends Field {
  control: Control;
  errors: FieldErrors<FieldValues> | ErrorForm;
  multiline?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  placeholder = "",
  keyboardType = "default",
  multiline = false,
  required = false,
  control,
  errors,
  rules,
  ...additionalProps
}) => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginBottom: 20,
        },
        label: {
          fontSize: 16,
          marginBottom: 5,
          fontWeight: "bold",
          color: theme.colors.secondary,
        },
        input: {
          padding: 10,
          borderRadius: 8,
          borderWidth: 1,
          backgroundColor: theme.colors.primary,
          color: theme.colors.secondary,
          borderColor: errors[name]
            ? theme.colors.error
            : theme.colors.borderColor,
          textAlignVertical: multiline ? "top" : "center",
        },
        errorText: {
          fontSize: 12,
          marginTop: 5,
          color: theme.colors.error,
        },
      }),
    [theme, multiline, errors, name]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label} accessibilityLabel={`${label}`}>
        {label}
      </Text>
      <Controller
        control={control}
        name={name}
        rules={{
          ...rules,
          required: required ? `${label} es obligatorio` : false,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value ? String(value) : ""}
            onChangeText={(text) =>
              keyboardType === "numeric"
                ? onChange(Number(text))
                : onChange(text)
            }
            placeholder={placeholder}
            keyboardType={keyboardType}
            placeholderTextColor={theme.colors.secondary}
            style={[styles.input, multiline && { height: 100 }]}
            multiline={multiline}
            {...additionalProps}
          />
        )}
      />
      {errors && typeof errors[name]?.message === "string" && (
        <Text style={styles.errorText}>{errors[name].message}</Text>
      )}
    </View>
  );
};

export default FormField;
