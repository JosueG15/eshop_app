import React, { useMemo } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import CustomForm from "../../../shared/components/CustomForm";
import { Field } from "../../../shared/types/formTypes";
import { ICategory } from "../../product/types/categoryType";
import { useTheme } from "@rneui/themed";

interface CategoryFormProps {
  control: Control<Partial<ICategory>>;
  errors: FieldErrors<Partial<ICategory>>;
  isLoading: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  control,
  errors,
  isLoading,
}) => {
  const { theme } = useTheme();

  const fields: Field[] = [
    {
      name: "name",
      label: "Nombre de la Categoría",
      placeholder: "Ingrese el nombre de la categoría",
      required: true,
    },
    {
      name: "color",
      label: "Color",
      placeholder: "Ingrese el color (hex code)",
      required: true,
    },
    {
      name: "icon",
      label: "Ícono",
      placeholder: "Ingrese el nombre del ícono",
      required: true,
    },
  ];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexGrow: 1,
          justifyContent: "center",
          padding: 20,
          backgroundColor: theme.colors.background,
        },
      }),
    [theme]
  );

  return (
    <View style={styles.container}>
      <CustomForm
        fields={fields}
        onSubmit={() => {}}
        control={control}
        errors={errors}
        buttonTitle={isLoading ? "Guardando..." : "Guardar"}
        isLoading={isLoading}
        hideButton
      />
    </View>
  );
};

export default CategoryForm;
