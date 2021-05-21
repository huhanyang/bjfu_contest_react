import { Form, Input, message } from "antd";
import { LongButton } from "../index";
import React from "react";
import { useHttp } from "../../../../utils/http";
import { useAsync } from "../../../../utils/use-async";
import { useNavigate } from "react-router";

export const ForgetSubmit = () => {
  const navigate = useNavigate();
  const client = useHttp();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async (values: { email: string }) => {
    try {
      await run(
        client("user/forgetPassword", { data: values, method: "POST" })
      ).then(() => {
        navigate("../success", { replace: true });
      });
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"email"}
        label={"邮箱"}
        tooltip="用于接收找回密码的验证码"
        rules={[
          { required: true, message: "请输入邮箱" },
          { type: "email", message: "请输入合法的邮箱" },
        ]}
      >
        <Input placeholder={"注册时的邮箱"} type={"email"} maxLength={32} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          发送验证邮件
        </LongButton>
      </Form.Item>
    </Form>
  );
};
