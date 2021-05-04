import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { useAsync } from "utils/use-async";
import { LongButton } from "../UnAuthenticatedBackApp";

export const Login = ({ onError }: { onError: (error: Error) => void }) => {
  const { login, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  // HTMLFormElement extends Element
  const handleSubmit = async (values: {
    account: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (e) {
      onError(e);
    }
  };

  return (
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
  );
};
