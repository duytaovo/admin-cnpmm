import { PlusOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Form, Upload } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "src/components/Input";
import path from "src/constants/path";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { ErrorResponse } from "src/types/utils.type";
import { schemaProduct } from "src/utils/rules";
import { getAvatarUrl, isAxiosUnprocessableEntityError } from "src/utils/utils";
import SelectCustom from "src/components/Select";

import Textarea from "src/components/Textarea";
import InputFile from "src/components/InputFile";
import {
  addProduct,
  getProducts,
  uploadImageProduct,
  uploadImagesProduct,
} from "src/store/product/productSlice";
import { addCategory, getCategorys } from "src/store/category/categorySlice";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

interface FormData {
  images: string[];
  price: number;
  // rating: number;
  price_before_discount: number;
  quantity: number;
  sold: number;
  // view: number;
  name: string;
  description: string;
  // category: {
  //   _id: string;
  //   name: string;
  // };
  image: string;
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const FormDisabledDemo: React.FC = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { category, categoryDetail } = useAppSelector(
    (state) => state.category
  );
  console.log(category);
  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schemaProduct),
  });
  const avatar = watch("image");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState<File[]>();
  const imageArray = file || []; // Mảng chứa các đối tượng ảnh (File hoặc Blob)

  // Tạo một mảng chứa các URL tạm thời cho ảnh
  const imageUrls: string[] = [];

  for (const image of imageArray) {
    const imageUrl = URL.createObjectURL(image);
    imageUrls.push(imageUrl);
  }

  useEffect(() => {
    dispatch(getCategorys(""));
  }, []);

  useEffect(() => {
    setValue("name", "");
    setValue("description", "");
    setValue("image", "");
    setValue("images", "");
    setValue("price_before_discount", "");
    setValue("quantity", "");
    setValue("sold", "");
  }, []);
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    let images = [];
    try {
      const body = JSON.stringify({
        name: data.name,
      });
      setIsSubmitting(true);
      const res = await dispatch(addCategory(body));
      unwrapResult(res);
      // const d = res?.payload?.data.data;
      // if (d?.status !== 200) return toast.error(d?.message);
      await toast.success("Thêm sản phẩm thành công ");
      await dispatch(getCategorys(""));
      await navigate(path.categories);
    } catch (error: any) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              // message: formError[key as keyof FormData],
              type: "Server",
            });
          });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  });
  const onClickHuy = () => {
    setValue("name", "");
  };
  const handleChangeFile = (file?: File[]) => {
    setFile(file);
  };
  return (
    <div className="bg-white shadow ">
      <h2 className="font-bold m-4 text-2xl">Thêm sản phẩm điện thoại</h2>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 700, padding: 6 }}
        autoComplete="off"
        noValidate
        onSubmitCapture={onSubmit}
      >
        {" "}
        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[{ required: true }]}
        >
          <Input
            // placeholder="Iphone 15 Plus"
            name="name"
            register={register}
            type="text"
            className=""
            errorMessage={errors.name?.message}
          />
        </Form.Item>
        <div className="flex justify-start">
          <Form.Item label="" className="ml-[115px] mb-2">
            <Button className="w-[100px]" onClick={onSubmit}>
              Lưu
            </Button>
          </Form.Item>
          <Form.Item label="" className="ml-[50px] mb-2">
            <Button className="w-[100px]" onClick={onClickHuy}>
              Đặt lại
            </Button>
          </Form.Item>
          <Form.Item label="" className="ml-[50px] mb-2">
            <Button
              className="w-[100px]"
              onClick={() => {
                navigate(path.users);
              }}
            >
              Hủy
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default () => <FormDisabledDemo />;
