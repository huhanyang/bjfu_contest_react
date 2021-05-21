import { Form, Input, message, Modal, Radio } from "antd";
import { LongButton } from "../../unauth";
import React from "react";
import {
  ChangeUserInfo,
  useEditUserInfo,
  useUser,
} from "../../../../utils/user";
import { useAuth } from "../../../../context/auth-context";
import { useAsync } from "../../../../utils/use-async";

export const AdminEditInfoModal = ({
  visible,
  setVisible,
  userId,
}: {
  userId: number;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: user } = useUser(userId);
  const { refresh, user: me } = useAuth();
  const { run } = useAsync(undefined, { throwOnError: true });
  const { mutateAsync: editUserInfo, isLoading: editLoading } = useEditUserInfo(
    userId
  );

  const handleSubmit = async (values: ChangeUserInfo) => {
    try {
      await editUserInfo({ ...values, userId: userId });
      // 如果编辑的是自己的信息就重新获取一下自己的信息
      if (user?.id === me?.id) {
        await run(refresh());
      }
      // 关闭Modal
      setVisible(false);
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <Modal
      title="编辑用户信息"
      footer={null}
      visible={visible}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <Form initialValues={user} onFinish={handleSubmit} scrollToFirstError>
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
          name={"type"}
          label={"账号类型"}
          rules={[{ required: true, message: "请选择账号类型" }]}
        >
          <Radio.Group>
            <Radio value="STUDENT">学生</Radio>
            <Radio value="TEACHER">教师</Radio>
            <Radio value="ADMIN">管理员</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name={"name"}
          label={"真实姓名"}
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
          rules={[{ required: true, message: "请输入学院" }]}
        >
          <Input type="text" maxLength={32} />
        </Form.Item>
        <Form.Item
          name={"major"}
          label={"专业"}
          rules={[{ required: true, message: "请输入专业" }]}
        >
          <Input type="text" maxLength={32} />
        </Form.Item>
        <Form.Item name={"introduction"} label={"个人介绍"}>
          <Input.TextArea maxLength={256} />
        </Form.Item>
        <Form.Item>
          <LongButton
            loading={editLoading}
            htmlType={"submit"}
            type={"primary"}
          >
            提交修改
          </LongButton>
        </Form.Item>
      </Form>
    </Modal>
  );
};
