import React, { Fragment, ReactNode, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "src/contexts/app.context";

const UnAuthenticatedGuard = ({ children }: any) => {
  const { isAuthenticated } = useContext(AppContext);
  if (isAuthenticated === false) {
    toast.error("Bạn phải đăng nhập trước khi vào trang này");
    return <Navigate to="/login" replace={true} />;
  } else {
    return <div>{children}</div>;
  }
};

export default UnAuthenticatedGuard;
