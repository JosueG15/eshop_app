import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import { Control, FieldErrors, FieldValues } from "react-hook-form";
import { useTheme } from "@rneui/themed";
import FormField from "./FormField";
import { ErrorForm, Field } from "../types/formTypes";

interface CustomFormProps {
  fields: Field[];
  onSubmit: () => void;
  control: Control;
  buttonTitle: string;
  errors: FieldErrors<FieldValues> | ErrorForm;
  isLoading?: boolean;
  hideButton?: boolean;
}

const CustomForm: React.FC<CustomFormProps> = ({
  fields,
  onSubmit,
  control,
  buttonTitle = "Siguiente",
  errors,
  isLoading = false,
  hideButton = false,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.formContainer}>
      {fields.map((field) => (
        <FormField
          key={field.name}
          control={control}
          errors={errors}
          {...field}
        />
      ))}
      {!hideButton && (
        <Button
          buttonStyle={{ backgroundColor: theme.colors.nextColor }}
          title={buttonTitle}
          titleStyle={{ color: theme.colors.infoTextColor }}
          onPress={onSubmit}
          accessible
          accessibilityLabel={`${buttonTitle}`}
          loading={isLoading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 20,
  },
});

export default CustomForm;
