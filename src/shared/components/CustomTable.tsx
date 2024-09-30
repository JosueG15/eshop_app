import React, { useState, useMemo } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { DataTable, IconButton, Menu } from "react-native-paper";
import { useTheme } from "@rneui/themed";

interface TableColumn<T> {
  key: keyof T;
  title: string;
  width?: number;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onRowPress?: (item: T) => void;
  onAddPress?: () => void;
  rowsPerPageOptions?: number[];
}

const CustomTable = <T extends { id: string }>({
  columns,
  data,
  onRowPress,
  onAddPress,
  rowsPerPageOptions = [5, 10, 15],
}: TableProps<T>) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [menuVisible, setMenuVisible] = useState(false);
  const { theme } = useTheme();

  const paginatedData = useMemo(
    () => data.slice(page * rowsPerPage, (page + 1) * rowsPerPage),
    [data, page, rowsPerPage]
  );

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    closeMenu();
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
        },
        scrollContainer: {
          height: 400,
        },
        table: {
          backgroundColor: theme.colors.tableRowBackground,
          borderRadius: 8,
          elevation: 3,
          shadowColor: theme.colors.borderColor,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
        header: {
          backgroundColor: theme.colors.tableHeaderBackground,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        },
        row: {
          borderBottomColor: theme.colors.borderColor,
          borderBottomWidth: 1,
        },
        column: {
          justifyContent: "center",
          alignItems: "center",
        },
        paginationContainer: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
          backgroundColor: theme.colors.tablePaginationBackground,
        },
        dropdownContainer: {
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          justifyContent: "space-between",
        },
        addButton: {
          marginLeft: 10,
          backgroundColor: theme.colors.tableIconBackground,
        },
        paginationText: {
          color: theme.colors.secondary,
        },
      }),
    [theme]
  );

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={<IconButton icon="menu" onPress={openMenu} />}
        >
          {rowsPerPageOptions.map((option) => (
            <Menu.Item
              key={option}
              onPress={() => handleRowsPerPageChange(option)}
              title={String(option)}
            />
          ))}
        </Menu>
        {onAddPress && (
          <IconButton
            icon="plus"
            onPress={onAddPress}
            style={styles.addButton}
            accessibilityLabel="Agregar nuevo"
          />
        )}
      </View>

      <ScrollView horizontal>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <DataTable style={styles.table}>
            <DataTable.Header style={styles.header}>
              {columns.map((column) => (
                <DataTable.Title
                  key={String(column.key)}
                  style={[styles.column, { width: column.width || 150 }]}
                  textStyle={{ color: theme.colors.tableLabelBackground }}
                >
                  {column.title}
                </DataTable.Title>
              ))}
            </DataTable.Header>

            {paginatedData.map((item) => (
              <DataTable.Row
                key={item.id}
                onPress={() => onRowPress && onRowPress(item)}
                style={styles.row}
              >
                {columns.map((column) => (
                  <DataTable.Cell
                    key={String(column.key)}
                    style={[styles.column, { width: column.width || 150 }]}
                    textStyle={{ color: theme.colors.tableLabelBackground }}
                  >
                    {column.render
                      ? column.render(item)
                      : String(item[column.key])}
                  </DataTable.Cell>
                ))}
              </DataTable.Row>
            ))}
          </DataTable>
        </ScrollView>
      </ScrollView>

      <View style={styles.paginationContainer}>
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(data.length / rowsPerPage)}
          onPageChange={(newPage) => setPage(newPage)}
          label={
            <Text style={styles.paginationText}>
              {`${page * rowsPerPage + 1}-${Math.min(
                (page + 1) * rowsPerPage,
                data.length
              )} de ${data.length}`}
            </Text>
          }
          showFastPaginationControls
        />
      </View>
    </View>
  );
};

export default CustomTable;
