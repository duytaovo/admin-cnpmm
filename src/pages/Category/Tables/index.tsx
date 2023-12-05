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
import { deleteCategory, getCategorys } from "src/store/category/categorySlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const TableProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const { category } = useAppSelector((state) => state.category);
  const columns: ColumnsType<any> = [
    { title: "Tên danh mục", dataIndex: "name", key: "name" },
    // { title: "Ngày tạo", dataIndex: "createdAt", key: "createdAt" },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (params) => {
        const { key, id } = params;
        const handleDelete = async () => {
          const res = await dispatch(deleteCategory([id]));
          unwrapResult(res);
          const d = res?.payload;
          // if (d?.status !== 200) return toast.error(d?.message);
          await toast.success("Xóa danh mục thành công ");
          await dispatch(getCategorys(""));
        };
        return (
          <Space>
            <Link to={`/category/detail/${id}`}>
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
            {/* <Link to={path.users}> */}
            <Tooltip title="Thay đổi trạng thái " className="disabled:bg-white">
              <IconButton>
                <DeleteIcon className="text-red-700" />
              </IconButton>
            </Tooltip>
            {/* </Link> */}
          </Space>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(getCategorys(""));
  }, []);
  const originData: any[] = [];
  for (let i = 0; i < category.length; i++) {
    originData.push({
      key: i.toString(),
      name: category[i].name,
      createdAt: category[i].createdAt,
      updatedAt: category[i].updatedAt,
    });
  }

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

      <Table columns={columns} dataSource={originData} />
    </div>
  );
};

export default TableProduct;

