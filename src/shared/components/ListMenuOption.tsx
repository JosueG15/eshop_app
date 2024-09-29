import { Button, Divider, useTheme } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { MenuOption } from "../../features/user/types/MenuOption";
import { useMemo } from "react";

const ListMenuOption = ({ item }: { item: MenuOption }) => {
  const { theme } = useTheme();
  const { colors } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        divider: {
          marginVertical: 10,
        },
        textColor: {
          color: colors.secondary,
        },
      }),
    [colors]
  );

  return (
    <>
      <Button
        titleStyle={styles.textColor}
        title={item.title}
        type="clear"
        onPress={item.onPress}
      />
      <Divider style={styles.divider} />
    </>
  );
};

export default ListMenuOption;
