import React from "react";
import { Form, Input, message, Radio } from "antd";
import { LongButton } from "../UnAuthenticatedBackApp";
import { useAsync } from "../../../../utils/use-async";
import { useHttp } from "../../../../utils/http";
import { useNavigate } from "react-router";

export const RegisterSubmit = () => {
  type RegisterForm = {
    account: string;
    email: string;
    password: string;
    type: "TEACHER" | "STUDENT";
    status: string;
    name: string;
    gender?: "MALE" | "FEMALE" | "SECRECY";
    college: string;
    major?: string;
    introduction?: string;
  };

  const navigate = useNavigate();
  const client = useHttp();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  // HTMLFormElement extends Element
  const handleSubmit = async (values: RegisterForm) => {
    try {
      await run(client("user/register", { data: values, method: "POST" })).then(
        () => {
          navigate("../success", { replace: true });
        }
      );
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <>
      <Form
        initialValues={{ type: "STUDENT", gender: "SECRECY" }}
        onFinish={handleSubmit}
        scrollToFirstError
      >
        <Form.Item
          name={"account"}
          label="学工号"
          tooltip="请输入真实学工号以确保正常参赛"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input maxLength={32} />
        </Form.Item>
        <Form.Item
          name={"email"}
          label={"邮箱"}
          tooltip="用于登录、找回密码和接受消息"
          rules={[
            { required: true, message: "请输入邮箱" },
            { type: "email", message: "请输入合法的邮箱" },
          ]}
        >
          <Input maxLength={32} />
        </Form.Item>
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
        <Form.Item
          name={"type"}
          label={"账号类型"}
          tooltip="教师类型需要管理员审核"
          rules={[{ required: true, message: "请选择账号类型" }]}
        >
          <Radio.Group>
            <Radio value="STUDENT">学生</Radio>
            <Radio value="TEACHER">教师</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name={"name"}
          label={"真实姓名"}
          tooltip="请保证真实以确保不影响竞赛报名"
          rules={[{ required: true, message: "请输入真实姓名" }]}
        >
          <Input type="text" maxLength={32} />
        </Form.Item>
        <Form.Item
          name={"gender"}
          label={"性别"}
          rules={[{ required: true, message: "请选择性别" }]}
        >
          <Radio.Group>
            <Radio value="SECRECY">保密</Radio>
            <Radio value="MALE">男</Radio>
            <Radio value="FEMALE">女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name={"grade"}
          label={"年级"}
          tooltip="请保证真实以确保不影响竞赛报名"
          rules={[{ required: true, message: "请输入年级" }]}
        >
          <Input type="text" maxLength={32} />
        </Form.Item>
        <Form.Item
          name={"college"}
          label={"学院"}
          tooltip="请保证真实以确保不影响竞赛报名"
          rules={[{ required: true, message: "请输入学院" }]}
        >
          <Input type="text" maxLength={32} />
        </Form.Item>
        <Form.Item
          name={"major"}
          label={"专业"}
          tooltip="请保证真实以确保不影响竞赛报名"
          rules={[{ required: true, message: "请输入专业" }]}
        >
          <Input type="text" maxLength={32} />
        </Form.Item>
        <Form.Item
          name={"introduction"}
          label={"个人介绍"}
          rules={[{ required: true, message: "请输入个人介绍" }]}
        >
          <Input.TextArea maxLength={256} />
        </Form.Item>
        <Form.Item>
          <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
            注册
          </LongButton>
        </Form.Item>
      </Form>
    </>
  );
};
