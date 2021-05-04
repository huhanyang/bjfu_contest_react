import React, { useEffect } from "react";
import { Form, Input, message } from "antd";
import { useAsync } from "utils/use-async";
import { LongButton } from "../UnAuthenticatedBackApp";
import { useHttp } from "../../../../utils/http";
import { useUrlQueryParam } from "../../../../utils/url";
import { useNavigate } from "react-router";

export const ForgetResetPassword = () => {
  const navigate = useNavigate();
  const [{ token }] = useUrlQueryParam(["token"]);
  const client = useHttp();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  useEffect(() => {
    if (!token) {
      message
        .error("Token不合法")
        .then(() => navigate("../../login", { replace: true }));
    }
  });

  const handleSubmit = async (values: { password: string }) => {
    try {
      await run(
        client("user/resetPassword", {
          data: { ...values, token },
          method: "POST",
        })
      ).then(() =>
        message
          .success("密码重置成功，请重新登录！")
          .then(() => navigate("../../login", { replace: true }))
      );
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"password"}
        label={"密码"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password maxLength={32} />
      </Form.Item>
      <Form.Item
        name={"cpassword"}
        label={"确认密码"}
        hasFeedback
        rules={[
          { required: true, message: "请确认两次密码相同!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("两次密码不一致!"));
            },
          }),
        ]}
      >
        <Input.Password maxLength={32} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          重置密码
        </LongButton>
      </Form.Item>
    </Form>
  );
};
