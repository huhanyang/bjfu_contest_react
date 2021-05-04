import React from "react";
import { Form, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";

export const ForgetSuccess = () => {
  return (
    <>
      <MailOutlined />
      重置密码的邮件已经发送到您的邮箱中,请注意查收!
    </>
  );
};
