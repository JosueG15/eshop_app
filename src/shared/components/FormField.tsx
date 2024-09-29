import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { useTheme } from "@rneui/themed";
import { Controller, Control, FieldErrors, FieldValues } from "react-hook-form";
import { TextInputMask } from "react-native-masked-text";
import { ErrorForm, Field } from "../types/formTypes";

interface FormFieldProps extends Field {
  control: Control;
  errors: FieldErrors<FieldValues> | ErrorForm;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  placeholder = "",
  keyboardType = "default",
  isPhoneInput = false,
  required = false,
  control,
  errors,
  rules,
  ...additionalProps
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text
        style={[styles.label, { color: theme.colors.secondary }]}
        accessibilityLabel={`${label}`}
      >
        {label}
      </Text>
      <Controller
        control={control}
        name={name}
        rules={{
          ...rules,
          required: required ? `${label} es obligatorio` : false,
        }}
        render={({ field: { onChange, value } }) =>
          isPhoneInput ? (
            <TextInputMask
              type={"custom"}
              options={{
                mask: "9999-9999",
              }}
              value={value}
              onChangeText={onChange}
              placeholder={placeholder}
              placeholderTextColor={theme.colors.secondary}
              keyboardType={"phone-pad"}
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.secondary,
                  borderColor: errors[name] ? theme.colors.error : "#ccc",
                },
              ]}
              {...additionalProps}
            />
          ) : (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder={placeholder}
              keyboardType={keyboardType}
              placeholderTextColor={theme.colors.secondary}
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.secondary,
                  borderColor: errors[name] ? theme.colors.error : "#ccc",
                },
              ]}
              {...additionalProps}
            />
          )
        }
      />
      {errors && typeof errors[name]?.message === "string" && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {errors[name].message}
        </Text>
      )}
    </View>
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
  },
  errorText: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default FormField;
