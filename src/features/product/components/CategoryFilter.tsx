import React, { useMemo } from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { useTheme, Icon } from "@rneui/themed";
import CategoryItem from "./CategoryItem";
import { styles as createStyles } from "../styles/productStyle";
import { ICategory } from "../types/categoryType";

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

  const styles = useMemo(() => {
    return createStyles(theme.colors);
  }, [theme.colors]);

  const renderedCategories = useMemo(
    () =>
      categories.map((category) => {
        const isSelected = selectedCategories.includes(category.id);
        return (
          <CategoryItem
            key={category.id}
            category={category}
            isSelected={isSelected}
            onSelectCategory={onSelectCategory}
          />
        );
      }),
    [categories, selectedCategories, onSelectCategory, styles]
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        style={styles.scrollView}
      >
        {renderedCategories}
      </ScrollView>

      {selectedCategories.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={onClearCategories}
          accessible={true}
          accessibilityLabel="Reiniciar Filtros"
        >
          <Icon
            name="close"
            type="font-awesome"
            color={theme.colors.secondary}
            size={16}
          />
          <Text style={styles.clearButtonText}>Reiniciar Filtros</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CategoryFilter;
