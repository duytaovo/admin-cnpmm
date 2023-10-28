import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import "./styles.css";
import { Link } from "react-router-dom";
import path from "src/constants/path";
// import PaginationCustom from '../Pagination'
interface Props {
  rows: any;
  columns: any;
  totalPages?: number;
  totalItems?: number;
  handleOnChange?: any;
}

const DataTable = ({
  rows,
  columns,
  totalPages,
  totalItems = 0,
  handleOnChange,
}: Props) => {
  return (
    <Paper className="p-4">
      <div className="w-full text-[24px] text-gray-500 mb-[10px] flex items-center justify-between">
        Thêm danh mục
        <Link
          to={path.categoryNew}
          className="no-underline text-green-500 text-lg font-medium border-[1px] border-solid border-[green] p-3 rounded cursor-pointer"
        >
          Thêm mới
        </Link>
      </div>
      <div className="" style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
        />
      </div>
      <div className="">
        {/* <p className=''>{`Total: ${totalItems}`}</p> */}
        {/* <PaginationCustom totalPages={totalPages} handleOnChange={handleOnChange} /> */}
      </div>
    </Paper>
  );
};

export default DataTable;
