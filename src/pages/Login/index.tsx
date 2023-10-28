import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "src/components/Button";
import { useAppDispatch } from "src/hooks/useRedux";
import { AppContext } from "src/contexts/app.context";
import { useForm } from "react-hook-form";
import { ErrorResponse } from "src/types/utils.type";
import { toast } from "react-toastify";
import Input from "src/components/Input";
import { Schema, schema } from "src/utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { unwrapResult } from "@reduxjs/toolkit";
import { login } from "src/store/user/userSlice";
import { isAxiosUnprocessableEntityError } from "src/utils/utils";
import {
  getAccessTokenFromLS,
  setAccessTokenToLS,
  setRefreshTokenToLS,
} from "src/utils/auth";
import { Helmet } from "react-helmet-async";
import { Spin } from "antd";
import { CircularProgress } from "@mui/material";
import logo from "./logo-main.png";

type FormData = Pick<Schema, "email" | "password">;
const loginSchema = schema.pick(["email", "password"]);

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AppContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const body = {
      email: data.email,
      password: data.password,
    };
    try {
      await setIsSubmitting(true);
      const res = await dispatch(login(body));
      unwrapResult(res);
      const d = res?.payload?.data;
      if (d?.result == 0) return toast.error(d?.message);
      console.log(d);
      await setAccessTokenToLS(d?.data.access_token);
      await setRefreshTokenToLS(d?.data.refresh_token);
      await setIsAuthenticated(true);
      await navigate("/");
      // if (body.email === "admin" && body.password === "123456") {
      //   await toast.success("Đăng nhập thành công ");
      //   setTimeout(async () => {
      //   }, 1000);
      // } else {
      //   await toast.error("Email hoặc mật khẩu sai!! ");
      // }
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

  return (
    <div className=" items-start bg-white  m-auto mb-5 flex justify-center  h-screen">
      <Helmet>
        <title>Login </title>
        <meta name="description" content="Trang đăng nhập" />
      </Helmet>
      <div className="lg:col-span-2 lg:col-start-4  bg-mainColor/30 w-1/4 md:w-full justify-center m-10 rounded-2xl">
        <div className="flex items-center justify-center rounded-2xl mt-3">
          <img src={logo} alt="logo" className="w-30 h-20 md:hidden"></img>
        </div>
        <form
          className="rounded p-10 md:p-2 shadow-sm"
          onSubmit={onSubmit}
          noValidate
        >
          <div className=" flex items-center justify-center text-[25px] text-black">
            Đăng nhập
          </div>

          <Input
            name="email"
            register={register}
            type="text"
            className="mt-8"
            errorMessage={errors.email?.message}
            placeholder="User name"
          />
          <Input
            name="password"
            register={register}
            type="password"
            className="mt-2"
            classNameEye="absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]"
            errorMessage={errors.password?.message}
            placeholder="Password"
            autoComplete="on"
          />
          <div className="mt-3 flex justify-center space-x-2 items-center ">
            <Button
              // isNext
              type="submit"
              className="flex w-full items-center justify-center mt-2 rounded-[30px] bg-mainColor py-3 px-2 text-sm uppercase text-white hover:opacity-80"
            >
              {isSubmitting ? (
                <CircularProgress
                  sx={{ width: "50px", height: "50px" }}
                  disableShrink
                />
              ) : (
                <span className="text-2xl mt-4">Đăng nhập</span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
