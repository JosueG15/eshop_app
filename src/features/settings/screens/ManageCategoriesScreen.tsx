import React, { useState, useMemo, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { IconButton } from "react-native-paper";
import { useTheme } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import CustomTable from "../../../shared/components/CustomTable";
import CustomSearchBar from "../../../shared/components/CustomSearchBar";
import AppModal from "../../../shared/components/AppModal";
import CategoryForm from "../components/CategoryForm";
import { ICategory } from "../../product/types/categoryType";
import {
  fetchCategories,
  createCategory,
  modifyCategory,
  removeCategory,
} from "../../../store/slices/categories/categorySlice";
import { AppDispatch, RootState } from "../../../store/store";

const ManageCategoriesScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, isLoading } = useSelector(
    (state: RootState) => state.categories
  );
  const { theme } = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<Partial<ICategory>>({
    defaultValues: {
      name: "",
      color: "",
      icon: "",
    },
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      setValue("name", selectedCategory.name);
      setValue("color", selectedCategory.color);
      setValue("icon", selectedCategory.icon);
    } else {
      reset();
    }
  }, [selectedCategory, setValue, reset]);

  const filteredCategories = useMemo(() => {
    return categories?.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  const openModal = (category: ICategory | null) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setModalVisible(false);
  };

  const onSubmit = (formData: Partial<ICategory>) => {
    if (selectedCategory) {
      dispatch(
        modifyCategory({
          categoryId: selectedCategory.id,
          category: formData,
        })
      );
    } else {
      dispatch(createCategory(formData));
    }
    closeModal();
  };

  const handleDeleteCategory = (categoryId: string) => {
    Alert.alert(
      "Eliminar Categoría",
      "¿Estás seguro de que deseas eliminar esta categoría?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            dispatch(removeCategory(categoryId));
          },
        },
      ]
    );
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          padding: 20,
          backgroundColor: theme.colors.background,
        },
        addButton: {
          marginTop: 20,
        },
        loadingContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
      }),
    [theme]
  );

  const columns = [
    {
      key: "name" as keyof ICategory,
      title: "Nombre",
      width: 150,
    },
    {
      key: "color" as keyof ICategory,
      title: "Color",
      width: 100,
    },
    {
      key: "icon" as keyof ICategory,
      title: "Icono",
      render: (item: ICategory) => (
        <IconButton
          iconColor={theme.colors.secondary}
          icon={item.icon}
          size={20}
        />
      ),
      width: 80,
    },
    {
      key: "actions" as keyof ICategory,
      title: "Acciones",
      render: (item: ICategory) => (
        <>
          <IconButton
            icon="pencil"
            iconColor={theme.colors.infoColor}
            size={20}
            onPress={() => openModal(item)}
          />
          <IconButton
            iconColor={theme.colors.error}
            icon="delete"
            size={20}
            onPress={() => handleDeleteCategory(item.id)}
          />
        </>
      ),
      width: 120,
    },
  ];

  return (
    <View style={styles.container}>
      <CustomSearchBar
        search={searchTerm}
        setSearch={setSearchTerm}
        placeholder="Buscar categoría"
      />

      <CustomTable
        columns={columns}
        data={filteredCategories || []}
        onAddPress={() => openModal(null)}
      />

      <AppModal
        visible={isModalVisible}
        onCancel={closeModal}
        onConfirm={handleSubmit(onSubmit)}
        title={selectedCategory ? "Editar Categoría" : "Agregar Categoría"}
      >
        <CategoryForm control={control} errors={errors} isLoading={isLoading} />
      </AppModal>
    </View>
  );
};

export default ManageCategoriesScreen;
