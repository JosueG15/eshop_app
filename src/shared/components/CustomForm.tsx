// CustomForm.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import { Control } from "react-hook-form";
import { useTheme } from "@rneui/themed";
import FormField, { Field } from "./FormField";

interface CustomFormProps {
  fields: Field[];
  onSubmit: () => void;
  control: Control<any>;
  buttonTitle: string;
  errors: any;
}

const CustomForm: React.FC<CustomFormProps> = ({
  fields,
  onSubmit,
  control,
  buttonTitle = "Submit",
  errors,
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
      <Button
        buttonStyle={{ backgroundColor: theme.colors.nextColor }}
        title={buttonTitle}
        titleStyle={{ color: theme.colors.infoTextColor }}
        onPress={onSubmit}
        accessible
        accessibilityLabel={`${buttonTitle}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 20,
  },
});

export default CustomForm;
