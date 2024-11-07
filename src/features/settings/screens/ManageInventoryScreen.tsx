import React, { useState, useMemo } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { IconButton } from "react-native-paper";
import { useTheme } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";

import CustomTable, {
  TableColumn,
} from "../../../shared/components/CustomTable";
import CustomSearchBar from "../../../shared/components/CustomSearchBar";
import { AppDispatch, RootState } from "../../../store/store";
import { IProduct } from "../../../shared/types/productType";
import { removeProduct } from "../../../store/slices/product/productSlice";

const ManageInventoryScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, isLoading, page, totalPages } = useSelector(
    (state: RootState) => state.products
  );
  const { theme } = useTheme();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    return products?.filter((product: IProduct) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const openProductFormScreen = (product: IProduct | null) => {
    navigation.navigate("ProductFormScreen", { product });
  };

  const handleDeleteProduct = (productId: string) => {
    Alert.alert(
      "Eliminar Producto",
      "¿Estás seguro de que deseas eliminar este producto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => dispatch(removeProduct(productId)),
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
      }),
    [theme]
  );

  const columns = useMemo(
    () => [
      { key: "name", title: "Nombre", width: 150 },
      { key: "price", title: "Precio", width: 100 },
      { key: "countInStock", title: "En Stock", width: 100 },
      {
        key: "actions",
        title: "Acciones",
        render: (item: IProduct) => (
          <>
            <IconButton
              icon="pencil"
              iconColor={theme.colors.infoTextColor}
              size={20}
              onPress={() => openProductFormScreen(item)}
            />
            <IconButton
              icon="delete"
              iconColor={theme.colors.error}
              size={20}
              onPress={() => handleDeleteProduct(item.id)}
            />
          </>
        ),
        width: 120,
      },
    ],
    [theme]
  );

  return (
    <View style={styles.container}>
      <CustomSearchBar
        search={searchTerm}
        setSearch={setSearchTerm}
        placeholder="Buscar producto"
      />

      <CustomTable
        columns={columns as TableColumn<IProduct>[]}
        data={filteredProducts || []}
        onAddPress={() => openProductFormScreen(null)}
      />
    </View>
  );
};

export default ManageInventoryScreen;
