import React, { useMemo } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import CustomForm from "../../../shared/components/CustomForm";
import { Field } from "../../../shared/types/formTypes";
import { ICategory } from "../../product/types/categoryType";
import { useTheme } from "@rneui/themed";

interface CategoryFormProps {
  selectedCategory: ICategory | null;
  onSubmit: () => void;
  isLoading: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  selectedCategory,
  onSubmit,
  isLoading,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<ICategory>>({
    defaultValues: {
      name: selectedCategory?.name || "",
      color: selectedCategory?.color || "",
      icon: selectedCategory?.icon || "",
    },
  });

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
        control={control}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        buttonTitle={isLoading ? "Guardando..." : "Guardar"}
        isLoading={isLoading}
        hideButton
      />
    </View>
  );
};

export default CategoryForm;
