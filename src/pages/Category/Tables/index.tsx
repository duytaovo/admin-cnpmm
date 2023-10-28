import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { SelectChangeEvent } from "@mui/material/Select";
import path from "src/constants/path";
import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  name: string;
  brand: string;
  mota: string;
  status?: any;
  action?: any;
  description: string;
  loaiSp: string;
}

const columns: ColumnsType<DataType> = [
  { title: "Loại danh mục", dataIndex: "loaiSp", key: "loaiSp" },
  { title: "Tên danh mục", dataIndex: "name", key: "name" },
  { title: "Tên thương hiệu", dataIndex: "brand", key: "brand" },
  // { title: "Giá sản phẩm", dataIndex: "price", key: "price" },
  { title: "Mô tả", dataIndex: "mota", key: "mota" },
  // { title: "Khuyến mãi", dataIndex: "sale", key: "sale" },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: () => {
      // const handleChangeStatus = (e: any) => {};
      return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Trạng thái</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={status}
            label="Status"
            // onChange={handleChange}
          >
            <MenuItem value={0}>Not verify</MenuItem>
            <MenuItem value={1}>Verify</MenuItem>
            <MenuItem value={2}>Disable</MenuItem>
            <MenuItem value={3}>Enable</MenuItem>
          </Select>
        </FormControl>
      );
    },
  },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    render: () => (
      <Space>
        <Link to={path.category}>
          {" "}
          <IconButton className="text-mainColor">
            <EditIcon
              className="text-mainColor"
              sx={{
                color: "",
              }}
            />
          </IconButton>
        </Link>
        <Link to={path.users}>
          <Tooltip title="Thay đổi trạng thái " className="disabled:bg-white">
            <IconButton>
              <DeleteIcon className="text-red-700" />
            </IconButton>
          </Tooltip>
        </Link>
      </Space>
    ),
  },
];
// const originData: DataType[] = [];
// for (let i = 0; i < 100; i++) {
//   originData.push({
//     key: i.toString(),
//     name: `Edward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
// }
const data: DataType[] = [
  {
    key: 1,
    loaiSp: "Điện thoại",
    brand: "Apple",
    name: "Iphone 15 Plus",
    mota: "Iphone 15 Plus được ra mắt ....",
    description: "Mô tả chi tiết ở đây",
  },
  {
    key: 2,
    loaiSp: "Điện thoại",
    brand: "Apple",
    name: "Iphone 15 Plus",
    mota: "Iphone 15 Plus được ra mắt ....",
    description: "Mô tả chi tiết ở đây",
  },
  {
    key: 3,
    loaiSp: "Điện thoại",
    brand: "Apple",
    name: "Iphone 15 Plus",
    mota: "Iphone 15 Plus được ra mắt ....",
    description: "Mô tả chi tiết ở đây",
  },
];

const TableProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    // dispatch(getCars(""));
  }, []);
  const [status, setStatus] = React.useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div className="mx-6">
      <div className="w-full text-[24px] text-gray-500 mb-[10px] flex items-center justify-between">
        Quản lý danh mục
        <Link
          to={path.categoryNew}
          className="no-underline text-green-500 text-lg font-medium border-[1px] border-solid border-[green] p-3 rounded cursor-pointer"
        >
          Thêm mới
        </Link>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          Reload
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record?.description}</p>
          ),
          rowExpandable: (record) => record?.name !== "Not Expandable",
        }}
        dataSource={data}
      />
    </div>
  );
};

export default TableProduct;
