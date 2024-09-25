import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "@rneui/themed";
import { Controller, Control, FieldErrors } from "react-hook-form";
import FormField from "./FormField";

interface Field {
  name: string;
  label: string;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "phone-pad" | "email-address";
  required?: boolean;
  isPhoneInput?: boolean;
}

interface CustomFormProps {
  fields: Field[];
  onSubmit: () => void;
  control: Control;
  buttonTitle: string;
  errors: FieldErrors;
}

const CustomForm: React.FC<CustomFormProps> = ({
  fields,
  onSubmit,
  control,
  buttonTitle = "Enviar",
  errors,
}) => {
  return (
    <View style={styles.formContainer}>
      {fields.map((field) => (
        <View key={field.name} style={styles.fieldContainer}>
          <Controller
            name={field.name}
            control={control}
            rules={{ required: field.required }}
            render={({ field: { onChange, value } }) => (
              <FormField
                label={field.label}
                value={value}
                onChangeText={onChange}
                placeholder={field.placeholder}
                keyboardType={field.keyboardType || "default"}
                isPhoneInput={field.isPhoneInput}
              />
            )}
          />
          {errors[field.name] && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                {`${field.label} es requerido.`}
              </Text>
            </View>
          )}
        </View>
      ))}
      <Button title={buttonTitle} onPress={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  errorContainer: {
    marginTop: 5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});

export default CustomForm;
