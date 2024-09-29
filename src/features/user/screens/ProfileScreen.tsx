import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import * as ImagePicker from "expo-image-picker";
import { logout } from "../../../store/slices/auth/authSlice";
import ProfileMenuOption from "../components/ProfileMenuOptions";
import { useTheme } from "@rneui/themed";
import { useUser } from "../hooks/useUser";
import { useNavigation } from "@react-navigation/native";
import useImageValidator from "../../../shared/hooks/useImageValidator";
import { UserNavigationProp } from "../../../shared/types/routeType";

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { colors } = theme;
  const { avatarUpload, isLoading: isAvatarUploading } = useUser();
  const user = useSelector((state: RootState) => state.auth.user);
  const { navigate } = useNavigation<UserNavigationProp>();

  const { validatedUrl: avatarUrl, isLoading: isAvatarValidating } =
    useImageValidator(user?.avatar || "");

  const handleAvatarPress = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Se requiere acceso a las fotos para actualizar el avatar");
      return;
    }

    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!image.canceled && image.assets && image.assets.length > 0) {
      const selectedImageUri = image.assets[0].uri;

      avatarUpload({ imageUri: selectedImageUri });
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuOptions = [
    {
      title: "Mis pedidos",
      onPress: () => {
        /* TODO: Navigate to orders */
      },
    },
    {
      title: "Editar información personal",
      onPress: () => {
        navigate("EditPersonalInfo");
      },
    },
    {
      title: "Editar datos de envío",
      onPress: () => {
        navigate("EditShippingInfo");
      },
    },
    { title: "Cerrar Sesión", onPress: handleLogout },
  ];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          backgroundColor: colors.background,
        },
        avatarContainer: {
          marginBottom: 20,
          borderWidth: 2,
          borderColor: colors.priceText,
          borderRadius: 50,
          padding: 5,
          justifyContent: "center",
          alignItems: "center",
        },
        avatar: {
          width: 100,
          height: 100,
          borderRadius: 50,
        },
        greeting: {
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 30,
          color: colors.secondary,
        },
        menuContainer: {
          width: "100%",
        },
      }),
    [colors]
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={handleAvatarPress}
        disabled={isAvatarUploading || isAvatarValidating}
      >
        {isAvatarValidating || isAvatarUploading ? (
          <ActivityIndicator size="large" color={colors.secondary} />
        ) : (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        )}
      </TouchableOpacity>
      <Text style={styles.greeting}>Bienvenido, {user?.name || "Usuario"}</Text>

      <FlatList
        data={menuOptions}
        renderItem={({ item }) => <ProfileMenuOption item={item} />}
        keyExtractor={(_item, index) => index.toString()}
        style={styles.menuContainer}
      />
    </View>
  );
};

export default ProfileScreen;
