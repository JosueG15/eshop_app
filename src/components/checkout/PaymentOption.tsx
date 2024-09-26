import React from "react";
import { View, StyleSheet } from "react-native";
import { CheckBox, Text, Icon, useTheme } from "@rneui/themed";

interface PaymentOptionProps {
  title: string;
  description: string;
  isSelected: boolean;
  onSelect: () => void;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({
  title,
  description,
  isSelected,
  onSelect,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.optionContainer}>
      <CheckBox
        title={title}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={isSelected}
        onPress={onSelect}
        containerStyle={styles.checkBoxContainer}
        textStyle={{ color: theme.colors.secondary }}
        checkedColor={theme.colors.nextColor}
      />
      {isSelected && (
        <>
          <Icon
            name="info"
            type="font-awesome"
            color={theme.colors.nextColor}
          />
          <Text style={[styles.infoText, { color: theme.colors.secondary }]}>
            {description}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    marginBottom: 20,
  },
  checkBoxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  infoText: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default PaymentOption;
