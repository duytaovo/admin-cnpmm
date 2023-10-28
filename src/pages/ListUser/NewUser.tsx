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
import { useAppDispatch } from "src/hooks/useRedux";
import { addUser, getUsers, uploadAvatar } from "src/store/user/userSlice";
import { ErrorResponse } from "src/types/utils.type";
import { schemaAddUser } from "src/utils/rules";
import { isAxiosUnprocessableEntityError } from "src/utils/utils";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
interface FormData {
  email: string;
  name: string;
  password: string;
  address: string;
  phone: string;
  image: string;
}
const FormDisabledDemo: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState<File[]>();

  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
    setValue,
  } = useForm({
    resolver: yupResolver(schemaAddUser),
  });
  useEffect(() => {
    setValue("address", "");
    setValue("image", "");
    setValue("name", "");
    setValue("phone", "");
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const body = JSON.stringify({
      email: data.email,
      address: data.address,
      password: data.password,
      name: data.name,
      phone: data.phone,
      // date_of_birth,
      roles: "0",
      // avatar,
    });
    // if (file) {
    //   const form = new FormData();
    //   form.append("file", file[0]);
    //   form.append("image", file[0]);
    //   const res = await dispatch(uploadAvatar(uploadAvatar));
    //   unwrapResult(res);
    // } else {
    //   toast.warning("Cần chọn ảnh");
    // }

    try {
      setIsSubmitting(true);
      const res = await dispatch(addUser(body));
      unwrapResult(res);
      console.log(res);
      const d = res?.payload;
      if (d?.status !== 200) return toast.error(d?.message);
      await toast.success("Thêm thành công ");
      await dispatch(getUsers(""));
      await navigate(path.users);
    } catch (error: any) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
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
    setValue("address", "");
    setValue("gioitinh", "");
    setValue("image", "");
    setValue("name", "");
    setValue("phone", "");
  };

  return (
    <div className="bg-white shadow ">
      <h2 className="font-bold m-4 text-2xl">Thêm người dùng</h2>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600, padding: 5 }}
        autoComplete="off"
        noValidate
        onSubmitCapture={onSubmit}
      >
        {/* <Form.Item label="Giới tính">
          <Radio.Group>
            <Radio value="apple"> Nam </Radio>
            <Radio value="pear"> Nữ </Radio>
          </Radio.Group>
        </Form.Item> */}
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input
            name="email"
            register={register}
            type="text"
            className=""
            errorMessage={errors.email?.message}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input
            name="password"
            register={register}
            type="text"
            className=""
            errorMessage={errors.password?.message}
          />
        </Form.Item>
        <Form.Item name="name" label="Họ Tên" rules={[{ required: true }]}>
          <Input
            name="name"
            register={register}
            type="text"
            className=""
            errorMessage={errors.name?.message}
          />
        </Form.Item>
        <Form.Item label="Địa chỉ" name="address">
          <Input
            name="address"
            register={register}
            type="text"
            className=""
            errorMessage={errors.address?.message}
          />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[{ required: true }]}
        >
          <Input
            name="phone"
            register={register}
            type="text"
            className=""
            errorMessage={errors.phone?.message}
          />
        </Form.Item>
        {/* <Form.Item label="TreeSelect">
          <TreeSelect
            treeData={[
              {
                title: "Light",
                value: "light",
                children: [{ title: "Bamboo", value: "bamboo" }],
              },
            ]}
          />
        </Form.Item> */}
        {/* <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item> */}
        <Form.Item
          name="file"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <div className="flex justify-start">
          <Form.Item label="" className="ml-[100px] mb-2">
            <Button className="w-[100px]" onClick={onSubmit}>
              Lưu
            </Button>
          </Form.Item>
          <Form.Item label="" className="ml-[20px] mb-2">
            <Button className="w-[100px]" onClick={onClickHuy}>
              Đặt lại
            </Button>
          </Form.Item>
          <Form.Item label="" className="ml-[20px] mb-2">
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
