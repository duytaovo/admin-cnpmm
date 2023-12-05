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

const TableProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state) => state.product);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProducts({ limit: 30 }));
  }, []);
  const columns: ColumnsType<any> = [
    { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    { title: "Tên thương hiệu", dataIndex: "category", key: "category" },
    {
      title: "Giá gốc",
      dataIndex: "price_before_discount",
      key: "price_before_discount",
    },
    { title: "Giá khuyến mãi ", dataIndex: "price", key: "price" },

    // { title: "Mô tả", dataIndex: "description", key: "description" },
    { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
    { title: "Đánh giá", dataIndex: "rating", key: "rating" },
    { title: "Đã bán", dataIndex: "sold", key: "sold" },
    // { title: "Đã bán", dataIndex: "sold", key: "sold" },

    { title: "Ngày tạo", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (params) => {
        const { key, _id } = params;
        const handleDelete = async () => {
          const res = await dispatch(deleteProduct([_id]));
          unwrapResult(res);
          const d = res?.payload;
          if (d?.status !== 200) return toast.error(d?.message);
          await toast.success("Xóa sản phẩm thành công ");
          await dispatch(getProducts(""));
        };
        return (
          <Space>
            <Link to={`/product/detail/${_id}`}>
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
  const originData = [];
  for (let i = 0; i < product.products?.length; i++) {
    originData.push({
      key: product.products[i]._id,
      _id: product.products[i]._id,
      name: product.products[i].name,
      category: product.products[i].category?.name,
      description: product.products[i].description,
      price: product.products[i].price,
      price_before_discount: product.products[i].price_before_discount,
      quantity: product.products[i].quantity,
      rating: product.products[i].rating,
      images: product.products[i].images,
      image: product.products[i].image,
      sold: product.products[i].sold,
      view: product.products[i].view,
      createdAt: product.products[i].createdAt.substring(0, 10),
      updatedAt: product.products[i].updatedAt,
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
          Quản lý sản phẩm
          <div>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
            </span>
          </div>
        </div>
        <Link
          to={path.productNew}
          className="no-underline text-green-500 text-lg font-medium border-[1px] border-solid border-[green] p-3 rounded cursor-pointer"
        >
          Thêm mới
        </Link>
      </div>
      <Table
        columns={columns}
        // expandable={{
        //   expandedRowRender: (record) => (
        //     <p style={{ margin: 0 }}>{record?.description}</p>
        //   ),
        //   rowExpandable: (record) => record?.name !== "Not Expandable",
        // }}
        dataSource={originData}
      />
    </div>
  );
};

export default TableProduct;

