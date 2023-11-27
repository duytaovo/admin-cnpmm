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
import { getCategorys } from "src/store/category/categorySlice";

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
      if (file) {
        const form = new FormData();
        form.append("file", file[0]);
        for (let i = 0; i < file.length; i++) {
          form.append("images", file[i]);
        }
        const res = await dispatch(uploadImagesProduct(form));
        unwrapResult(res);

        const d = res?.payload?.data;
        console.log("res", d);
        images = d.data;
      } else {
        toast.warning("Cần chọn ảnh");
      }

      const body = JSON.stringify({
        images,
        price: data.price,
        // rating: data.rating
        price_before_discount: data.price_before_discount,
        quantity: data.quantity,
        // sold: data.sold,
        // view: data.view,
        name: data.name,
        description: data.description,
        category: data.category,
        image: images[0],
      });
      setIsSubmitting(true);
      const res = await dispatch(addProduct(body));
      unwrapResult(res);
      // const d = res?.payload?.data.data;
      // if (d?.status !== 200) return toast.error(d?.message);
      await toast.success("Thêm sản phẩm thành công ");
      await dispatch(getProducts(""));
      await navigate(path.products);
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
    setValue("description", "");
    setValue("image", "");
    setValue("images", "");
    setValue("price_before_discount", "");
    setValue("quantity", "");
    setValue("sold", "");
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
          label="Hãng sản xuất"
          name="model"
          rules={[{ required: true }]}
        >
          <SelectCustom
            className={"flex-1 text-black"}
            id="category"
            // label="Hãng xe"
            placeholder="Vui lòng chọn"
            defaultValue={""}
            options={category}
            register={register}
            isBrand={true}
          >
            {errors.category?.message}
          </SelectCustom>
        </Form.Item>
        <Form.Item
          label="Tên sản phẩm"
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
        <Form.Item label="Price" name="price" rules={[{ required: true }]}>
          <Input
            name="price"
            register={register}
            type="text"
            className=""
            errorMessage={errors.price?.message}
            // placeholder="Màn hinh"
          />
        </Form.Item>
        <Form.Item label="Giá khuyến mãi" name="price_before_discount">
          <Input
            name="price_before_discount"
            register={register}
            type="text"
            className=""
            errorMessage={errors.price_before_discount?.message}
          />
        </Form.Item>
        <Form.Item
          label="Số lượng"
          name="quantity"
          rules={[{ required: true }]}
        >
          <Input
            name="quantity"
            register={register}
            type="text"
            className=""
            errorMessage={errors.quantity?.message}
          />
        </Form.Item>
      
      
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true }]}
        >
          <Textarea
            defaultValue="Mô tả sản phẩm"
            id="description"
            isUpdate={false}
            register={register}
            setValue={setValue}
            textAlign={"left"}
          />
        </Form.Item>
        <Form.Item
          name="file"
          rules={[{ required: true }]}
          label="Hình ảnh"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <div className="flex flex-col items-start ">
            <div className="my-5 w-24 space-y-5 justify-between items-center">
              {imageUrls.map((imageUrl, index) => {
                return (
                  <img
                    key={index}
                    src={imageUrl || getAvatarUrl(avatar)}
                    className="h-full rounded-md w-full  object-cover"
                    alt="avatar"
                  />
                );
              })}
            </div>
            <InputFile
              label="Upload ảnh"
              onChange={handleChangeFile}
              id="images"
            />
            <div className="mt-3  flex flex-col items-center text-red-500">
              <div>Dụng lượng file tối đa 2 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
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
