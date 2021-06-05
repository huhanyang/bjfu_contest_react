import React from "react";
import { useAuth } from "context/auth-context";
import { Divider, Form, Input, message } from "antd";
import { useAsync } from "utils/use-async";
import { CardTitle, LongButton } from "../index";
import { Link } from "react-router-dom";

export const Login = () => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  // HTMLFormElement extends Element
  const handleSubmit = async (values: {
    account: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <>
      <CardTitle>请登录</CardTitle>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name={"account"}
          rules={[{ required: true, message: "请输入学工号或邮箱" }]}
        >
          <Input placeholder={"学工号/邮箱"} type="text" maxLength={32} />
        </Form.Item>
        <Form.Item
          name={"password"}
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password placeholder={"密码"} maxLength={32} />
        </Form.Item>
        <Form.Item>
          <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
            登录
          </LongButton>
        </Form.Item>
      </Form>
      <Divider />
      <Link style={{ float: "left" }} to={"../register"}>
        去注册
      </Link>
      <Link style={{ float: "right" }} to={"../forget"}>
        忘记密码
      </Link>
    </>
  );
};
