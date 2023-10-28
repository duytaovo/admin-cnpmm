import { IconButton, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { SelectChangeEvent } from "@mui/material/Select";
import path from "src/constants/path";

import React, { useEffect, useState } from "react";
import { Button, Space, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { deleteProduct, getProducts } from "src/store/product/productSlice";
import { Product } from "src/types/product.type";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  deletePurchase,
  getPurchase,
  updatePurchase,
} from "src/store/purchases/productSlice";

const TablePurchase: React.FC = () => {
  const dispatch = useAppDispatch();
  const { purchase } = useAppSelector((state) => state.purchase);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getPurchase(""));
  }, []);
  const columns: ColumnsType<any> = [
    { title: "Tên sản phẩm", dataIndex: "product_name", key: "product_name" },
    { title: "Giá sản phẩm", dataIndex: "price", key: "price" },

    // { title: "Mô tả", dataIndex: "description", key: "description" },
    { title: "Số lượng", dataIndex: "buy_count", key: "buy_count" },
    { title: "Đánh giá", dataIndex: "rating", key: "rating" },
    {
      title: "Khuyến mãi",
      dataIndex: "price_before_discount",
      key: "price_before_discount",
    },
    { title: "Trạng thái", dataIndex: "status", key: "status" },

    { title: "Ngày tạo", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (params) => {
        const { key, _id } = params;
        const handleUpdate = async () => {
          const res = await dispatch(updatePurchase(_id));
          unwrapResult(res);
          const d = res?.payload;
          if (d?.status !== 200) return toast.error(d?.message);
          await toast.success("Cập nhật đơn thành công ");
          await dispatch(getPurchase(""));
        };

        const handleDelete = async () => {
          const res = await dispatch(deletePurchase(_id));
          unwrapResult(res);
          const d = res?.payload;
          if (d?.status !== 200) return toast.error(d?.message);
          await toast.success("Xóa đơn thành công ");
          await dispatch(getPurchase(""));
        };
        return (
          <Space>
            {/* <Link to={`/product/detail/${_id}`}> */}{" "}
            <IconButton className="text-mainColor" onClick={handleUpdate}>
              <EditIcon
                className="text-mainColor"
                sx={{
                  color: "",
                }}
              />
            </IconButton>
            {/* </Link> */}
            {/* <Link to={path.users}> */}
            <Tooltip title="Thay đổi trạng thái " className="disabled:bg-white">
              <IconButton onClick={handleDelete}>
                <DeleteIcon className="text-red-700" />
              </IconButton>
            </Tooltip>
            {/* </Link> */}
          </Space>
        );
      },
    },
  ];
  const originData: any[] = [];
  for (let i = 0; i < purchase?.length; i++) {
    originData.push({
      _id: purchase[i]?._id,
      buy_count: purchase[i]?.buy_count,
      price: purchase[i]?.price,
      price_before_discount: purchase[i]?.price_before_discount,
      status: purchase[i].status === 4 ? "Đã giao" : "Đang xác nhận",
      product_name: purchase[i].product?.name,
      product_id: purchase[i].product?._id,
      rating: purchase[i].product?.rating,
      images: purchase[i].product?.images,
      image: purchase[i].product?.image,
      sold: purchase[i].product?.sold,
      view: purchase[i].product?.view,
      createdAt: purchase[i].createdAt,
      updatedAt: purchase[i].updatedAt,
    });
  }
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
  const [products, setProducts] = React.useState("");

  const handleChangeProduct = (event: SelectChangeEvent) => {
    setProducts(event.target.value as string);
  };

  const onClick = (value: string) => {
    navigate(value);
  };
  return (
    <div className="mx-6">
      <div className="w-full text-[24px] text-gray-500 mb-[10px] flex items-center justify-between">
        <div>
          Quản lý đơn hàng
          <div>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
            </span>
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record?.description}</p>
          ),
          rowExpandable: (record) => record?.name !== "Not Expandable",
        }}
        dataSource={originData}
      />
    </div>
  );
};

export default TablePurchase;
