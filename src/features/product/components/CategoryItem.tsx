import React, { useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { ListItem, Badge, Text } from "@rneui/themed";
import { styles as createStyles } from "../styles/productStyle";
import { useTheme } from "@rneui/themed";
import { ICategory } from "../types/categoryType";

interface CategoryItemProps {
  category: ICategory;
  isSelected: boolean;
  onSelectCategory: (categoryId: string) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = React.memo(
  ({ category, isSelected, onSelectCategory }) => {
    const { theme } = useTheme();
    const styles = useMemo(() => {
      return createStyles(theme.colors);
    }, [theme.colors]);

    return (
      <ListItem containerStyle={styles.listItem}>
        <TouchableOpacity
          onPress={() => onSelectCategory(category.id)}
          style={styles.touchable}
          accessible={true}
          accessibilityLabel={`Filtrar por categoria ${category.name}`}
        >
          <Badge
            value={<Text style={styles.badgeText}>{category.name}</Text>}
            containerStyle={[
              styles.badgeContainer,
              !isSelected && styles.badgeContainerUnselected,
            ]}
            badgeStyle={styles.badgeStyle}
          />
        </TouchableOpacity>
      </ListItem>
    );
  }
);

export default CategoryItem;
