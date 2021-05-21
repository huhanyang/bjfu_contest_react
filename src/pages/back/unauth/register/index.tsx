import React from "react";
import { Divider } from "antd";
import { CardTitle, LongButton } from "../index";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";

import { RegisterSubmit } from "./submit";
import { RegisterSuccess } from "./success";
import { RegisterActivate } from "./activate";

export const Register = () => {
  return (
    <>
      <CardTitle>请注册</CardTitle>
      <Routes>
        <Route path={"/submit"} element={<RegisterSubmit />} />
        <Route path={"/success"} element={<RegisterSuccess />} />
        <Route path={"/activate"} element={<RegisterActivate />} />
        <Navigate to={"submit"} />
      </Routes>
      <Divider />
      <Link style={{ float: "left" }} to={"../login"}>
        去登录
      </Link>
      <Link style={{ float: "right" }} to={"../forget"}>
        忘记密码
      </Link>
    </>
  );
};
