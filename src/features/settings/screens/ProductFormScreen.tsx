import React, { useEffect, useState } from "react";
import { StyleSheet, Alert, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { Button, Text, Switch, Provider } from "react-native-paper";
import { useTheme } from "@rneui/themed";
import { useSelector, useDispatch } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import { FlatList } from "react-native";

import { IProduct } from "../../../shared/types/productType";
import { AppDispatch, RootState } from "../../../store/store";
import {
  createProduct,
  modifyProduct,
  resetSuccess,
} from "../../../store/slices/product/productSlice";
import FormField from "../../../shared/components/FormField";
import AppModal from "../../../shared/components/AppModal";
import ImagePreviewList from "../../../shared/components/ImagePreviewList";

interface ProductFormScreenProps {
  navigation: any;
  route: any;
}

const ProductFormScreen: React.FC<ProductFormScreenProps> = ({
  route,
  navigation,
}) => {
  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { product }: { product: IProduct } = route.params || {};
  const themeMode = useSelector((state: RootState) => state.theme.themeMode);
  const isSuccess = useSelector((state: RootState) => state.products.isSuccess);
  const isLoading = useSelector((state: RootState) => state.products.isLoading);

  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  const [images, setImages] = useState<string[]>(product?.images || []);
  const [deleteImageUri, setDeleteImageUri] = useState<string | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    product?.category?.id
  );

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownItems, setDropdownItems] = useState(
    categories.map((category) => ({
      label: category.name,
      value: category.id,
    }))
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Partial<IProduct>>({
    defaultValues: {
      name: product?.name || "",
      brand: product?.brand || "",
      description: product?.description || "",
      richDescription: product?.richDescription || "",
      price: product?.price || 0,
      countInStock: product?.countInStock || 0,
      rating: product?.rating || 0,
      numReviews: product?.numReviews || 0,
      isFeatured: product?.isFeatured || false,
      images: product?.images || [],
    },
  });

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("richDescription", product.richDescription || "");
      setValue("brand", product.brand || "");
      setValue("price", product.price);
      setValue("countInStock", product.countInStock);
      setValue("rating", product.rating);
      setValue("numReviews", product.numReviews);
      setValue("isFeatured", product.isFeatured);
      setSelectedCategory(product.category?.id);
      setImages(product.images || []);
    }
  }, [product, setValue]);

  useEffect(() => {
    if (isSuccess) {
      navigation.goBack();
      dispatch(resetSuccess());
    }
  }, [isSuccess, navigation, dispatch]);

  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Se necesita acceso a la galería.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const selectedImages = result.assets.map((asset) => asset.uri);
      const updatedImages = [...images, ...selectedImages];
      setImages(updatedImages);
      setValue("images", updatedImages);
    }
  };

  const handleDeleteImage = (uri: string) => {
    setDeleteImageUri(uri);
    setIsDeleteModalVisible(true);
  };

  const confirmDeleteImage = () => {
    if (deleteImageUri) {
      const updatedImages = images.filter(
        (imgUri) => imgUri !== deleteImageUri
      );
      setImages(updatedImages);
      setValue("images", updatedImages);
      setDeleteImageUri(null);
      setIsDeleteModalVisible(false);
    }
  };

  const onSubmit = (formData: Partial<IProduct>) => {
    formData.images = images;
    formData.category = categories.find((cat) => cat.id === selectedCategory);
    if (product) {
      dispatch(modifyProduct({ productId: product.id, product: formData }));
    } else {
      dispatch(createProduct(formData));
    }
  };

  const renderForm = () => (
    <>
      <FormField
        name="name"
        label="Nombre"
        placeholder="Nombre del producto"
        control={control}
        errors={errors}
        required
      />
      <FormField
        name="brand"
        label="Marca"
        placeholder="Marca del producto"
        control={control}
        errors={errors}
        required
      />
      <FormField
        name="description"
        label="Descripción"
        placeholder="Descripción breve del producto"
        control={control}
        errors={errors}
        required
        multiline
      />
      <FormField
        name="richDescription"
        label="Descripción Detallada"
        placeholder="Descripción detallada"
        control={control}
        errors={errors}
        multiline
      />
      <Text style={styles.label}>Categoría</Text>
      <DropDownPicker
        open={isDropdownOpen}
        value={selectedCategory || null}
        items={dropdownItems}
        setOpen={setDropdownOpen}
        setValue={setSelectedCategory}
        setItems={setDropdownItems}
        placeholder="Seleccione una categoría"
        style={{
          marginBottom: 20,
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.borderColor,
        }}
        listItemContainerStyle={{
          backgroundColor: theme.colors.background,
        }}
        theme={themeMode === "dark" ? "DARK" : "LIGHT"}
      />

      <FormField
        name="price"
        label="Precio"
        placeholder="Precio del producto"
        control={control}
        errors={errors}
        keyboardType="numeric"
        required
      />
      <FormField
        name="countInStock"
        label="En Stock"
        placeholder="Cantidad en stock"
        control={control}
        errors={errors}
        keyboardType="numeric"
        required
      />
      <Text style={styles.label}>Imágenes</Text>
      <ImagePreviewList images={images} onDelete={handleDeleteImage} />
      <Button
        icon="camera"
        mode="contained"
        onPress={pickImages}
        style={styles.addImageButton}
      >
        Agregar Imágenes
      </Button>
      <Text style={styles.label}>¿Es destacado?</Text>
      <Controller
        control={control}
        name="isFeatured"
        render={({ field: { onChange, value } }) => (
          <Switch
            value={value}
            onValueChange={onChange}
            color={theme.colors.buttonColor}
          />
        )}
      />
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        disabled={isLoading}
        style={{ backgroundColor: theme.colors.infoColor, marginTop: 16 }}
      >
        {product ? "Actualizar Producto" : "Agregar Producto"}
      </Button>
      <AppModal
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onConfirm={confirmDeleteImage}
        title="Confirmar Eliminación"
        message="¿Estás seguro de que deseas eliminar esta imagen?"
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </>
  );

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingHorizontal: 16,
      paddingVertical: 20,
      backgroundColor: theme.colors.background,
    },
    label: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.secondary,
      marginBottom: 8,
    },
    addImageButton: {
      marginTop: 8,
      alignSelf: "flex-start",
      marginBottom: 30,
      backgroundColor: theme.colors.secondary,
    },
  });

  return (
    <Provider>
      <FlatList
        data={[{ key: "form" }]}
        renderItem={renderForm}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.container}
      />
    </Provider>
  );
};

export default ProductFormScreen;
