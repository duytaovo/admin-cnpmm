import { PlusOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { unwrapResult } from "@reduxjs/toolkit";

import { Button, Form, Upload } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "src/components/Input";
import path from "src/constants/path";
import { useAppDispatch } from "src/hooks/useRedux";
import {
  getDetailUser,
  getUsers,
  updateUserProfile,
} from "src/store/user/userSlice";
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
  const { user_id } = useParams();
  const [userDetail, setUserDetail] = useState<any>();
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
    dispatch(getDetailUser(user_id))
      .then(unwrapResult)
      .then((res) => {
        setUserDetail(res.data.data);
      });
  }, []);

  useEffect(() => {
    setValue("address", userDetail?.address);
    setValue("email", userDetail?.email);
    setValue("image", userDetail?.avatar);
    setValue("name", userDetail?.name);
    setValue("phone", userDetail?.phone);
  }, [userDetail]);

  const onSubmit = handleSubmit(async (data) => {
    const body = JSON.stringify({
      email: data.email,
      address: data.address,
      password: data.password,
      name: data.name,
      phone: data.phone,
      roles: "User",
      // date_of_birth,
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
      const res = await dispatch(updateUserProfile({ user_id, body }));
      unwrapResult(res);
      const d = res?.payload;
      if (d?.status !== 200) return toast.error(d?.message);
      await toast.success("Cập nhật thành công ");
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
    setValue("address", userDetail.address);
    setValue("email", userDetail.email);
    setValue("image", userDetail.avatar);
    setValue("name", userDetail.name);
    setValue("phone", userDetail.phone);
  };

  return (
    <div className="bg-white shadow ">
      <h2 className="font-bold m-4 text-2xl">Cập nhật người dùng</h2>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600, padding: 5 }}
        autoComplete="off"
        noValidate
        onSubmitCapture={onSubmit}
      >
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
        <Form.Item
          name="file"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/" listType="picture-card">
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
