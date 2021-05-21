import React from "react";
import { Divider } from "antd";
import { CardTitle } from "../index";
import { Navigate, Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import { ForgetSuccess } from "./success";
import { ForgetSubmit } from "./submit";
import { ForgetResetPassword } from "./reset-password";

export const Forget = () => {
  return (
    <>
      <CardTitle>找回密码</CardTitle>
      <Routes>
        <Route path={"/submit"} element={<ForgetSubmit />} />
        <Route path={"/success"} element={<ForgetSuccess />} />
        <Route path={"/resetPassword"} element={<ForgetResetPassword />} />
        <Navigate to={"submit"} />
      </Routes>
      <Divider />
      <Link style={{ float: "left" }} to={"../login"}>
        去登录
      </Link>
      <Link style={{ float: "right" }} to={"../register"}>
        去注册
      </Link>
    </>
  );
};
