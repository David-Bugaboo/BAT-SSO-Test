import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";

import React from "react";
import { BsFillTrashFill, BsSearch } from "react-icons/bs";

interface CustomTableProps<T extends object> {
  title: string;
  data: T[];
  columns: MUIDataTableColumnDef[] | string[];
  showRow?: (id: string) => void;
  deleteRow?: (email: string) => Promise<void>;
  handleSearch?(string: string | null): void;
}

export default function CustomTable<T extends object>({
  title,
  data,
  columns,
  showRow,
  deleteRow,
  handleSearch,
}: CustomTableProps<T>): JSX.Element {
  const deleteRowData = async (rowData: any[]) => {
    if (!deleteRow) return;
    if (confirm(`Você quer realmente deletar o usuário: ${rowData[1]}`)) {
      await deleteRow(rowData[2]);
    }
  };

  const columnWithPanel: MUIDataTableColumnDef[] = [
    ...columns,
    {
      name: "Excluir",
      options: {
        customBodyRender: (_, tableMeta) =>
          !!deleteRow && (
            <div style={{ display: "flex" }}>
              <BsFillTrashFill
                fontSize={20}
                onClick={() => deleteRowData(tableMeta.rowData)}
                cursor="pointer"
              />
            </div>
          ),
        sort: false,
        display: !!deleteRow,
      },
    },
    {
      name: "Exibir",
      options: {
        customBodyRender: (_, tableMeta) =>
          !!showRow && (
            <div style={{ display: "flex" }}>
              <BsSearch
                fontSize={20}
                onClick={() => showRow(tableMeta.rowData[0])}
                cursor="pointer"
              />
            </div>
          ),
        sort: false,
        display: !!showRow,
      },
    },
  ];
  return (
    <MUIDataTable
      title={title}
      columns={columnWithPanel}
      data={data.map((item) => item)}
      options={{
        onSearchChange: (search) => handleSearch && handleSearch(search),
        filterType: "checkbox",
        rowsPerPageOptions: [1, 3, 5, 6],
        jumpToPage: true,
        rowsPerPage: 10,
        onChangePage(currentPage) {
          console.log({ currentPage });
        },
        onChangeRowsPerPage(numberOfRows) {
          console.log({ numberOfRows });
        },
      }}
    />
  );
}
