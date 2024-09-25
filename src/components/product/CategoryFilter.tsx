import React from "react";
import { ScrollView, TouchableOpacity, StyleSheet, View } from "react-native";
import { ListItem, Badge, Text, useTheme, Icon } from "@rneui/themed";
import { ICategory } from "../../types/products";

interface CategoryFilterProps {
  categories: ICategory[];
  selectedCategories: string[];
  onSelectCategory: (categoryId: string) => void;
  onClearCategories: () => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onSelectCategory,
  onClearCategories,
}) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        style={[styles.scrollView, { backgroundColor: colors.background }]}
      >
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          return (
            <ListItem key={category.id} containerStyle={styles.listItem}>
              <TouchableOpacity
                onPress={() => onSelectCategory(category.id)}
                style={styles.touchable}
              >
                <Badge
                  value={
                    <Text
                      style={[
                        styles.badgeText,
                        {
                          color: colors.secondary,
                        },
                      ]}
                    >
                      {category.name}
                    </Text>
                  }
                  containerStyle={[
                    styles.badgeContainer,
                    {
                      backgroundColor: colors.borderColor,
                      opacity: isSelected ? 1 : 0.2,
                    },
                  ]}
                  badgeStyle={styles.badgeStyle}
                />
              </TouchableOpacity>
            </ListItem>
          );
        })}
      </ScrollView>

      {selectedCategories.length > 0 && (
        <TouchableOpacity
          style={[styles.clearButton, { backgroundColor: colors.primary }]}
          onPress={onClearCategories}
        >
          <Icon
            name="close"
            type="font-awesome"
            color={colors.secondary}
            size={16}
          />
          <Text style={[styles.clearButtonText, { color: colors.secondary }]}>
            Clear Filters
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  scrollView: {
    paddingHorizontal: 5,
  },
  scrollViewContent: {
    paddingVertical: 15,
    alignItems: "center",
  },
  listItem: {
    padding: 0,
    margin: 0,
    borderRadius: 0,
    backgroundColor: "transparent",
  },
  touchable: {
    alignItems: "center",
  },
  badgeContainer: {
    justifyContent: "center",
    alignItems: "center",

    marginHorizontal: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  badgeStyle: {
    borderWidth: 0,
    borderColor: "none",
    backgroundColor: "transparent",
  },
  badgeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    marginTop: 10,
    borderRadius: 20,
    alignSelf: "center",
    shadowOpacity: 0.25,
    shadowRadius: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
  },
  clearButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default CategoryFilter;
