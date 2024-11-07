import React from "react";
import { ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";

interface ImagePreviewListProps {
  images: string[];
  onDelete: (uri: string) => void;
}

const ImagePreviewList: React.FC<ImagePreviewListProps> = ({
  images,
  onDelete,
}) => (
  <ScrollView horizontal style={styles.imageContainer}>
    {images.map((uri, index) => (
      <TouchableOpacity key={index} onPress={() => onDelete(uri)}>
        <Image
          source={{ uri }}
          style={styles.imagePreview}
          resizeMode="cover"
        />
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  imagePreview: {
    width: 70,
    height: 70,
    marginRight: 8,
    borderRadius: 4,
  },
});

export default ImagePreviewList;
