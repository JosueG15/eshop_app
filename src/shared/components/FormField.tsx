import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { useTheme } from "@rneui/themed";
import { Controller, Control } from "react-hook-form";
import { TextInputMask } from "react-native-masked-text";

export interface Field {
  name: string;
  label: string;
  placeholder?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  isPhoneInput?: boolean;
  required?: boolean;
}

interface FormFieldProps extends Field {
  control: Control<any>;
  errors: any;
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
        rules={{ required: required ? `${label} es obligatorio` : false }}
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
            />
          )
        }
      />
      {errors[name] && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {errors[name]?.message}
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
