import React, { useMemo } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { useTheme } from "@rneui/themed";
import { Controller, Control, FieldErrors, FieldValues } from "react-hook-form";
import { IconButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { ErrorForm, Field } from "../types/formTypes";
import { iconList } from "../utils/textUtil";

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
        },
        errorText: {
          fontSize: 12,
          marginTop: 5,
          color: theme.colors.error,
        },
        iconDropdownContainer: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        },
        dropdown: {
          flex: 1,
          borderWidth: 1,
          borderColor: theme.colors.borderColor,
          borderRadius: 8,
          color: theme.colors.infoTextColor,
          backgroundColor: theme.colors.dropdownColor,
        },
      }),
    [theme]
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
        render={({ field: { onChange, value } }) => {
          if (name === "icon") {
            return (
              <View style={styles.iconDropdownContainer}>
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)}
                  style={styles.dropdown}
                >
                  {iconList.map((icon) => (
                    <Picker.Item
                      key={icon.value}
                      label={icon.label}
                      value={icon.value}
                    />
                  ))}
                </Picker>
                {value && (
                  <IconButton
                    icon={value}
                    size={40}
                    iconColor={theme.colors.secondary}
                  />
                )}
              </View>
            );
          }

          return isPhoneInput ? (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder={placeholder}
              keyboardType={"phone-pad"}
              placeholderTextColor={theme.colors.secondary}
              style={styles.input}
              {...additionalProps}
            />
          ) : (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder={placeholder}
              keyboardType={keyboardType}
              placeholderTextColor={theme.colors.secondary}
              style={styles.input}
              {...additionalProps}
            />
          );
        }}
      />
      {errors && typeof errors[name]?.message === "string" && (
        <Text style={styles.errorText}>{errors[name].message}</Text>
      )}
    </View>
  );
};

export default FormField;
