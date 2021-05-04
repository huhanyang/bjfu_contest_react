import React from "react";
import { Form, Input } from "antd";
import { useAsync } from "utils/use-async";
import { LongButton } from "../UnAuthenticatedBackApp";
import { useHttp } from "../../../../utils/http";

export const Forget = ({ onError }: { onError: (error: Error) => void }) => {
  const client = useHttp();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  // HTMLFormElement extends Element
  const handleSubmit = async (values: { email: string }) => {
    try {
      await run(
        client("user/forgetPassword", { data: values, method: "POST" })
      ).then(() => {});
    } catch (e) {
      onError(e);
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
