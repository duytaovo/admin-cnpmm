import React, { Fragment, ReactNode, memo, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "src/contexts/app.context";

const AuthenticatedGuard = ({ children }: any) => {
  const { isAuthenticated } = useContext(AppContext);
  if (isAuthenticated === true) {
    toast.error("Bạn phải đăng xuất trước khi vào trang này");
    return <Navigate to="/" replace={true} />;
  } else {
    return <div>{children}</div>;
  }
};

export default memo(AuthenticatedGuard);
