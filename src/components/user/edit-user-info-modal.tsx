import React from "react";
import { ChangeUserInfo, useEditUserInfo, useUser } from "../../utils/user";
import { useAuth } from "../../context/auth-context";
import { useAsync } from "../../utils/use-async";
import { Form, Input, message, Modal, Radio } from "antd";
import { LongButton } from "../../pages/back/unauth";
import {
  getUserGenderInfo,
  getUserStatusInfo,
  getUserTypeInfo,
  UserGenders,
  UserStatuses,
  UserTypes,
} from "../../types/user";

export const EditUserInfoModal = ({
  userId,
  visible,
  setVisible,
}: {
  userId: number;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: user } = useUser(userId);
  const { refresh, user: me } = useAuth();
  const { run } = useAsync(undefined, { throwOnError: true });
  const {
    mutateAsync: editUserInfo,
    isLoading: isEditUserInfoLoading,
  } = useEditUserInfo(userId);

  const handleSubmit = async (values: ChangeUserInfo) => {
    try {
      await editUserInfo({ ...values, userId: userId });
      // 如果编辑的是自己的信息就重新获取一下自己的信息
      if (user?.id === me?.id) {
        await run(refresh());
      }
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
            {UserTypes.map((type) => (
              <Radio value={type}>{getUserTypeInfo(type)}</Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name={"status"}
          label={"账号状态"}
          rules={[{ required: true, message: "请选择账号状态" }]}
        >
          <Radio.Group>
            {UserStatuses.map((status) => {
              if (status === "UNACTIVE" || status === "DELETE") {
                return <></>;
              }
              return <Radio value={status}>{getUserStatusInfo(status)}</Radio>;
            })}
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
            {UserGenders.map((gender) => (
              <Radio value={gender}>{getUserGenderInfo(gender)}</Radio>
            ))}
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
        <Form.Item name={"major"} label={"专业"}>
          <Input type="text" maxLength={32} />
        </Form.Item>
        <Form.Item name={"introduction"} label={"个人介绍"}>
          <Input.TextArea maxLength={256} />
        </Form.Item>
        <Form.Item>
          <LongButton
            loading={isEditUserInfoLoading}
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
